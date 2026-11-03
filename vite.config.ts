import { defineConfig, loadEnv, type Connect, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { DEFAULT_AI_ENDPOINT, DEFAULT_AI_MODEL, handleChatRequest, type AiChatConfig } from './server/aiChat.ts'
import { handleContactRequest, type ContactMailConfig } from './server/contactMail.ts'

/**
 * Serves the site's API from the dev and preview servers, keeping all secrets server-side:
 *   POST /api/chat    → AI assistant (server/aiChat.ts)
 *   POST /api/contact → quote form emails via Gmail SMTP (server/contactMail.ts)
 */
const siteApi = (chat: AiChatConfig, mail: ContactMailConfig): Plugin => {
  const mount = (middlewares: Connect.Server) => {
    middlewares.use('/api/chat', (req, res) => void handleChatRequest(req, res, chat))
    middlewares.use('/api/contact', (req, res) => void handleContactRequest(req, res, mail))
  }
  return {
    name: 'stallx-site-api',
    configureServer: (server) => mount(server.middlewares),
    configurePreviewServer: (server) => mount(server.middlewares),
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // '' prefix = also load variables WITHOUT the VITE_ prefix. Those stay on the server and
  // are never bundled into the browser code.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      siteApi(
        {
          apiKey: (env.NVIDIA_API_KEY || env.AI_AGENT_API_KEY || '').trim(),
          model: (env.NVIDIA_MODEL || DEFAULT_AI_MODEL).trim(),
          endpoint: (env.NVIDIA_API_URL || DEFAULT_AI_ENDPOINT).trim(),
        },
        {
          host: (env.SMTP_HOST || 'smtp.gmail.com').trim(),
          port: Number(env.SMTP_PORT || 465),
          user: (env.SMTP_USER ?? '').trim(),
          // Google shows App Passwords in groups of 4 ("abcd efgh ..."); spaces are not part of it.
          pass: (env.SMTP_PASS ?? '').replace(/\s+/g, ''),
          receiver: (env.CONTACT_RECEIVER || env.SMTP_USER || '').trim(),
          fromName: (env.CONTACT_FROM_NAME || 'Ikaslé StallX').trim(),
        },
      ),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 3050,
    },
  }
})
