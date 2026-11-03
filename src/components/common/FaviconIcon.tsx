import React from 'react'

export interface FaviconIconProps {
  className?: string
  withBackground?: boolean
}

export const FaviconIcon: React.FC<FaviconIconProps> = ({
  className = 'h-16 w-16',
  withBackground = true,
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {withBackground && (
      <rect width="64" height="64" rx="16" fill="#081e33" />
    )}
    
    {/* Slanted Roof Canopy (Orange) */}
    <polygon points="14,20 40,10 54,16 28,26" fill="#ff7a00" />
    <polygon points="14,20 28,26 28,29 14,23" fill="#d85200" />
    <polygon points="28,26 54,16 54,18 28,29" fill="#bf4000" />
    
    {/* Left Pillar */}
    <polygon points="12,25 19,22 19,51 12,53" fill={withBackground ? "#ffffff" : "#081e33"} fillOpacity={withBackground ? "0.95" : "1"} />
    <polygon points="19,22 22,23 22,49 19,51" fill={withBackground ? "#cde2f2" : "#132d4b"} />
    
    {/* Center Doorway Partition (Orange) */}
    <polygon points="26,29 32,30 32,46 26,44" fill="#ff7a00" />
    <polygon points="24,30 26,29 26,44 24,45" fill="#d85200" />
    
    {/* Right Pillar */}
    <polygon points="35,28 43,25 43,50 35,53" fill={withBackground ? "#ffffff" : "#081e33"} fillOpacity={withBackground ? "0.95" : "1"} />
    <polygon points="43,25 47,26 47,48 43,50" fill={withBackground ? "#cde2f2" : "#132d4b"} />
  </svg>
)

