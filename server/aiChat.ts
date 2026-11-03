/**
 * Server-side chat endpoint for the StallX AI Agent.
 *
 * The browser POSTs `{ messages }` to `/api/chat`; this handler adds the system prompt,
 * the secret API key and the model, calls NVIDIA's API and returns `{ reply }`.
 * The key never reaches the browser, and the browser never calls NVIDIA directly
 * (which fails with "Failed to fetch" because NVIDIA does not allow browser/CORS calls).
 *
 * Used by the Vite dev/preview server (see vite.config.ts). For production hosting,
 * mount `handleChatRequest` behind the same `/api/chat` route on your server or
 * serverless platform, with NVIDIA_API_KEY set in that environment.
 */
import type { IncomingMessage, ServerResponse } from 'node:http'
import { HttpError, readJsonBody, sendJson } from './http.ts'

export interface AiChatConfig {
  apiKey: string
  model: string
  endpoint: string
}

interface IncomingChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const MAX_HISTORY = 10
const MAX_MESSAGE_CHARS = 2000
const UPSTREAM_TIMEOUT_MS = 60_000

export const DEFAULT_AI_ENDPOINT = 'https://integrate.api.nvidia.com/v1/chat/completions'
export const DEFAULT_AI_MODEL = 'nvidia/nemotron-3-ultra-550b-a55b'

const SYSTEM_INSTRUCTION = `You are the StallX AI Assistant, the official AI expo & architectural consultant for Ikasle StallX (based in Coimbatore, Tamil Nadu, India).
About Ikasle StallX:
- Premier exhibition stall designers, expo booth fabricators, and brand pavilion architects.
- Core specialties: Bespoke wooden fabrication, modular extruded aluminum systems, CNC routing, custom acrylics, fire-retardant safety finishes.
- 3D Blueprinting: Fast 24 to 48-hour CAD/CAM renders and 3D architectural mockups.
- Technologies: Seamless LED video walls, interactive digital kiosks, electrical distribution, smart ambient lighting.
- Coverage: Active deployments across 35+ exposition hubs (Coimbatore CODISSIA, Chennai CTC, Bangalore BIEC, Mumbai BEC, Delhi Pragati Maidan, etc.).
- Contact: businessgroupikasle@gmail.com | Phone / WhatsApp: +91 78451 32962 | Address: 1639/A, 2nd Floor, Hopes, Coimbatore, India – 641004.

Guidelines for responses:
1. Keep every answer SHORT: at most one short intro line, then 3 to 5 bullet points of one line each. No long paragraphs, headings, tables or dividers.
2. Do NOT use emojis, icons or decorative symbols. Plain text only; use **bold** sparingly for key terms.
3. Be professional, friendly and practical.
4. Recommend booth sizes (e.g. 3x3m for kiosks, 6x3m for standard booths, 12x9m for double-deck islands) when asked.
5. When relevant, end with one short line inviting the visitor to request a quote or WhatsApp us (+91 78451 32962).
6. Never mention which AI model, provider or API you run on.`

const sanitizeMessages = (body: unknown): IncomingChatMessage[] => {
  const raw = (body as { messages?: unknown })?.messages
  if (!Array.isArray(raw) || raw.length === 0) throw new HttpError(400, 'No messages provided.')
  const messages = raw
    .filter(
      (m): m is IncomingChatMessage =>
        typeof m === 'object' && m !== null && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string',
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }))
    .slice(-MAX_HISTORY)
  if (!messages.length || messages[messages.length - 1].role !== 'user') throw new HttpError(400, 'The last message must be from the user.')
  return messages
}

/** Emoji / pictograph characters (keeps ₹, ©, ®, ™ and normal punctuation). */
const EMOJI = /(?![©®™])\p{Extended_Pictographic}|[\u{FE0F}\u{200D}\u{20E3}\u{1F1E6}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}]/gu

/** Removes hidden reasoning blocks and any emojis/icons the model still adds. */
const cleanReply = (text: string) =>
  text
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(EMOJI, '')
    .split('\n')
    .map((line) => line.replace(/[ \t]{2,}/g, ' ').replace(/^([ \t]*(?:[-*•]|\d+[.)]))[ \t]+/, '$1 ').trimEnd())
    .join('\n')
    .trim()

export async function requestAiReply(messages: IncomingChatMessage[], config: AiChatConfig): Promise<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)
  try {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      signal: controller.signal,
      headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        model: config.model,
        messages: [{ role: 'system', content: SYSTEM_INSTRUCTION }, ...messages],
        temperature: 0.3,
        top_p: 0.8,
        // Short answers: 3–5 one-line bullets fit comfortably; keeps replies fast.
        max_tokens: 400,
      }),
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      console.error(`[ai-chat] upstream HTTP ${response.status}: ${detail.slice(0, 500)}`)
      throw new HttpError(502, 'The assistant is unavailable right now.')
    }

    const data = (await response.json()) as { choices?: { message?: { content?: string | null } }[] }
    const reply = cleanReply(data.choices?.[0]?.message?.content ?? '')
    if (!reply) throw new HttpError(502, 'The assistant returned an empty answer.')
    return reply
  } catch (error) {
    if (error instanceof HttpError) throw error
    const aborted = error instanceof Error && error.name === 'AbortError'
    console.error('[ai-chat] upstream request failed:', error)
    throw new HttpError(aborted ? 504 : 502, aborted ? 'The assistant took too long to answer.' : 'The assistant is unavailable right now.')
  } finally {
    clearTimeout(timer)
  }
}

/** Node/Connect-style handler for `POST /api/chat`. */
export async function handleChatRequest(req: IncomingMessage, res: ServerResponse, config: AiChatConfig) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    sendJson(res, 405, { error: 'Method not allowed.' })
    return
  }
  if (!config.apiKey) {
    sendJson(res, 503, { error: 'The assistant is not configured yet.', code: 'not_configured' })
    return
  }
  try {
    const messages = sanitizeMessages(await readJsonBody(req))
    sendJson(res, 200, { reply: await requestAiReply(messages, config) })
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500
    sendJson(res, status, { error: error instanceof Error ? error.message : 'Unexpected error.' })
  }
}
