import React, { useState } from 'react'
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { DateField, todayIso } from '@/components/common/DateField'

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

export const ContactSection: React.FC = () => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const clearStatus = () => setStatus((current) => (current === 'sending' ? current : 'idle'))

  const handleQuoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const data = new FormData(form)
    const errors: Record<string, string> = {}
    const requiredFields = ['name', 'email', 'phone', 'expoName', 'location', 'eventDate', 'dimensions', 'budget', 'service', 'requirements']

    requiredFields.forEach((field) => {
      if (!String(data.get(field) ?? '').trim()) errors[field] = 'This field is required.'
    })

    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
    if (phone && !/^\d{10}$/.test(phone)) errors.phone = 'Enter a valid 10-digit phone number.'
    const eventDate = String(data.get('eventDate') ?? '').trim()
    if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) errors.eventDate = 'Enter a valid date as DD/MM/YYYY.'
    else if (eventDate && eventDate < todayIso()) errors.eventDate = 'The event date cannot be in the past.'

    setFormErrors(errors)
    if (Object.keys(errors).length > 0) {
      setStatus('idle')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      })
      const result = (await response.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string>; confirmationSent?: boolean }
      if (!response.ok) {
        if (result.fields) setFormErrors(result.fields)
        setStatus('error')
        setStatusMessage(result.error || 'We could not send your request. Please try again.')
        return
      }
      form.reset()
      setStatus('sent')
      setStatusMessage(
        result.confirmationSent === false
          ? "Thank you! We've received your request and will get back to you shortly."
          : "Thank you! We've received your request. A confirmation email is on its way to your inbox.",
      )
    } catch {
      setStatus('error')
      setStatusMessage('Could not reach our server. Please check your connection, or contact us on WhatsApp.')
    }
  }

  return (
      <section id="contact" className="px-4 sm:px-6 lg:px-8">
        <div data-reveal="rise-scale" className="relative mx-auto max-w-[1380px] overflow-hidden rounded-xl bg-gradient-to-br from-[#092944] via-[#08243b] to-[#061d32] px-6 py-8 text-white shadow-xl sm:px-10 lg:grid lg:grid-cols-[42%_58%] lg:gap-10 lg:px-12">
          <div className="relative border-white/45 pb-10 lg:border-r lg:pb-0 lg:pr-12">
            <div className="flex items-center gap-3">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ff6a2a] sm:text-xs">
                Request a quote
              </p>
              <span className="h-[2px] w-12 bg-[#ff6a2a]" />
            </div>
            <h2 className="mt-5 text-[46px] font-black leading-[0.88] tracking-[-0.045em] sm:text-[58px]">
              Let&apos;s plan your
              <br />
              <span className="text-[#ff6428]">next expo.</span>
            </h2>
            <p className="mt-5 max-w-[390px] text-sm font-medium leading-[1.4] text-white/90 sm:text-base">
              Tell us about your event and requirements, and we&apos;ll get back to you with a customised proposal.
            </p>

            <div className="pointer-events-none absolute -bottom-4 left-0 hidden h-28 w-[90%] opacity-45 sm:block">
              <div className="absolute bottom-4 left-8 h-20 w-64 border-x border-t border-[#ff6428] [transform:skewY(-10deg)]" />
              <div className="absolute bottom-4 left-24 h-24 w-28 border-x border-t border-[#ff6428]" />
              <div className="absolute bottom-4 left-0 h-px w-[95%] -rotate-[7deg] bg-[#ff6428]" />
              <div className="absolute bottom-4 left-0 h-px w-[95%] -rotate-[14deg] bg-[#ff6428]/70" />
            </div>
          </div>

          <form className="relative mt-2 lg:mt-0" noValidate onSubmit={handleQuoteSubmit}>
            <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2" data-reveal-stagger="slide-left" style={{ '--reveal-delay': '300ms' } as React.CSSProperties}>
              {[
                { name: 'name', label: 'Name', type: 'text' },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'phone', label: 'Phone', type: 'tel' },
                { name: 'expoName', label: 'Expo name', type: 'text' },
                { name: 'location', label: 'Location', type: 'text' },
                { name: 'eventDate', label: 'Event date', type: 'date' },
                { name: 'dimensions', label: 'Stall dimensions', type: 'text' },
              ].map((field) => field.type === 'date' ? (
                <div key={field.name}>
                  <DateField
                    name={field.name}
                    label={field.label}
                    placeholder={`${field.label} * (DD/MM/YYYY)`}
                    invalid={Boolean(formErrors[field.name])}
                    onChange={clearStatus}
                    className={`h-11 w-full rounded-md border bg-[#08243b]/60 px-3 text-sm text-white outline-none placeholder:text-white/90 focus:border-[#ff6428] ${formErrors[field.name] ? 'border-red-400' : 'border-white/65'}`}
                  />
                  {formErrors[field.name] && <span className="mt-1 block text-xs text-red-300">{formErrors[field.name]}</span>}
                </div>
              ) : (
                <label key={field.name}>
                  <span className="sr-only">{field.label}</span>
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={`${field.label} *`}
                    maxLength={field.name === 'phone' ? 10 : undefined}
                    inputMode={field.name === 'phone' ? 'numeric' : undefined}
                    onInput={field.name === 'phone' ? (event) => {
                      event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '').slice(0, 10)
                      clearStatus()
                    } : () => clearStatus()}
                    aria-invalid={Boolean(formErrors[field.name])}
                    className={`h-11 w-full rounded-md border bg-[#08243b]/60 px-3 text-sm text-white outline-none placeholder:text-white/90 focus:border-[#ff6428] ${formErrors[field.name] ? 'border-red-400' : 'border-white/65'}`}
                  />
                  {formErrors[field.name] && <span className="mt-1 block text-xs text-red-300">{formErrors[field.name]}</span>}
                </label>
              ))}

              <label>
                <span className="sr-only">Budget range</span>
                <select name="budget" defaultValue="" onChange={() => clearStatus()} aria-invalid={Boolean(formErrors.budget)} className={`h-11 w-full rounded-md border bg-[#08243b] px-3 text-sm text-white outline-none focus:border-[#ff6428] ${formErrors.budget ? 'border-red-400' : 'border-white/65'}`}>
                  <option value="" disabled>Budget range *</option>
                  <option value="under-5l">Under ₹5 lakh</option>
                  <option value="5l-10l">₹5–10 lakh</option>
                  <option value="10l-25l">₹10–25 lakh</option>
                  <option value="25l-plus">₹25 lakh+</option>
                </select>
                {formErrors.budget && <span className="mt-1 block text-xs text-red-300">{formErrors.budget}</span>}
              </label>

              <label className="sm:col-span-2">
                <span className="sr-only">Service</span>
                <select name="service" defaultValue="" onChange={() => clearStatus()} aria-invalid={Boolean(formErrors.service)} className={`h-11 w-full rounded-md border bg-[#08243b] px-3 text-sm text-white outline-none focus:border-[#ff6428] ${formErrors.service ? 'border-red-400' : 'border-white/65'}`}>
                  <option value="" disabled>Service *</option>
                  <option>Exhibition Stalls</option>
                  <option>Event Setups</option>
                  <option>Custom Designs</option>
                  <option>Brand Experiences</option>
                </select>
                {formErrors.service && <span className="mt-1 block text-xs text-red-300">{formErrors.service}</span>}
              </label>

              <label className="sm:col-span-2">
                <span className="sr-only">Requirements</span>
                <textarea name="requirements" rows={3} placeholder="Requirements *" onInput={() => clearStatus()} aria-invalid={Boolean(formErrors.requirements)} className={`w-full resize-none rounded-md border bg-[#08243b]/60 px-3 py-3 text-sm text-white outline-none placeholder:text-white/90 focus:border-[#ff6428] ${formErrors.requirements ? 'border-red-400' : 'border-white/65'}`} />
                {formErrors.requirements && <span className="mt-1 block text-xs text-red-300">{formErrors.requirements}</span>}
              </label>
            </div>

            {/* Honeypot: hidden from people, filled in only by spam bots */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex items-center gap-6 rounded-md bg-[#ff6428] px-7 py-3 text-sm font-extrabold text-white transition hover:bg-[#ed5118] focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-wait disabled:opacity-75"
              >
                {status === 'sending' ? 'Sending…' : 'Request a quote'}
                {status === 'sending' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>
              {status === 'sent' && (
                <p role="status" className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  {statusMessage}
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="flex items-center gap-2 text-sm font-semibold text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {statusMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
  )
}
