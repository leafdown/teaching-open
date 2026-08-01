import React, { useState } from 'react'
import '../styles/maic-tokens.css'
import '../styles/maic-components.css'

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  width?: number
  height?: number
  defaultFlipped?: boolean
  flipped?: boolean
  onFlip?: (flipped: boolean) => void
  onClick?: () => void
  gradientBorderColor?: string
  className?: string
  style?: React.CSSProperties
}

export default function FlipCard({
  front,
  back,
  width = 196,
  height = 290,
  defaultFlipped = false,
  flipped: controlledFlipped,
  onFlip,
  onClick,
  gradientBorderColor,
  className = '',
  style,
}: FlipCardProps) {
  const [internalFlipped, setInternalFlipped] = useState(defaultFlipped)

  const isFlipped = controlledFlipped ?? internalFlipped

  function handleClick() {
    if (onClick) {
      onClick()
      return
    }
    if (controlledFlipped === undefined) {
      setInternalFlipped((prev) => !prev)
    }
    onFlip?.(!isFlipped)
  }

  const borderStyle: React.CSSProperties = gradientBorderColor
    ? { background: gradientBorderColor }
    : {}

  return (
    <div
      className={`card-flip-container ${className}`}
      style={{ width, height, perspective: 900, ...style }}
      onClick={handleClick}
    >
      <div
        className={`card-flip-inner ${isFlipped ? 'flipped' : ''}`}
      >
        {/* Front face */}
        <div className="card-front">
          <div className="card-gradient-border" style={borderStyle}>
            {front}
          </div>
        </div>

        {/* Back face */}
        <div className="card-back">
          <div className="card-gradient-border" style={borderStyle}>
            {back}
          </div>
        </div>
      </div>
    </div>
  )
}
