// 输出面板组件 — 显示 stdout/stderr + 内联输入
import { useRef, useEffect, RefObject } from 'react'

interface Props {
  output: string[]
  running: boolean
  awaitingInput: boolean
  inputBuffer: string
  onInputChange: (v: string) => void
  onInputSubmit: () => void
  inputRef: RefObject<any>
}

export default function OutputPanel({ output, running, awaitingInput, inputBuffer, onInputChange, onInputSubmit, inputRef }: Props) {
  const outputBottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => { outputBottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [output, awaitingInput])

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '8px 12px', fontFamily: "'Fira Code',monospace", fontSize: 13, whiteSpace: 'pre-wrap', background: '#1e1e1e' }}>
      {output.length === 0 && !awaitingInput && (
        <div style={{ color: '#666', textAlign: 'center', paddingTop: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>▶</div>
          <div>Python 3.12 · 点击「运行」</div>
        </div>
      )}
      {output.map((l, i) => {
        const e = l.startsWith('❌'), d = l.startsWith('---')
        return <div key={i} style={{ color: e ? '#f87171' : d ? '#4ec9b0' : '#d4d4d4', lineHeight: 1.6 }}>{l}</div>
      })}
      {running && !awaitingInput && <div style={{ color: '#888' }}>▶ 执行中...</div>}
      {awaitingInput && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
          <span style={{ color: '#4ec9b0' }}>&gt;</span>
          <input ref={inputRef} value={inputBuffer} onChange={e => onInputChange(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') onInputSubmit() }}
            style={{ flex: 1, background: 'transparent', border: 'none', color: '#d4d4d4', outline: 'none', fontFamily: "'Fira Code',monospace", fontSize: 13 }}
            autoFocus />
        </div>
      )}
      <div ref={outputBottomRef} />
    </div>
  )
}
