// 文本工具:作品名等字段由导入脚本写入,可能含未解码的 HTML 实体(如 &#8211;)
// React 文本节点本身会转义,这里只负责把实体还原成可读字符(结果仍按纯文本渲染,无 XSS 风险)
const decoder = typeof document !== 'undefined' ? document.createElement('textarea') : null

export function decodeEntities(input?: string | null): string {
  if (!input) return ''
  if (!decoder || !input.includes('&')) return input
  decoder.innerHTML = input
  return decoder.value
}
