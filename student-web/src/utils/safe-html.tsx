// 统一富文本安全过滤 + 渲染组件(对齐旧前端 v-safe-html,基于 DOMPurify 白名单)
// 所有来自后端的富文本(newsContent/courseDesc/mediaContent/_homeHtml 等)展示都应走这里
import DOMPurify from 'dompurify'
import React from 'react'

// 白名单:常见行内/块级格式 + 媒体(图片/音视频/iframe 课程外链) + 表格 + 代码块
// 脚本与事件处理器默认被 DOMPurify 剥离
const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'a', 'b', 'i', 'em', 'strong', 'u', 's', 'strike', 'sub', 'sup', 'br',
    'p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'img', 'video', 'source', 'audio',
    'iframe', // 课程视频常内嵌 iframe(B站/优酷等)
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'pre', 'code', 'blockquote', 'hr', 'font', 'center',
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'width', 'height', 'style', 'class',
    'target', 'rel', 'controls', 'autoplay', 'loop', 'muted', 'poster',
    'allowfullscreen', 'frameborder', 'scrolling', 'colspan', 'rowspan',
    'align', 'valign', 'color', 'face', 'size', 'bgcolor',
  ],
  ALLOW_DATA_ATTR: false,
}

// iframe/media src 仅允许 http(s): 与图片 data:,防止 javascript:/data:html 等协议外链
function installSrcHook() {
  if (typeof window === 'undefined') return
  DOMPurify.addHook('uponSanitizeAttribute', (_node, data) => {
    if (data.attrName === 'src' && typeof data.attrValue === 'string') {
      if (!/^https?:|^data:image\//i.test(data.attrValue)) {
        data.keepAttr = false
      }
    }
  })
}
installSrcHook()

// SSR 兜底:无 DOM 时用正则粗过滤(Vite CSR 下始终有 window,极少触发)
function fallbackSanitize(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son\w+\s*=\s*'[^']*'/gi, '')
    .replace(/javascript:/gi, '')
}

export function sanitizeHtml(html: string): string {
  if (!html) return ''
  if (typeof window === 'undefined') return fallbackSanitize(html)
  // dompurify v3 返回 TrustedHTML,转 string 以兼容 dangerouslySetInnerHTML
  return DOMPurify.sanitize(html, PURIFY_CONFIG) as unknown as string
}

// <SafeHtml html={content} /> — 内部 dangerouslySetInnerHTML + sanitize
export function SafeHtml({ html, className, style }: { html?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html || '') }}
    />
  )
}

// 移动端判断(对齐旧前端 _isMobile)
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
