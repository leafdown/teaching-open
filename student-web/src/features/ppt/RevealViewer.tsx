import { useEffect, useRef } from 'react'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { SlideData } from './slide-generator'

declare global {
  interface Window { Reveal: any }
}

interface Props {
  slides: SlideData[]
  onBack: () => void
}

export function RevealViewer({ slides, onBack }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initReveal = () => {
      if (window.Reveal && containerRef.current) {
        containerRef.current.innerHTML = buildSlidesHtml(slides)
        window.Reveal(containerRef.current, {
          hash: false, controls: true, progress: true,
          slideNumber: true, transition: 'slide',
        }).initialize()
      }
    }
    if (window.Reveal) { initReveal(); return }
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.css'
    document.head.appendChild(link)
    const theme = document.createElement('link')
    theme.rel = 'stylesheet'
    theme.href = 'https://cdn.jsdelivr.net/npm/reveal.js@5/dist/theme/white.css'
    document.head.appendChild(theme)
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.js'
    script.onload = initReveal
    document.body.appendChild(script)
    return () => { try { window.Reveal?.destroy?.() } catch {} }
  }, [slides])

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 1000 }}>
      <Button icon={<ArrowLeftOutlined />} onClick={onBack}
        style={{ position: 'absolute', top: 12, left: 12, zIndex: 100 }}>返回</Button>
      <div ref={containerRef} className="reveal" style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

function buildSlidesHtml(slides: SlideData[]): string {
  return '<div class="slides">' + slides.map(s => {
    const bg = s.bg ? ` style="background:${s.bg};color:#fff"` : ''
    const img = s.image ? `<img src="${s.image}" style="max-height:300px;object-fit:contain;background:#f5f5f5;padding:8px;border-radius:8px"/>` : ''
    const bullets = s.bullets ? `<ul>${s.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : ''
    const content = s.content ? `<p style="white-space:pre-line">${escapeHtml(s.content)}</p>` : ''
    return `<section${bg}><h2>${escapeHtml(s.title)}</h2>${img}${content}${bullets}</section>`
  }).join('') + '</div>'
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
