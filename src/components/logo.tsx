import React from "react"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizes = {
    sm: { icon: "h-6 w-6", text: "text-lg" },
    md: { icon: "h-8 w-8", text: "text-xl" },
    lg: { icon: "h-12 w-12", text: "text-3xl" }
  }

  const currentSize = sizes[size]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Chef Hat Icon with Fork & Knife */}
      <svg
        className={currentSize.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Chef Hat */}
        <path
          d="M50 20C42 20 36 26 36 34C28 34 22 40 22 48C22 52 24 55.5 27 58V75C27 78 29.5 80 32.5 80H67.5C70.5 80 73 78 73 75V58C76 55.5 78 52 78 48C78 40 72 34 64 34C64 26 58 20 50 20Z"
          fill="url(#gradient1)"
        />
        {/* Hat Brim */}
        <rect x="25" y="75" width="50" height="8" rx="2" fill="url(#gradient2)" />
        {/* Fork (left) */}
        <g transform="translate(15, 45)">
          <rect x="0" y="0" width="2" height="25" fill="currentColor" className="text-orange-600" />
          <rect x="0" y="0" width="2" height="5" fill="currentColor" className="text-orange-600" />
          <rect x="5" y="0" width="2" height="8" fill="currentColor" className="text-orange-600" />
          <rect x="10" y="0" width="2" height="5" fill="currentColor" className="text-orange-600" />
        </g>
        {/* Knife (right) */}
        <g transform="translate(73, 45)">
          <rect x="0" y="0" width="2" height="25" fill="currentColor" className="text-orange-600" />
          <path d="M -2 0 L 4 0 L 2 5 Z" fill="currentColor" className="text-orange-500" />
        </g>
        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span className={`font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent ${currentSize.text}`}>
          ChefMate
        </span>
      )}
    </div>
  )
}
