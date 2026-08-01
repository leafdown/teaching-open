import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './router'
import { readToken } from './api/client'
import { getCurrentConfig } from './api/system.api'
import { useConfig } from './stores/config.store'
import { useAuth } from './stores/auth.store'

export default function App() {
  const setSysConfig = useConfig((s) => s.setSysConfig)
  const userInfo = useAuth((s) => s.userInfo)
  const role = useAuth((s) => s.role)
  useEffect(() => {
    if (readToken()) {
      getCurrentConfig().then(setSysConfig).catch(() => {})
      // 补写 vue-ls 兼容 key(pro__Xxx),让 Scratch3 编辑器读到登录态
      const token = readToken()
      if (token) {
        localStorage.setItem('pro__Access-Token', JSON.stringify({ value: token }))
        if (userInfo) localStorage.setItem('pro__Login_Userinfo', JSON.stringify({ value: userInfo }))
        if (role?.length) localStorage.setItem('pro__Login_UserRole', JSON.stringify({ value: role }))
      }
    }
  }, [setSysConfig, userInfo, role])
  return useRoutes(routes)
}
