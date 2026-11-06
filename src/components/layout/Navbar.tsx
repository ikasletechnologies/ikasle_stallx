import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import logoImg from '@/assets/stallX.png'
import { services } from '@/data/services'

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null)
  const [mobileServiceOpen, setMobileServiceOpen] = useState<string | null>(null)
  const servicesButtonRef = useRef<HTMLButtonElement>(null)
  const dropdownCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const submenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeService = services.find((service) => service.id === activeServiceId)

  const clearTimer = (timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }

  useEffect(() => () => {
    clearTimer(dropdownCloseTimer)
    clearTimer(submenuCloseTimer)
  }, [])

  const openServices = () => {
    clearTimer(dropdownCloseTimer)
    setServicesOpen(true)
  }

  const closeServices = () => {
    clearTimer(dropdownCloseTimer)
    clearTimer(submenuCloseTimer)
    setServicesOpen(false)
    setActiveServiceId(null)
  }

  const scheduleServicesClose = () => {
    clearTimer(dropdownCloseTimer)
    dropdownCloseTimer.current = setTimeout(closeServices, 180)
  }

  const showSubmenu = (serviceId: string) => {
    clearTimer(submenuCloseTimer)
    setActiveServiceId(serviceId)
  }

  const scheduleSubmenuClose = () => {
    clearTimer(submenuCloseTimer)
    submenuCloseTimer.current = setTimeout(() => setActiveServiceId(null), 140)
  }

  const closeMenus = () => {
    setIsOpen(false)
    setServicesOpen(false)
    setActiveServiceId(null)
    setMobileServiceOpen(null)
  }

  const handleServicesKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape') return
    event.preventDefault()
    closeServices()
    servicesButtonRef.current?.focus()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="/#home" aria-label="Ikaslé StallX home" className="flex shrink-0 items-center">
          <img src={logoImg} alt="Ikaslé StallX" className="h-[52px] w-[158px] object-contain object-left" />
        </a>

        <nav className="hidden items-center gap-12 md:flex" aria-label="Main navigation">
          <a href="/#home" className="relative py-6 text-sm font-bold text-[#071c31] transition-colors hover:text-[#f15a24] after:absolute after:inset-x-0 after:bottom-[13px] after:h-[3px] after:rounded-full after:bg-[#f15a24]">Home</a>
          <a href="/#about" className="py-6 text-sm font-bold text-[#071c31] transition-colors hover:text-[#f15a24]">About</a>

          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleServicesClose}
            onFocus={openServices}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleServicesClose()
            }}
            onKeyDown={handleServicesKeyDown}
          >
            <button
              ref={servicesButtonRef}
              type="button"
              onClick={() => (servicesOpen ? closeServices() : openServices())}
              className="flex h-[74px] items-center gap-1.5 text-sm font-bold text-[#071c31] transition-colors hover:text-[#f15a24]"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`absolute left-1/2 top-full w-[280px] -translate-x-1/2 pt-1 transition-all duration-200 ${servicesOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}>
              <ul className="w-[280px] space-y-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_18px_50px_rgba(7,28,49,.14)]">
                {services.map((service) => {
                  const isActive = service.id === activeServiceId
                  return (
                    <li key={service.id}>
                      <a
                        href={`/#${service.id}`}
                        onMouseEnter={() => showSubmenu(service.id)}
                        onMouseLeave={scheduleSubmenuClose}
                        onFocus={() => showSubmenu(service.id)}
                        onBlur={scheduleSubmenuClose}
                        onClick={closeServices}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold transition ${isActive ? 'bg-[#fff1e9] text-[#f15a24]' : 'text-[#071c31] hover:bg-slate-50'}`}
                      >
                        {service.title}
                        <ChevronRight className={`h-4 w-4 shrink-0 transition ${isActive ? 'translate-x-0.5 text-[#f15a24]' : 'text-slate-400'}`} strokeWidth={2.4} />
                      </a>
                    </li>
                  )
                })}
              </ul>

              {activeService && (
                <div
                  className="absolute left-[288px] top-1 w-[320px] rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_18px_50px_rgba(7,28,49,.14)]"
                  onMouseEnter={() => showSubmenu(activeService.id)}
                  onMouseLeave={scheduleSubmenuClose}
                  onFocus={() => showSubmenu(activeService.id)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleSubmenuClose()
                  }}
                >
                  <ul className="space-y-0.5">
                    {activeService.topics.map((topic) => (
                      <li key={topic.title}>
                        <a href={`/#${activeService.id}`} onClick={closeServices} className="block rounded-lg px-2 py-2.5 text-[13px] font-semibold text-[#2a3b4c] transition hover:bg-[#fff4ec] hover:pl-3 hover:text-[#f15a24]">
                          {topic.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <a href="/#contact" className="py-6 text-sm font-bold text-[#071c31] transition-colors hover:text-[#f15a24]">Contact</a>
        </nav>

        <a href="/#contact" className="group hidden items-center gap-5 rounded-md bg-[#f15a24] px-6 py-3 text-sm font-bold text-white shadow-[0_5px_12px_rgba(241,90,36,.22)] transition hover:bg-[#dd4b18] md:inline-flex">
          Request a Quote
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>

        <button type="button" onClick={() => setIsOpen((open) => !open)} className="inline-flex rounded-md p-2 text-[#071c31] hover:bg-slate-100 md:hidden" aria-label="Toggle navigation menu" aria-expanded={isOpen}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden" onKeyDown={(event) => event.key === 'Escape' && closeMenus()}>
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            <a href="/#home" onClick={closeMenus} className="rounded-md px-3 py-3 text-sm font-bold text-[#071c31] hover:bg-orange-50 hover:text-[#f15a24]">Home</a>
            <a href="/#about" onClick={closeMenus} className="rounded-md px-3 py-3 text-sm font-bold text-[#071c31] hover:bg-orange-50 hover:text-[#f15a24]">About</a>

            <button type="button" onClick={() => setServicesOpen((open) => !open)} className="flex items-center justify-between rounded-md px-3 py-3 text-sm font-bold text-[#071c31] hover:bg-orange-50 hover:text-[#f15a24]" aria-expanded={servicesOpen}>
              Services
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesOpen && (
              <div className="ml-3 space-y-1 border-l-2 border-[#f15a24]/30 pl-3">
                {services.map((service) => {
                  const expanded = mobileServiceOpen === service.id
                  return (
                    <div key={service.id}>
                      <button
                        type="button"
                        onClick={() => setMobileServiceOpen(expanded ? null : service.id)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-[#f15a24]"
                        aria-expanded={expanded}
                      >
                        {service.title}
                        <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                      </button>
                      {expanded && (
                        <div className="mb-2 ml-3 space-y-0.5">
                          {service.topics.map((topic) => (
                            <a key={topic.title} href={`/#${service.id}`} onClick={closeMenus} className="flex items-center gap-1.5 rounded-md px-3 py-2 text-[13px] font-medium text-slate-500 hover:bg-orange-50 hover:text-[#f15a24]">
                              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#f15a24]" strokeWidth={2.6} />
                              {topic.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <a href="/#contact" onClick={closeMenus} className="rounded-md px-3 py-3 text-sm font-bold text-[#071c31] hover:bg-orange-50 hover:text-[#f15a24]">Contact</a>
            <a href="/#contact" onClick={closeMenus} className="mt-3 inline-flex items-center justify-center gap-3 rounded-md bg-[#f15a24] px-5 py-3 text-sm font-bold text-white">
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
