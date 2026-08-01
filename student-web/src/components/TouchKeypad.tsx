// 触屏虚拟按键面板 — 为移动端无键盘设备提供按键输入
// 适用于 Scratch / Python Turtle / Pygame 等依赖键盘交互的作品

import { useState, useCallback } from 'react'

interface TouchKeypadProps {
  onKey: (key: string, code: string, type: 'keydown' | 'keyup') => void
}

interface KeyDef {
  label: string
  key: string
  code: string
}

const ROWS: KeyDef[][] = [
  [
    { label: '←', key: 'ArrowLeft', code: 'ArrowLeft' },
    { label: '↑', key: 'ArrowUp', code: 'ArrowUp' },
    { label: '↓', key: 'ArrowDown', code: 'ArrowDown' },
    { label: '→', key: 'ArrowRight', code: 'ArrowRight' },
  ],
  [
    { label: 'W', key: 'w', code: 'KeyW' },
    { label: 'A', key: 'a', code: 'KeyA' },
    { label: 'S', key: 's', code: 'KeyS' },
    { label: 'D', key: 'd', code: 'KeyD' },
  ],
  [
    { label: '空格', key: ' ', code: 'Space' },
    { label: '回车', key: 'Enter', code: 'Enter' },
    { label: 'ESC', key: 'Escape', code: 'Escape' },
  ],
]

export default function TouchKeypad({ onKey }: TouchKeypadProps) {
  const [collapsed, setCollapsed] = useState(true)
  const [pressedCode, setPressedCode] = useState<string | null>(null)

  const fire = useCallback((key: string, code: string) => {
    onKey(key, code, 'keydown')
    setTimeout(() => onKey(key, code, 'keyup'), 150)
  }, [onKey])

  const handleStart = (k: KeyDef) => (e: React.PointerEvent) => {
    e.preventDefault()
    setPressedCode(k.code)
  }

  const handleEnd = () => {
    if (pressedCode) {
      const found = ROWS.flat().find((r) => r.code === pressedCode)
      if (found) fire(found.key, found.code)
      setPressedCode(null)
    }
  }

  return (
    <div style={{ marginTop: 8, userSelect: 'none', WebkitUserSelect: 'none' }}>
      <div
        onClick={() => setCollapsed((c) => !c)}
        style={{ fontSize: 12, color: '#1890ff', cursor: 'pointer', marginBottom: 4, display: 'inline-block' }}
      >
        {collapsed ? '📱 显示触屏按键' : '📱 隐藏触屏按键'}
      </div>
      {!collapsed && (
        <div style={{ background: '#fafafa', borderRadius: 12, padding: '8px 4px', border: '1px solid #f0f0f0' }}>
          {ROWS.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              {row.map((k) => {
                const isPressed = pressedCode === k.code
                return (
                  <span
                    key={k.code}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: 48,
                      height: 44,
                      padding: '4px 12px',
                      margin: 4,
                      borderRadius: 8,
                      border: `1px solid ${isPressed ? '#1890ff' : '#d9d9d9'}`,
                      background: isPressed ? '#e6f7ff' : '#fff',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#333',
                      cursor: 'pointer',
                      touchAction: 'manipulation',
                      transition: 'background 0.1s, border-color 0.1s',
                    }}
                    onPointerDown={handleStart(k)}
                    onPointerUp={handleEnd}
                    onPointerLeave={handleEnd}
                    onPointerCancel={handleEnd}
                  >
                    {k.label}
                  </span>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
