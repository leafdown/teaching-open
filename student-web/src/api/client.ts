import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { message } from 'antd'
import { ApiResult } from './types'

// baseURL /api 与后端 context-path 一致(旧前端 domianURL = teacher.lanqu.vip/api)
const service = axios.create({
  baseURL: '/api',
  timeout: 60000
})

// 请求拦截:注入 X-Access-Token(Jeecg 约定,非标准 Authorization)
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = readToken()
  if (token && config.headers) {
    config.headers['X-Access-Token'] = token
  }
  return config
})

// 响应拦截:解包 {success,result,message,code};code=510/500 token 失效
service.interceptors.response.use(
  (resp) => {
    const data = resp.data as ApiResult
    // 文件下载(blob)直接返回
    if (resp.config.responseType === 'blob') return resp
    // __raw:调用方需要完整响应体(如 /sys/common/upload 数据在 message 字段,无法走 result 解包)
    if ((resp.config as any).__raw) return data as never
    if (data && typeof data === 'object' && 'success' in data) {
      if (data.code === 510 || !data.success && /Token|登录|过期|未登录/i.test(data.message || '')) {
        handleTokenExpired()
        return Promise.reject(new Error(data.message || '登录已过期'))
      }
      if (!data.success) {
        message.error(data.message || '请求失败')
        return Promise.reject(new Error(data.message || '请求失败'))
      }
      return data.result as never
    }
    return data as never
  },
  (error: AxiosError) => {
    const status = error.response?.status
    if (status === 401 || status === 403 || status === 500) {
      handleTokenExpired()
    } else {
      message.error(error.message || '网络异常')
    }
    return Promise.reject(error)
  }
)

function handleTokenExpired() {
  // 清 token 跳登录(避免循环依赖,直接操作 localStorage + location)
  localStorage.removeItem('Access-Token')
  localStorage.removeItem('pro__Access-Token')
  localStorage.removeItem('pro__Login_Userinfo')
  localStorage.removeItem('pro__Login_UserRole')
  localStorage.removeItem('student-web-auth')
  if (location.pathname !== '/login') {
    location.href = '/login'
  }
}

// vue-ls 兼容:旧前端存 localStorage["Access-Token"] = JSON.stringify(token)
export function readToken(): string | null {
  const raw = localStorage.getItem('Access-Token')
  if (!raw) return null
  try { return JSON.parse(raw) as string } catch { return raw }
}
export function writeToken(token: string) {
  localStorage.setItem('Access-Token', JSON.stringify(token))
}
export function clearToken() {
  localStorage.removeItem('Access-Token')
}

// 通用请求方法(对齐旧前端 manage.js 的 getAction/postAction/httpAction)
export function getAction<T = unknown>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
  return service.get(url, { params, ...config }) as Promise<T>
}
export function postAction<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return service.post(url, data, config) as Promise<T>
}
export function putAction<T = unknown>(url: string, data?: unknown): Promise<T> {
  return service.put(url, data) as Promise<T>
}
export function deleteAction<T = unknown>(url: string, params?: Record<string, unknown>): Promise<T> {
  return service.delete(url, { params }) as Promise<T>
}
export function httpAction<T = unknown>(url: string, method: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return service.request({ url, method, data, ...config }) as Promise<T>
}

// blob 下载(导出 Excel)
export async function downFile(url: string, params?: Record<string, unknown>, fileName?: string) {
  const resp = await service.get(url, { params, responseType: 'blob' })
  const blob = resp.data as Blob
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName || 'export.xls'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

// 上传(importExcel)
export function uploadAction(url: string, file: File) {
  const form = new FormData()
  form.append('file', file)
  return service.post(url, form, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export default service
