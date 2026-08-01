import { getAction, postAction } from './client'
import { useConfig } from '@/stores/config.store'

// 通用文件上传 POST /sys/common/upload
export function uploadFile(file: Blob, fileName: string, bizPath = 'study') {
  const form = new FormData()
  form.append('file', file, fileName)
  form.append('bizPath', bizPath)
  return postAction<{ url: string; key?: string }>('/sys/common/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// 七牛上传凭证 GET /common/qiniu/getToken
export function getQiniuToken() {
  return getAction<{ uptoken: string; domain?: string }>('/common/qiniu/getToken')
}

// 富文本图片/视频上传(对齐旧 JEditor.vue):
// local 模式 POST /sys/common/upload,FormData 带 biz=jeditor + jeditor=1
// 后端返回 { success, message: <path> }(数据在 message 字段,故用 __raw 拿完整响应)
// 返回可直接访问的完整 URL
export async function uploadJeditor(file: File): Promise<string> {
  const form = new FormData()
  form.append('file', file)
  form.append('biz', 'jeditor')
  form.append('jeditor', '1')
  const data = await postAction<{ success: boolean; message: string }>('/sys/common/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    __raw: true,
  } as any)
  // message === 'local' 表示后端配置为数据库存储但不支持视频(旧逻辑),此处仍按路径处理
  const path = data?.message
  return path ? fileUrl(path) : ''
}

// 七牛直传:先取 token,再上传到 //upload-{area}.qiniup.com,返回完整 URL
export async function uploadQiniu(file: File, uuidName: string): Promise<string> {
  const cfg = useConfig.getState().sysConfig
  const area = cfg?.qiniuArea || 'z0'
  const domain = cfg?.qiniuDomain || ''
  const { uptoken } = await getQiniuToken()
  const form = new FormData()
  form.append('file', file, uuidName)
  form.append('token', uptoken)
  form.append('key', uuidName)
  const resp = await fetch(`https://upload-${area}.qiniup.com`, { method: 'POST', body: form })
  const res = await resp.json()
  return domain.replace(/\/$/, '') + '/' + res.key
}

// 字段唯一性校验 GET /sys/duplicateCheck
export function duplicateCheck(tableName: string, fieldName: string, fieldVal: string, dataId?: string) {
  return getAction<{ status?: string }>('/sys/duplicateCheck', { tableName, fieldName, fieldVal, dataId })
}

// Office 文件在线预览(对齐旧 manage.js getFilePrevew):
// 按 sysConfig.filePreview 分发 ow365 / officeapps / kkfileview,默认返回原 URL
// path 支持 aes:/aess: 加密前缀(aess 走 https ssl=1),非 http 先转完整 URL
export function getFilePreview(path?: string): string {
  if (!path) return ''
  const cfg = useConfig.getState().sysConfig
  let p = path
  let ssl = ''
  if (p.startsWith('aes:')) {
    p = p.slice(4)
  } else if (p.startsWith('aess:')) {
    p = p.slice(5)
    ssl = '&ssl=1'
  } else if (!p.startsWith('http:') && !p.startsWith('https:')) {
    p = fileUrl(p)
  }
  switch (cfg?.filePreview) {
    case 'ow365':
      return `http://ow365.cn/?i=${cfg.owId || ''}${ssl}&n=5&furl=` + p
    case 'officeapps':
      return 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(p)
    case 'kkfileview':
      return location.protocol + '//' + location.host + ':8012/preview/onlinePreview?url=' + encodeURIComponent(btoa(p))
    default:
      return p
  }
}

// 文件访问 URL 拼接(对齐旧前端 getFileAccessHttpUrl)
export function fileUrl(relativePath?: string): string {
  if (!relativePath) return ''
  if (/^https?:|^data:|^blob:/.test(relativePath)) return relativePath
  const cfg = useConfig.getState().sysConfig
  const uploadType = cfg?.uploadType || 'local'
  if (uploadType === 'qiniu' && cfg?.qiniuDomain) {
    // qiniuDomain 形如 //storage.lanqu.vip(协议相对),补 https: 避免在 http 页面下退化成 http
    return ensureProto(cfg.qiniuDomain + '/' + relativePath)
  }
  // local/static
  const base = cfg?.staticDomain || '/api/sys/common/static/'
  return base.replace(/\/$/, '') + '/' + relativePath.replace(/^\//, '')
}

// 封面/文件 URL:优先用后端返回的 *_url 完整字段,fallback 到 fileUrl(path)
// 后端 list/detail 接口会返回 coverFileKey_url / workFileKey_url / avatar_url 等完整 URL
export function coverUrl(record: { coverFileKey_url?: string; workCover?: string; courseCover?: string; avatar_url?: string; avatar?: string } | null | undefined): string {
  if (!record) return ''
  if (record.coverFileKey_url) return ensureProto(record.coverFileKey_url)
  if (record.avatar_url) return ensureProto(record.avatar_url)
  if (record.workCover) return fileUrl(record.workCover)
  if (record.courseCover) return fileUrl(record.courseCover)
  if (record.avatar) return fileUrl(record.avatar)
  return ''
}
export function workFileUrl(record: { workFileKey_url?: string; workFile?: string } | null | undefined): string {
  if (!record) return ''
  if (record.workFileKey_url) return ensureProto(record.workFileKey_url)
  if (record.workFile) return fileUrl(record.workFile)
  return ''
}
// 七牛返回 //storage.lanqu.vip/... 缺协议,补 https:
function ensureProto(url: string): string {
  if (url.startsWith('//')) return 'https:' + url
  return url
}
