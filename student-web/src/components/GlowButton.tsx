import React from 'react'
import '../styles/maic-tokens.css'
import '../styles/maic-components.css'

interface GlowButtonProps {
  children: React.ReactNode
  onClick?: () => void
  color?: string
  size?: 'small' | 'middle' | 'large'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  icon?: React.ReactNode
  htmlType?: 'button' | 'submit'
  style?: React.CSSProperties
  className?: string
}

function getSizeClass(size: 'small' | 'middle' | 'large'): string {
  if (size === 'small') return 'size-small'
  if (size === 'large') return 'size-large'
  return ''
}

export default function GlowButton({
  children,
  onClick,
  color,
  size = 'middle',
  disabled = false,
  loading = false,
  block = false,
  icon,
  htmlType = 'button',
  style,
  className = '',
}: GlowButtonProps) {
  const classNames = [
    'glow-btn',
    getSizeClass(size),
    block ? 'block' : '',
    loading ? 'loading' : '',
    disabled ? 'disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const resolvedStyle: React.CSSProperties = {
    ...(color ? { '--glow-btn-color': color, background: color } as unknown as React.CSSProperties : {}),
    ...style,
  }

  return (
    <button
      type={htmlType}
      className={classNames}
      style={resolvedStyle}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
    >
      {loading && <span className="glow-spinner" />}
      {!loading && icon}
      {children}
    </button>
  )
}
