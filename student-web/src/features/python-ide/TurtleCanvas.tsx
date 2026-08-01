// Turtle 画布组件 — 含焦点模式、清空、尺寸自适应
import { useRef, useState, useEffect, RefObject } from 'react'

interface Props {
  canvasRef: RefObject<any>
  width?: number
  height?: number
  onClear?: () => void
  showHeader?: boolean
  compact?: boolean
}

export default function TurtleCanvas({ canvasRef, width = 380, height = 360, onClear, showHeader = true, compact = false }: Props) {
  const [focused, setFocused] = useState(false)

  // Esc 退出焦点模式
  useEffect(() => {
    if (!focused) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setFocused(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [focused])

  return (
    <div style={{
      width: compact ? 200 : 400,
      borderRight: compact ? 'none' : '1px solid #3e3e42',
      borderLeft: compact ? '1px solid #3e3e42' : 'none',
      display: 'flex', flexDirection: 'column', background: '#fff', flexShrink: 0, overflow: 'hidden',
      resize: 'horizontal' as any, minWidth: compact ? 120 : 240,
    }}>
      {showHeader && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px', background: '#252526', borderBottom: '1px solid #3e3e42', fontSize: 12, color: '#888' }}>
          <span style={{color:'#4ec9b0'}}>🐢 {compact ? '' : 'Turtle 画布'}</span>
          {!compact && (
            <div style={{ display: 'flex', gap: 4 }}>
              <span onClick={() => setFocused(!focused)}
                style={{ cursor: 'pointer', padding: '1px 6px', borderRadius: 3, background: focused ? '#4ec9b0' : '#3e3e42', color: focused ? '#fff' : '#ccc', fontSize: 11 }}>
                {focused ? '已锁定' : '点击聚焦'}
              </span>
              <span onClick={() => { onClear?.() }}
                style={{ cursor: 'pointer', padding: '1px 6px', borderRadius: 3, background: '#3e3e42', color: '#ccc', fontSize: 11 }}>清空</span>
            </div>
          )}
        </div>
      )}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', cursor: focused ? 'crosshair' : 'pointer', minHeight: compact ? 150 : 200,
        background: '#fff'
      }}
        onClick={() => { setFocused(true); canvasRef.current?.focus() }}>
        <canvas ref={canvasRef} id="turtleCanvas" width={compact ? 180 : width} height={compact ? 160 : height} tabIndex={0}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => { if (focused) e.preventDefault() }}
          style={{ maxWidth: '100%', outline: focused ? '2px solid #4ec9b0' : 'none', outlineOffset: -1 }} />
        {!focused && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', fontSize: compact ? 10 : 12, color: '#999' }}>
            {compact ? '画布' : '点击激活键盘控制'}
          </div>
        )}
      </div>
    </div>
  )
}
