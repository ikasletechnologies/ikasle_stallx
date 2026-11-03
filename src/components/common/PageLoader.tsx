import React, { useState, useEffect } from 'react'

export interface PageLoaderProps {
  minDurationMs?: number
}

export const PageLoader: React.FC<PageLoaderProps> = ({ minDurationMs = 1200 }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(12)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // Progress bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95
        }
        const jump = Math.floor(Math.random() * 18) + 8
        return Math.min(prev + jump, 95)
      })
    }, 120)

    const timer = setTimeout(() => {
      setProgress(100)
      setIsFadingOut(true)
      const removeTimer = setTimeout(() => {
        setIsLoading(false)
      }, 600)
      return () => clearTimeout(removeTimer)
    }, minDurationMs)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [minDurationMs])

  if (!isLoading) return null

  return (
    <div
      aria-live="polite"
      aria-label="Loading Ikasle StallX..."
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#061829] text-white transition-all duration-600 ease-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Architectural Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Ambient Radial Glow */}
      <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-[#ff7a00]/15 blur-3xl" />

      <div className="relative flex flex-col items-center text-center px-6">
        {/* Favicon Icon with Rotating Orbital Rings */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Outer Rotating Ring */}
          <div className="absolute h-28 w-28 rounded-full border-2 border-transparent border-t-[#ff7a00] border-r-[#ff7a00]/40 animate-spin" />
          
          {/* Inner Counter-Rotating Ring */}
          <div className="absolute h-24 w-24 rounded-full border border-white/10 border-b-[#ff7a00]/60 animate-[spin_2s_linear_infinite_reverse]" />

          {/* Central Favicon Emblem */}
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-2xl shadow-[#ff7a00]/30 border border-white/20 p-3 animate-pulse">
            <img
              src="/favicon.png"
              alt="Ikasle StallX Favicon"
              className="h-14 w-14 object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
          Ikaslé <span className="text-[#ff7a00]">StallX</span>
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-300 tracking-wider uppercase mb-6 opacity-90">
          Exhibition &amp; Stall Architecture
        </p>

        {/* Modern Progress Line */}
        <div className="w-56 sm:w-64 h-1.5 rounded-full bg-white/10 overflow-hidden relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#ff7a00] via-[#ffa142] to-[#ff7a00] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Text */}
        <span className="mt-3 font-mono text-[11px] text-slate-400">
          Loading Expo Platform... {progress}%
        </span>
      </div>
    </div>
  )
}
