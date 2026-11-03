import React, { useEffect, useRef, useState } from 'react'
import { Bot, MessageCircle, RotateCcw, Send, Sparkles, X } from 'lucide-react'
import { AgentError, sendAgentMessage, type ChatMessage } from '@/services/aiAgent'
import { WHATSAPP_URL } from './WhatsAppFloat'

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'assistant',
    content:
      "Hello! I'm the **StallX Assistant**.\n\nI can help you with stall sizes, 3D designs, materials and timelines. How can I help with your expo project today?",
    timestamp: 'Just now',
  },
]

const QUICK_PROMPTS = [
  'Recommend a stall size for 50+ visitors',
  'How is stall pricing estimated?',
  'What is your fabrication timeline?',
  'Modular vs custom wooden stalls',
]

const timeNow = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

/* ---------- Minimal, safe markdown: **bold**, *italic*, `code`, bullets, numbered lists, ### headings ---------- */

const renderInline = (text: string, keyPrefix: string): React.ReactNode[] =>
  text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`)/g).map((part, index) => {
    const key = `${keyPrefix}-${index}`
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) return <strong key={key} className="font-bold">{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) return <code key={key} className="rounded bg-slate-100 px-1 py-0.5 text-[0.92em]">{part.slice(1, -1)}</code>
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={key}>{part.slice(1, -1)}</em>
    return <React.Fragment key={key}>{part}</React.Fragment>
  })

const MessageText: React.FC<{ text: string }> = ({ text }) => {
  const blocks: React.ReactNode[] = []
  let list: { ordered: boolean; items: string[] } | null = null

  const flushList = () => {
    if (!list) return
    const ListTag = list.ordered ? 'ol' : 'ul'
    blocks.push(
      <ListTag key={`list-${blocks.length}`} className={`space-y-1 pl-5 ${list.ordered ? 'list-decimal' : 'list-disc marker:text-[#f15a24]'}`}>
        {list.items.map((item, i) => (
          <li key={i}>{renderInline(item, `li-${blocks.length}-${i}`)}</li>
        ))}
      </ListTag>,
    )
    list = null
  }

  text.split('\n').forEach((rawLine, lineIndex) => {
    const line = rawLine.trim()
    const bullet = line.match(/^(?:[-*•])\s+(.*)$/)
    const numbered = line.match(/^\d+[.)]\s+(.*)$/)
    if (bullet || numbered) {
      const ordered = Boolean(numbered)
      if (list && list.ordered !== ordered) flushList()
      if (!list) list = { ordered, items: [] }
      list.items.push((bullet ?? numbered)![1])
      return
    }
    flushList()
    if (!line) return
    if (/^([-*_])\1{2,}$/.test(line)) {
      blocks.push(<hr key={`hr-${lineIndex}`} className="border-slate-200" />)
      return
    }
    const heading = line.match(/^#{1,4}\s+(.*)$/)
    blocks.push(
      heading ? (
        <p key={`h-${lineIndex}`} className="font-extrabold text-[#071c31]">{renderInline(heading[1], `h-${lineIndex}`)}</p>
      ) : (
        <p key={`p-${lineIndex}`}>{renderInline(line, `p-${lineIndex}`)}</p>
      ),
    )
  })
  flushList()

  return <div className="space-y-2 break-words">{blocks}</div>
}

/* ------------------------------------------------------------------------------------------------ */

export const AiAgentWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [isOpen, messages, isLoading, errorMsg])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const requestReply = async (conversation: ChatMessage[]) => {
    setErrorMsg(null)
    setIsLoading(true)
    try {
      const reply = await sendAgentMessage(conversation)
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', content: reply, timestamp: timeNow() }])
    } catch (error) {
      setErrorMsg(error instanceof AgentError ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = (textToSend?: string) => {
    const text = (textToSend ?? inputValue).trim()
    if (!text || isLoading) return
    const updated: ChatMessage[] = [...messages, { id: `u-${Date.now()}`, role: 'user', content: text, timestamp: timeNow() }]
    setMessages(updated)
    setInputValue('')
    void requestReply(updated)
  }

  const handleRetry = () => {
    if (!isLoading && messages[messages.length - 1]?.role === 'user') void requestReply(messages)
  }

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES)
    setErrorMsg(null)
    setInputValue('')
  }

  const showSuggestions = messages.length === INITIAL_MESSAGES.length && !isLoading

  return (
    <div className="relative flex flex-col items-end">
      {isOpen && (
        <div
          role="dialog"
          aria-label="StallX Assistant chat"
          className="mb-3 flex h-[560px] max-h-[calc(100dvh-9.5rem)] w-[calc(100vw-2.5rem)] animate-slide-up-in flex-col overflow-hidden rounded-3xl border border-[#071c31]/10 bg-white shadow-2xl sm:w-[400px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#081e33] via-[#0b2844] to-[#081e33] p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff7a00] to-[#f55a19] shadow-md shadow-[#ff7a00]/30">
                <Bot className="h-6 w-6" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#081e33] bg-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">StallX Assistant</h3>
                <p className="flex items-center gap-1.5 text-[11px] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online · usually replies in seconds
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button type="button" onClick={handleResetChat} title="Start a new chat" aria-label="Start a new chat" className="rounded-xl p-2 text-white/80 transition hover:bg-white/10">
                <RotateCcw className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => setIsOpen(false)} title="Close chat" aria-label="Close chat" className="rounded-xl p-2 text-white/80 transition hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3.5 overflow-y-auto bg-slate-50/70 p-4" aria-live="polite">
            {messages.map((m) => {
              const isUser = m.role === 'user'
              return (
                <div key={m.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed shadow-xs ${
                      isUser ? 'rounded-br-md bg-[#081e33] text-white' : 'rounded-bl-md border border-slate-200/70 bg-white text-[#17293a]'
                    }`}
                  >
                    {isUser ? <p className="whitespace-pre-wrap break-words">{m.content}</p> : <MessageText text={m.content} />}
                  </div>
                  <span className="mt-1 px-1 text-[10px] text-slate-400">{m.timestamp}</span>
                </div>
              )
            })}

            {isLoading && (
              <div className="flex w-fit items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-xs" aria-label="Assistant is typing">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#ff7a00]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#ff7a00] [animation-delay:0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#ff7a00] [animation-delay:0.3s]" />
              </div>
            )}

            {errorMsg && (
              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-3 text-[12px] text-[#7a3a12]">
                <p className="font-semibold">Sorry, I couldn&apos;t answer that just now.</p>
                <p className="mt-0.5 text-[#7a3a12]/80">{errorMsg}</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <button type="button" onClick={handleRetry} className="inline-flex items-center gap-1.5 rounded-full bg-[#f15a24] px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-[#dd4b18]">
                    <RotateCcw className="h-3.5 w-3.5" />
                    Try again
                  </button>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-orange-300 bg-white px-3 py-1.5 text-[11px] font-bold text-[#7a3a12] transition hover:border-[#f15a24] hover:text-[#f15a24]">
                    <MessageCircle className="h-3.5 w-3.5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div className="border-t border-slate-100 bg-white px-3 pb-1 pt-2.5">
              <p className="mb-1.5 flex items-center gap-1 px-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <Sparkles className="h-3 w-3 text-[#f15a24]" />
                Try asking
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-left text-[11px] font-medium text-slate-700 transition hover:border-[#f15a24]/40 hover:bg-[#fff4ec] hover:text-[#f15a24]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(event) => {
              event.preventDefault()
              handleSend()
            }}
            className="flex items-center gap-2 border-t border-slate-200/80 bg-white p-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              maxLength={2000}
              placeholder="Ask about stall sizes, designs, pricing..."
              aria-label="Type your message"
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] text-[#071c31] transition focus:border-[#ff7a00] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#ff7a00]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff7a00] text-white shadow-md transition hover:bg-[#e66e00] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Launcher */}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close StallX Assistant' : 'Open StallX Assistant'}
        className={`group relative flex items-center gap-2 rounded-full px-4 py-2.5 text-white shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ff7a00] active:scale-95 ${
          isOpen ? 'border border-white/20 bg-[#081e33]' : 'border border-[#ff7a00]/50 bg-gradient-to-r from-[#081e33] to-[#0f2c4c] hover:border-[#ff7a00]'
        }`}
      >
        <span className="relative flex items-center justify-center">
          <Bot className="h-5 w-5 text-[#ff7a00] transition-transform group-hover:rotate-12" />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full border-2 border-[#081e33] bg-emerald-400" />
        </span>
        <span className="text-sm font-bold tracking-tight">{isOpen ? 'Close chat' : 'Ask StallX AI'}</span>
      </button>
    </div>
  )
}
