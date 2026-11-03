import React from 'react'
import { ScrollToTop } from './ScrollToTop'
import { WhatsAppFloat } from './WhatsAppFloat'
import { AiAgentWidget } from './AiAgentWidget'

export const FloatingActions: React.FC = () => {
  return (
    <>
      {/* Left corner: Scroll to Top (appears after scrolling) above WhatsApp */}
      <aside
        aria-label="Contact and navigation shortcuts"
        className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2.5 sm:bottom-6 sm:left-6 sm:gap-3"
      >
        <ScrollToTop />
        <WhatsAppFloat />
      </aside>

      {/* Right corner: AI Agent */}
      <aside
        aria-label="AI assistant"
        className="fixed bottom-5 right-5 z-50 flex flex-col items-end sm:bottom-6 sm:right-6"
      >
        <AiAgentWidget />
      </aside>
    </>
  )
}
