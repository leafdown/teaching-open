import { Navigate, RouteObject } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Spin } from 'antd'
import StudentLayout from '@/layouts/StudentLayout'
import { useAuth } from '@/stores/auth.store'
import { readToken } from '@/api/client'

// AdminLayout 懒加载: 其静态依赖(SimpleCrud→CrudModal→RichEditor/wangeditor 等
// 仅管理端使用的重组件)不应打进学生端首屏主 chunk
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'))

// 学生端 / 公共页:静态懒加载
const Login = lazy(() => import('@/features/login'))
const Register = lazy(() => import('@/features/login/Register'))
const Alteration = lazy(() => import('@/features/login/Alteration'))
const Landing = lazy(() => import('@/features/home/Landing'))
const Home = lazy(() => import('@/features/home'))
const WorkList = lazy(() => import('@/features/work'))
const WorkDetail = lazy(() => import('@/features/work/WorkDetail'))
const FriendDetail = lazy(() => import('@/features/work/FriendDetail'))
const CourseView = lazy(() => import('@/features/course'))
const PublicCourse = lazy(() => import('@/features/course/PublicCourse'))
const NewsList = lazy(() => import('@/features/home/NewsList'))
const NewsDetail = lazy(() => import('@/features/home/NewsDetail'))
const IDE = lazy(() => import('@/features/ide'))
const Assets = lazy(() => import('@/features/assets'))
const Center = lazy(() => import('@/features/center'))
const Contest = lazy(() => import('@/features/contest'))
const Settings = lazy(() => import('@/features/settings'))
const PptGenerator = lazy(() => import('@/features/ppt'))
// 管理端页面不再在此静态注册:由 admin-modules.ts 的 import.meta.glob
// 按「后端菜单 component → features/admin/**」动态解析,AdminLayout 内部渲染

const Lazy = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div style={{ padding: 24, textAlign: 'center' }}><Spin /></div>}>{children}</Suspense>
)

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = useAuth((s) => s.token)
  const lsToken = readToken()
  if (!token && !lsToken) return <Navigate to="/login" replace />
  return <>{children}</>
}

// 管理员守卫:非管理员跳学生首页
function RequireAdmin({ children }: { children: React.ReactNode }) {
  const role = useAuth((s) => s.role)
  const userInfo = useAuth((s) => s.userInfo)
  const isAdmin = role.some(r => r.roleCode === 'admin' || r.roleCode === 'teacher' || r.roleCode === 'dev')
    || userInfo?.userIdentity === 2
  if (!isAdmin) return <Navigate to="/" replace />
  return <>{children}</>
}

export const routes: RouteObject[] = [
  { path: '/login', element: <Lazy><Login /></Lazy> },
  { path: '/register', element: <Lazy><Register /></Lazy> },
  { path: '/alteration', element: <Lazy><Alteration /></Lazy> },
  // 公共页(免登录可见,对齐旧 Vue whiteList:/home //workList /courseList /work-detail /friend-detail /newsList /news-detail)
  {
    path: '/',
    element: <StudentLayout />,
    children: [
      { index: true, element: <Lazy><Landing /></Lazy> },
      { path: 'home', element: <Lazy><Home /></Lazy> },
      { path: 'works', element: <Lazy><WorkList /></Lazy> },
      { path: 'work-detail', element: <Lazy><WorkDetail /></Lazy> },
      { path: 'friend-detail', element: <Lazy><FriendDetail /></Lazy> },
      { path: 'courses', element: <Lazy><PublicCourse /></Lazy> },
      { path: 'course/:courseId', element: <Lazy><CourseView /></Lazy> },
      { path: 'news', element: <Lazy><NewsList /></Lazy> },
      { path: 'news/:id', element: <Lazy><NewsDetail /></Lazy> },
      { path: 'contest', element: <Lazy><Contest /></Lazy> },
    ]
  },
  // 全屏 IDE(无 Layout 包裹,创作窗口独立路由)
  {
    path: '/ide',
    element: <RequireAuth><Lazy><IDE /></Lazy></RequireAuth>,
  },
  // 需登录页(个人中心等)
  {
    path: '/',
    element: <RequireAuth><StudentLayout /></RequireAuth>,
    children: [
      { path: 'assets', element: <Lazy><Assets /></Lazy> },
      { path: 'center', element: <Lazy><Center /></Lazy> },
      { path: 'settings', element: <Lazy><Settings /></Lazy> },
      { path: 'ppt', element: <Lazy><PptGenerator /></Lazy> },
    ]
  },
  // 管理端:所有 /admin/* 路径进 AdminLayout,由其按当前路径 + 后端菜单 component 动态解析渲染
  // (对齐旧 Vue 菜单驱动路由:component 字符串 → import.meta.glob 懒加载组件)
  {
    path: '/admin/*',
    element: <RequireAuth><RequireAdmin><Lazy><AdminLayout /></Lazy></RequireAdmin></RequireAuth>,
  },
  { path: '*', element: <Navigate to="/" replace /> },
]
