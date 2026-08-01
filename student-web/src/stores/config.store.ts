import { create } from 'zustand'
import { SysConfig } from '@/api/types'

interface ConfigState {
  sysConfig: SysConfig | null
  setSysConfig: (c: SysConfig) => void
  get: <K extends keyof SysConfig>(k: K) => SysConfig[K] | undefined
}

// 兼容旧前端/Scratch 编辑器(scratch3/scratchjr 的 common.js):
// - pro__SYS_CONFIG: { value, expire },getSysConfig 读 .value[key]
// - CONFIG: { domianURL, ... },update2Local 拼 /sys/common/upload 地址
// 新前端 baseURL=/api,domianURL 取配置值或回退 '/api'
function writeCompatLocalStorage(c: SysConfig) {
  try {
    const expire = Date.now() + 3600000
    localStorage.setItem('pro__SYS_CONFIG', JSON.stringify({ value: c, expire }))
    const domianURL = (c.domianURL || '/api').replace(/\/$/, '')
    localStorage.setItem('CONFIG', JSON.stringify({ ...c, domianURL }))
  } catch {
    // localStorage 不可用时静默降级,Scratch 编辑器会走 ajax 兜底
  }
}

export const useConfig = create<ConfigState>((set, get) => ({
  sysConfig: null,
  setSysConfig: (c) => {
    writeCompatLocalStorage(c)
    set({ sysConfig: c })
  },
  get: (k) => get().sysConfig?.[k]
}))
