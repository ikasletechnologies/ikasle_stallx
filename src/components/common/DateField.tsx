import React, { useEffect, useRef, useState } from 'react'
import { CalendarDays } from 'lucide-react'

/**
 * Date input that always shows DD/MM/YYYY, whatever the visitor's browser language.
 * (A native <input type="date"> follows the OS locale, e.g. mm/dd/yyyy in the US.)
 *
 * Visitors can type the date (slashes are added automatically) or pick it from the
 * calendar button. The form receives `name` as an ISO date (YYYY-MM-DD) when the date is
 * valid, otherwise the raw text, so validation can flag it.
 */

const pad = (n: number) => String(n).padStart(2, '0')
export const todayIso = () => {
  const now = new Date()
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

const isoToDisplay = (iso: string) => {
  const [y, m, d] = iso.split('-')
  return y && m && d ? `${d}/${m}/${y}` : ''
}

/** "12/12/2026" → "2026-12-12" when it is a real calendar date, otherwise null. */
export const displayToIso = (display: string): string | null => {
  const match = display.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return null
  const [, dd, mm, yyyy] = match
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd))
  const valid = date.getFullYear() === Number(yyyy) && date.getMonth() === Number(mm) - 1 && date.getDate() === Number(dd)
  return valid ? `${yyyy}-${mm}-${dd}` : null
}

const maskDisplay = (raw: string) => {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

interface DateFieldProps {
  name: string
  label: string
  placeholder?: string
  invalid?: boolean
  className?: string
  onChange?: () => void
}

export const DateField: React.FC<DateFieldProps> = ({ name, label, placeholder = 'DD/MM/YYYY', invalid, className = '', onChange }) => {
  const [display, setDisplay] = useState('')
  const textRef = useRef<HTMLInputElement>(null)
  const pickerRef = useRef<HTMLInputElement>(null)

  // Clear when the parent form is reset (e.g. after a successful submission).
  useEffect(() => {
    const form = textRef.current?.form
    if (!form) return undefined
    const onReset = () => setDisplay('')
    form.addEventListener('reset', onReset)
    return () => form.removeEventListener('reset', onReset)
  }, [])

  const update = (value: string) => {
    setDisplay(value)
    onChange?.()
  }

  const openPicker = () => {
    const picker = pickerRef.current
    if (!picker) return
    picker.value = displayToIso(display) ?? ''
    try {
      picker.showPicker()
    } catch {
      picker.focus()
      picker.click()
    }
  }

  return (
    <div className="relative">
      <span className="sr-only">{label} (DD/MM/YYYY)</span>
      <input
        ref={textRef}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        maxLength={10}
        value={display}
        placeholder={placeholder}
        aria-label={`${label}, format DD/MM/YYYY`}
        aria-invalid={invalid}
        onChange={(event) => update(maskDisplay(event.target.value))}
        className={`${className} pr-11`}
      />
      {/* What the form actually submits */}
      <input type="hidden" name={name} value={displayToIso(display) ?? display} />

      <button
        type="button"
        onClick={openPicker}
        aria-label={`Choose ${label.toLowerCase()} from calendar`}
        className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded text-white/80 transition hover:bg-white/10 hover:text-[#ff6428]"
      >
        <CalendarDays className="h-4.5 w-4.5" />
      </button>
      {/* Native calendar, only used as a picker */}
      <input
        ref={pickerRef}
        type="date"
        tabIndex={-1}
        aria-hidden="true"
        min={todayIso()}
        onChange={(event) => event.target.value && update(isoToDisplay(event.target.value))}
        className="pointer-events-none absolute bottom-0 right-0 h-0 w-0 opacity-0"
      />
    </div>
  )
}
