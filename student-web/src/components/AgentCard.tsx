import React from 'react'
import FlipCard from './FlipCard'
import '../styles/maic-tokens.css'
import '../styles/maic-components.css'

interface AgentCardProps {
  name: string
  role: string
  persona: string
  avatar: string
  color: string
  width?: number
  height?: number
  revealed?: boolean
  onClick?: () => void
  roleIcon?: string
}

const ROLE_ICONS: Record<string, string> = {
  teacher: '\u{1F468}\u{200D}\u{1F3EB}',
  assistant: '\u{1F91D}',
  student: '\u{1F393}',
}

function lighten(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const lr = Math.round(r + (255 - r) * amount)
  const lg = Math.round(g + (255 - g) * amount)
  const lb = Math.round(b + (255 - b) * amount)
  return `rgb(${lr},${lg},${lb})`
}

function isUrl(str: string): boolean {
  return str.startsWith('http') || str.startsWith('/') || str.startsWith('data:')
}

export default function AgentCard({
  name,
  role,
  persona,
  avatar,
  color,
  width = 196,
  height = 290,
  revealed = true,
  onClick,
  roleIcon,
}: AgentCardProps) {
  const icon = roleIcon ?? ROLE_ICONS[role] ?? '\u{1F393}'
  const borderGradient = `linear-gradient(160deg, ${color}, ${lighten(color, 0.35)}, ${color})`

  const front = (
    <div className="card-body">
      {/* Top gradient band with noise */}
      <div className="card-top-band">
        <div
          className="card-top-band-fill"
          style={{
            background: `linear-gradient(135deg, ${color}30 0%, ${color}10 100%)`,
          }}
        />
        <div className="card-top-band-noise" />
        <svg
          className="card-band-accent"
          viewBox="0 0 64 64"
        >
          <line x1="64" y1="0" x2="0" y2="64" stroke="currentColor" strokeWidth="1" />
          <line x1="64" y1="16" x2="16" y2="64" stroke="currentColor" strokeWidth="1" />
          <line x1="64" y1="32" x2="32" y2="64" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Avatar overlapping band */}
      <div className="card-avatar">
        <div
          className="card-avatar-circle"
          style={{ borderColor: color }}
        >
          {isUrl(avatar) ? (
            <img src={avatar} alt={name} />
          ) : (
            <span style={{ fontSize: 22 }}>{avatar || name.charAt(0)}</span>
          )}
        </div>
      </div>

      {/* Name + role badge */}
      <div
        style={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          padding: '0 12px',
        }}
      >
        <h3
          style={{
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.025em',
            color,
            margin: 0,
          }}
        >
          {name}
        </h3>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            borderRadius: 9999,
            padding: '1px 8px',
            fontSize: 10,
            fontWeight: 500,
            color,
            backgroundColor: `${color}12`,
          }}
        >
          <span style={{ fontSize: 9 }}>{icon}</span>
          {role}
        </span>
      </div>

      {/* Ornamental divider */}
      <div
        style={{
          margin: '8px 20px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(to right, transparent, ${color}40, transparent)`,
          }}
        />
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: `${color}60`,
          }}
        />
        <div
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(to right, transparent, ${color}40, transparent)`,
          }}
        />
      </div>

      {/* Persona text */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          padding: '6px 14px 12px',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 10.5,
            lineHeight: 1.65,
            color: '#52525b',
          }}
        >
          {persona}
        </p>
      </div>

      {/* Bottom edge glow */}
      <div
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 'auto 0 0',
          height: 32,
          background: `linear-gradient(to top, ${color}08, transparent)`,
        }}
      />
    </div>
  )

  const back = (
    <div className="card-back-body">
      <div
        style={{
          position: 'absolute',
          inset: 12,
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      />
      {[
        { top: 12, left: 12 },
        { top: 12, right: 12 },
        { bottom: 12, left: 12 },
        { bottom: 12, right: 12 },
      ].map((pos, i) => (
        <svg
          key={i}
          style={{
            position: 'absolute',
            ...pos,
            width: 20,
            height: 20,
            color: 'rgba(255,255,255,0.07)',
          }}
          viewBox="0 0 20 20"
        >
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="currentColor" />
        </svg>
      ))}
      <svg
        style={{
          width: 36,
          height: 36,
          color: 'rgba(216,180,254,0.7)',
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v18" />
        <path d="M3 12h18" />
      </svg>
      <span
        style={{
          marginTop: 4,
          fontSize: 20,
          fontWeight: 700,
          color: 'rgba(216,180,254,0.5)',
        }}
      >
        ?
      </span>
    </div>
  )

  return (
    <FlipCard
      front={front}
      back={back}
      width={width}
      height={height}
      flipped={!revealed}
      gradientBorderColor={borderGradient}
      onClick={onClick}
    />
  )
}
