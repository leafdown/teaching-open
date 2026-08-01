import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { readToken, writeToken, clearToken } from '@/api/client'
import { UserInfo, RoleInfo } from '@/api/types'

interface AuthState {
  token: string | null
  userInfo: UserInfo | null
  role: RoleInfo[]
  setLogin: (token: string, userInfo: UserInfo, role: RoleInfo[]) => void
  setToken: (token: string) => void
  setUserInfo: (userInfo: UserInfo, role: RoleInfo[]) => void
  logout: () => void
  isStudent: () => boolean
}

// vue-ls 兼容:旧前端/scratch3 IDE 读 pro__Xxx 格式 = JSON.stringify({value: data})
// 新前端登录时同步写这些 key,让 Scratch 编辑器右上角显示登录态
function writeVueLs(key: string, value: unknown) {
  localStorage.setItem(`pro__${key}`, JSON.stringify({ value }))
}
function clearVueLs(key: string) {
  localStorage.removeItem(`pro__${key}`)
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      // 初始 token 从 vue-ls 兼容格式读取(与旧前端互通)
      token: readToken(),
      userInfo: null,
      role: [],
      setLogin: (token, userInfo, role) => {
        writeToken(token)
        writeVueLs('Access-Token', token)
        writeVueLs('Login_Userinfo', userInfo)
        writeVueLs('Login_UserRole', role)
        set({ token, userInfo, role })
      },
      setToken: (token) => {
        writeToken(token)
        writeVueLs('Access-Token', token)
        set({ token })
      },
      setUserInfo: (userInfo, role) => {
        writeVueLs('Login_Userinfo', userInfo)
        writeVueLs('Login_UserRole', role)
        set({ userInfo, role })
      },
      logout: () => {
        clearToken()
        clearVueLs('Access-Token')
        clearVueLs('Login_Userinfo')
        clearVueLs('Login_UserRole')
        set({ token: null, userInfo: null, role: [] })
      },
      isStudent: () => {
        const r = get().role
        return r.some((x) => x.roleCode === 'student' || x.roleCode === 'euser' || x.roleCode === 'teacher')
      }
    }),
    {
      name: 'student-web-auth',
      // 只 persist userInfo/role,token 用独立的 vue-ls 兼容 key 保证与旧前端互通
      partialize: (s) => ({ userInfo: s.userInfo, role: s.role }),
      storage: createJSONStorage(() => localStorage)
    }
  )
)
