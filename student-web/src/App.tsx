import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './router'
import { readToken } from './api/client'
import { getCurrentConfig } from './api/system.api'
import { useConfig } from './stores/config.store'
import { useAuth } from './stores/auth.store'

export default function App() {
  const setSysConfig = useConfig((s) => s.setSysConfig)
  const brandName = useConfig((s) => s.sysConfig?.brandName)
  const userInfo = useAuth((s) => s.userInfo)
  const role = useAuth((s) => s.role)
  useEffect(() => {
    getCurrentConfig().then(setSysConfig).catch(() => {})
    if (readToken()) {
      const token = readToken()
      if (token) {
        localStorage.setItem('pro__Access-Token', JSON.stringify({ value: token }))
        if (userInfo) localStorage.setItem('pro__Login_Userinfo', JSON.stringify({ value: userInfo }))
        if (role?.length) localStorage.setItem('pro__Login_UserRole', JSON.stringify({ value: role }))
      }
    }
  }, [setSysConfig, userInfo, role])
  useEffect(() => {
    document.title = brandName || '教学平台'
  }, [brandName])
  return useRoutes(routes)
}
