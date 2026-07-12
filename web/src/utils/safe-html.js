/**
 * v-safe-html — like v-html but sanitizes with DOMPurify to prevent XSS.
 *
 * Usage: <div v-safe-html="content"></div>
 *
 * All untrusted HTML (news content, course intros, announcements, rich text
 * from the backend) should use v-safe-html instead of v-html.
 */
import Vue from 'vue'
import DOMPurify from 'dompurify'

// Allow common inline formatting + media, block scripts/event handlers stripped by default.
const purifyConfig = {
  ALLOWED_TAGS: [
    'a', 'b', 'i', 'em', 'strong', 'u', 's', 'strike', 'sub', 'sup', 'br', 'p', 'div', 'span',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'img', 'video', 'source', 'audio',
    'iframe',  // course videos often embed iframes (Bilibili/Youku etc.)
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'pre', 'code', 'blockquote',
    'hr', 'font', 'center'
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'width', 'height', 'style', 'class',
    'target', 'rel', 'controls', 'autoplay', 'loop', 'muted', 'poster',
    'allowfullscreen', 'frameborder', 'scrolling',
    'colspan', 'rowspan', 'align', 'valign',
    'color', 'face', 'size', 'bgcolor'
  ],
  ALLOW_DATA_ATTR: false
}

Vue.directive('safe-html', {
  bind (el, binding) {
    el.innerHTML = DOMPurify.sanitize(binding.value || '', purifyConfig)
  },
  update (el, binding) {
    if (binding.oldValue !== binding.value) {
      el.innerHTML = DOMPurify.sanitize(binding.value || '', purifyConfig)
    }
  }
})
