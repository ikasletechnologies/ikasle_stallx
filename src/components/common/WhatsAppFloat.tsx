import React from 'react'
import { WhatsAppIcon } from './WhatsAppIcon'

const WHATSAPP_PHONE = '917845132962'
const WHATSAPP_MSG = encodeURIComponent('Hello Ikaslé StallX, I would like to plan an exhibition stall.')
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_MSG}`

export const WhatsAppFloat: React.FC = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with StallX on WhatsApp (+91 78451 32962)"
      className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#ff7a00] text-white shadow-xl shadow-[#ff7a00]/35 transition-all duration-300 hover:scale-110 hover:bg-[#e66e00] focus:outline-none focus:ring-2 focus:ring-[#ff7a00] focus:ring-offset-2 active:scale-95 sm:h-14 sm:w-14"
    >
      {/* Pulse radar ring */}
      <span className="pointer-events-none absolute -inset-1 -z-10 animate-ping rounded-full bg-[#ff7a00]/30" />

      <WhatsAppIcon className="h-6 w-6 text-white sm:h-7 sm:w-7" />

      {/* Tooltip on the right, since the button sits in the left corner */}
      <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-[#081e33] px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  )
}
