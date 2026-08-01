// 管理端动态路由:后端菜单 component 字符串 → 懒加载组件 映射
// 对齐旧 Vue utils/util.js:108-145 的 component 决策(require → import.meta.glob)
// 后端菜单 component 指向 features/admin/** 下已存在的 .tsx 即可路由,无需前端发版
import { lazy } from 'react'
import type { ComponentType } from 'react'

// 扫描所有 admin 页面(默认懒加载,等价旧 webpack 动态 require 的 chunk 拆分)
const modules = import.meta.glob('../features/admin/**/*.tsx') as Record<
  string,
  () => Promise<{ default: ComponentType<any> }>
>

// /src/features/admin/system/UserList.tsx → system/UserList
// /src/features/admin/dashboard/index.tsx → dashboard
function normalize(absPath: string): string {
  return absPath
    .replace(/^.*\/features\/admin\//, '')
    .replace(/\.tsx$/, '')
    .replace(/\/index$/, '')
}

// teaching 前缀错位:后端 component 带 Teaching 前缀,React 文件名简化了
// 后端 component 值 → 实际文件归一化 key
const ALIAS: Record<string, string> = {
  'teaching/TeachingCourseList': 'teaching/CourseList',
  'teaching/TeachingCourseUnitList': 'teaching/CourseUnitList',
  'teaching/TeachingCourseDeptList': 'teaching/CourseDeptList',
  'teaching/TeachingNewsList': 'teaching/NewsList',
  'teaching/TeachingOrderList': 'teaching/OrderList',
  'teaching/TeachingScratchAssetsList': 'teaching/ScratchAssetsList',
  'teaching/TeachingAdditionalWorkList': 'teaching/AdditionalWorkList',
  'teaching/TeachingWorkList': 'teaching/WorkList',
}

const componentMap = new Map<string, React.LazyExoticComponent<ComponentType<any>>>()
for (const [absPath, loader] of Object.entries(modules)) {
  const key = normalize(absPath)
  // 跳过纯兜底组件 SimpleCrud(不作为路由直接目标,由 AdminLayout 兜底逻辑单独引用)
  if (key === 'system/SimpleCrud') continue
  componentMap.set(key, lazy(loader))
}

// 列出所有已注册的 component key(调试/兜底提示用)
export function listAdminComponents(): string[] {
  return Array.from(componentMap.keys()).sort()
}

// 后端菜单 component → 懒加载组件;未命中返回 null(由 AdminLayout 走兜底)
export function resolveAdminComponent(component?: string): React.LazyExoticComponent<ComponentType<any>> | null {
  if (!component) return null
  // layouts/RouteView 等是目录占位,React 用 Outlet 透传,这里不返回组件
  if (component.startsWith('layouts/')) return null
  const key = ALIAS[component] ?? component
  return componentMap.get(key) ?? null
}
