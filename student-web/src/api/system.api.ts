import { getAction, postAction, putAction, deleteAction } from './client'
import { PermissionResult, SysConfig, DictItem } from './types'

// 用户权限/菜单 GET /sys/permission/getUserPermissionByToken
export function getUserPermissionByToken(token: string) {
  return getAction<PermissionResult>('/sys/permission/getUserPermissionByToken', { token })
}

// 系统配置 GET /sys/config/getCurrentConfig
export function getCurrentConfig() {
  return getAction<SysConfig>('/sys/config/getCurrentConfig')
}

// 系统配置单项 GET /sys/config/getConfig?key=
export function getConfig(key: string) {
  return getAction<string>('/sys/config/getConfig', { key })
}

// 字典项 GET /sys/dict/getDictItems/{code}
export function getDictItems(code: string) {
  return getAction<DictItem[]>(`/sys/dict/getDictItems/${code}`)
}

// ===== 管理端用 =====
// 全量配置列表 GET /sys/config/getAllConfigList
export function getAllConfigList() {
  return getAction<{ configKey: string; configValue: string }[]>('/sys/config/getAllConfigList')
}
// 保存租户配置 POST /sys/config/saveTenantConfig
export function saveTenantConfig(configs: Record<string, string>) {
  return postAction('/sys/config/saveTenantConfig', configs)
}
// 通用 CRUD API 工厂(供管理端各业务页 onSave 用)
export function crudApi(baseUrl: string) {
  return {
    list: (params?: Record<string, unknown>) => getAction(`${baseUrl}/list`, params),
    add: (data: unknown): Promise<void> => postAction(`${baseUrl}/add`, data),
    edit: (data: unknown): Promise<void> => putAction(`${baseUrl}/edit`, data),
    delete: (id: string) => deleteAction(`${baseUrl}/delete`, { id }),
    deleteBatch: (ids: string) => deleteAction(`${baseUrl}/deleteBatch`, { ids }),
  }
}
