export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

/** Thrown when the assistant cannot answer; `message` is safe to show to visitors. */
export class AgentError extends Error {}

const CHAT_ENDPOINT = '/api/chat'
const REQUEST_TIMEOUT_MS = 70_000

// Offline answers used only while the assistant has no API key configured on the server.
const getFallbackAnswer = (prompt: string): string => {
  const p = prompt.toLowerCase()
  if (p.includes('price') || p.includes('cost') || p.includes('estimate') || p.includes('budget')) {
    return `**Stall Pricing & Estimation Guide**:
• **Modular System**: ₹1,200 – ₹2,200 / sq. ft. (Quick assembly, reusable extruded aluminum)
• **Custom Fabricated Stall**: ₹2,500 – ₹4,500 / sq. ft. (Bespoke carpentry, paint finishes, custom acrylics)
• **Premium Two-Tier / Island Pavilion**: ₹4,500+ / sq. ft. (Structural mezzanine, VIP lounge, LED video walls)

*Click "Chat on WhatsApp" (+91 78451 32962) to receive an instant CAD-backed quote.*`
  }

  if (p.includes('size') || p.includes('dimension') || p.includes('booth') || p.includes('area')) {
    return `**Recommended Booth Dimensions**:
• **3m x 3m (9 sq.m)**: Ideal for start-ups, product kiosks, or standard corner booths.
• **6m x 3m (18 sq.m)**: Excellent for demo stations with display screens and 1-on-1 meeting tables.
• **12m x 9m (108 sq.m)**: Flagship double-deck / island pavilion with multi-zone demos and lounge.

Tell me your expected visitor footfall and expo hall location, and I will recommend the optimal layout!`
  }

  return `Welcome to **Ikasle StallX**!
How can I assist you with your expo stall design, 3D layouts, or fabrication specs today?`
}

export async function sendAgentMessage(messages: ChatMessage[]): Promise<string> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let response: Response
  try {
    response = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ messages: messages.map(({ role, content }) => ({ role, content })) }),
    })
  } catch (error) {
    const aborted = error instanceof DOMException && error.name === 'AbortError'
    throw new AgentError(aborted ? 'That took too long. Please try again.' : 'Could not reach the assistant. Please check your connection and try again.')
  } finally {
    window.clearTimeout(timer)
  }

  const data = (await response.json().catch(() => ({}))) as { reply?: string; error?: string; code?: string }

  if (response.status === 503 && data.code === 'not_configured') {
    return getFallbackAnswer(messages[messages.length - 1]?.content ?? '')
  }
  if (!response.ok || !data.reply) {
    throw new AgentError(data.error || 'The assistant is unavailable right now. Please try again.')
  }
  return data.reply
}
