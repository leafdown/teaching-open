import { getAction, postAction } from './client'
import { useConfig } from '@/stores/config.store'

// 通用文件上传:按 sysConfig.uploadType 分发。
// - qiniu:浏览器直传七牛 + 注册 sysFile(与旧前端 upload2Qiniu→sysFile 链路一致),存 key;
//   后端 /sys/common/upload 所指向的存储在本部署不可用(OSS AccessKey 已停用),必须绕行
// - 其他:POST /sys/common/upload 后端本地存储,返回 { url: 路径 }
export async function uploadFile(file: Blob, fileName: string, bizPath = 'study'): Promise<{ url: string; key?: string }> {
  const cfg = useConfig.getState().sysConfig
  if (cfg?.uploadType === 'qiniu' && cfg?.qiniuDomain) {
    const ext = (fileName.includes('.') ? fileName.split('.').pop() : 'bin') || 'bin'
    const uuid = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Date.now() + '-' + Math.random().toString(36).slice(2)
    const key = `${bizPath}/${uuid}.${ext}`
    await uploadQiniuKey(file, key)
    await registerSysFile(key, bizPath)
    return { url: key, key }
  }
  const form = new FormData()
  form.append('file', file, fileName)
  form.append('bizPath', bizPath)
  return postAction<{ url: string; key?: string }>('/sys/common/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// 七牛上传凭证 GET /common/qiniu/getToken
// 兼容两种返回形态:后端实际返回纯字符串 token,旧代码按 {uptoken} 解析会拿到 undefined → 上传 401
export function getQiniuToken() {
  return getAction<{ uptoken: string } | string>('/common/qiniu/getToken')
    .then(r => (typeof r === 'string' ? { uptoken: r } : r))
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

// 七牛直传,返回原始 key(配合 registerSysFile 换短 id 用)
export async function uploadQiniuKey(file: Blob, key: string): Promise<string> {
  const cfg = useConfig.getState().sysConfig
  const area = cfg?.qiniuArea || 'z0'
  const { uptoken } = await getQiniuToken()
  const form = new FormData()
  form.append('file', file, key)
  form.append('token', uptoken)
  form.append('key', key)
  const resp = await fetch(`https://upload-${area}.qiniup.com`, { method: 'POST', body: form })
  if (!resp.ok) throw new Error('七牛上传失败: HTTP ' + resp.status)
  const res = await resp.json()
  if (!res.key) throw new Error('七牛上传失败: ' + (res.error || '未知错误'))
  return res.key
}

// 注册 sysFile,返回短 id:teaching_work.work_file 列 varchar(32) 只存得下 id,
// 存路径/URL 会 SQL 超长异常。后端据 work_file 关联 sysFile 解析出 workFileKey_url。
export async function registerSysFile(key: string, fileTag: string, fileLocation = 2): Promise<string> {
  return postAction<{ id: string }>('/system/sysFile/add', {
    fileType: 2, fileName: key, filePath: key, fileLocation, fileTag,
  }).then(r => r.id)
}

// 作品文件上传:按 sysConfig.uploadType 分发 —— qiniu 直传后注册 sysFile(存 id);
// 其他走后端 /sys/common/upload 本地存储(存路径)。与旧前端 upload2Qiniu 链路对齐。
export async function uploadWorkFile(file: Blob, ext: string, dir = 'python-work'): Promise<string> {
  const cfg = useConfig.getState().sysConfig
  if (cfg?.uploadType === 'qiniu' && cfg?.qiniuDomain) {
    const uuid = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Date.now() + '-' + Math.random().toString(36).slice(2)
    const key = `${dir}/${uuid}.${ext}`
    const qiniuKey = await uploadQiniuKey(file, key)
    return registerSysFile(key, dir)
  }
  const name = `${dir}_${Date.now()}.${ext}`
  const res = await uploadFile(file, name, dir)
  return res.key || res.url || name
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
  // 已经是 URL 的直接透传:https://、data:、blob:,以及 //domain 形式
  // (后端 coursePpt/coursePlan 等经 QiniuUtil 拼接后返回协议相对地址,再拼一次会变成坏链)
  if (/^(https?:|data:|blob:|\/\/)/.test(relativePath)) return relativePath
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
