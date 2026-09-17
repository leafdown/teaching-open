// ===== Jeecg 后端契约类型 =====

// 统一响应包络 { success, result, message, code }
export interface ApiResult<T = unknown> {
  success: boolean
  result: T
  message?: string
  code?: number
}

// 分页结果 result.records / result.total
export interface PageResult<T> {
  records: T[]
  total: number
  size?: number
  current?: number
}

// 登录返回 result
export interface LoginResult {
  token: string
  userInfo: UserInfo
  role: RoleInfo[]
  sysAllDictItems?: Record<string, DictItem[]>
  sysConfig?: SysConfig
}

export interface UserInfo {
  id: string
  username: string
  realname?: string
  avatar?: string
  phone?: string
  orgCode?: string
  userIdentity?: number // 1=学生 2=管理员
}

export interface RoleInfo {
  id: string
  roleCode: string
  roleName?: string
}

export interface DictItem {
  value: string
  text: string
  title?: string
  description?: string
}

export interface SysConfig {
  uploadType?: string // local | qiniu | aliyun
  qiniuDomain?: string
  qiniuArea?: string // 七牛上传区域(如 z0),拼接 //upload-{area}.qiniup.com
  staticDomain?: string
  filePreview?: string // ow365 | officeapps | kkfileview
  owId?: string // ow365 账号 id
  webURL?: string
  domianURL?: string
  brandName?: string
  logo?: string
  footer?: string
  customJS?: string
  customCss?: string
  // 前台/后台/分享页富文本(后台 SysConfig 编辑)
  _homeHtml?: string
  _indexHtml?: string
  _workShareHtml?: string
  homeBgColor?: string
  file_homeBg?: string
  homeBgRepeat?: string
}

// 菜单/权限
export interface MenuMeta {
  title?: string
  icon?: string
  url?: string
  permissionList?: string[]
  keepAlive?: boolean
  internalOrExternal?: boolean
}
export interface MenuItem {
  path?: string
  name?: string
  component?: string
  redirect?: string
  hidden?: boolean
  alwaysShow?: boolean
  route?: string
  meta?: MenuMeta
  children?: MenuItem[]
}

export interface PermissionResult {
  menu: MenuItem[]
  auth: { action?: string; type?: string; status?: string }[]
  allAuth: { action?: string }[]
}
