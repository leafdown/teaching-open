import { useEffect, useState, useMemo, Suspense } from 'react'
import { Layout, Menu, Dropdown, Avatar, Space, Spin, message, Empty } from 'antd'
import { UserOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { useAuth } from '@/stores/auth.store'
import { logout as apiLogout } from '@/api/auth.api'
import { readToken } from '@/api/client'
import { MenuItem } from '@/api/types'
import { resolveAdminComponent } from '@/router/admin-modules'
import SimpleCrud from '@/features/admin/system/SimpleCrud'

const { Header, Sider, Content } = Layout

// fallback 菜单:菜单接口加载失败时用,保证后台仍可用
const FALLBACK_MENUS: MenuItem[] = [
  { component: 'dashboard', meta: { title: '数据看板' }, children: [] } as any,
  {
    component: 'teaching', meta: { title: '教学管理' }, children: [
      { component: 'teaching/TeachingCourseList', meta: { title: '课程管理' }, children: [] } as any,
      { component: 'teaching/TeachingCourseUnitList', meta: { title: '课程单元' }, children: [] } as any,
      { component: 'teaching/TeachingCourseDeptList', meta: { title: '课程班级' }, children: [] } as any,
      { component: 'teaching/TeachingWorkList', meta: { title: '作品管理' }, children: [] } as any,
      { component: 'teaching/TeachingAdditionalWorkList', meta: { title: '附加作业' }, children: [] } as any,
      { component: 'teaching/TeachingScratchAssetsList', meta: { title: '素材管理' }, children: [] } as any,
      { component: 'teaching/TeachingNewsList', meta: { title: '资讯管理' }, children: [] } as any,
      { component: 'teaching/TeachingOrderList', meta: { title: '订单管理' }, children: [] } as any,
      { component: 'teaching/TeachingMenuList', meta: { title: '教学菜单' }, children: [] } as any,
    ]
  } as any,
  {
    component: 'system', meta: { title: '系统管理' }, children: [
      { component: 'system/UserList', meta: { title: '用户管理' }, children: [] } as any,
      { component: 'system/RoleList', meta: { title: '角色管理' }, children: [] } as any,
      { component: 'system/PermissionList', meta: { title: '菜单管理' }, children: [] } as any,
      { component: 'system/DepartList', meta: { title: '部门管理' }, children: [] } as any,
      { component: 'system/DictList', meta: { title: '数据字典' }, children: [] } as any,
      { component: 'system/SysConfig', meta: { title: '系统配置' }, children: [] } as any,
      { component: 'system/AnnouncementList', meta: { title: '系统通告' }, children: [] } as any,
      { component: 'system/LogList', meta: { title: '系统日志' }, children: [] } as any,
      { component: 'system/FileList', meta: { title: '文件管理' }, children: [] } as any,
      { component: 'system/QuartzJobList', meta: { title: '定时任务' }, children: [] } as any,
      { component: 'system/SysCategoryList', meta: { title: '分类管理' }, children: [] } as any,
      { component: 'system/DataLogList', meta: { title: '数据日志' }, children: [] } as any,
    ]
  } as any,
  { component: 'report/TeacherReport', meta: { title: '教师报表' }, children: [] } as any,
]

function isUrl(s?: string): boolean {
  return !!s && /^https?:\/\//.test(s)
}

// 外链 url 里的 ${token} 占位符替换为真实 token
function fillToken(url: string): string {
  const token = readToken() || ''
  return url.replace(/\$\{token\}/g, token)
}

// 后端菜单 -> antd Menu items,key 用 component(对应路由 path)
function toMenuItems(menus: MenuItem[]): MenuProps['items'] {
  return menus.filter(m => !m.hidden).map(m => {
    const key = m.component || m.path || m.name || ''
    const children = m.children?.length ? toMenuItems(m.children) : undefined
    return { key, icon: m.meta?.icon ? <span>{m.meta.icon}</span> : undefined, label: m.meta?.title || m.name, children }
  })
}

// 扁平化菜单为 component -> MenuItem 索引(用于按当前路径取 meta.url 做 iframe)
function flattenMenus(menus: MenuItem[]): Map<string, MenuItem> {
  const map = new Map<string, MenuItem>()
  const walk = (list: MenuItem[]) => {
    list.forEach(m => {
      const key = m.component || m.path || m.name || ''
      if (key && !map.has(key)) map.set(key, m)
      if (m.children?.length) walk(m.children)
    })
  }
  walk(menus)
  return map
}

export default function AdminLayout() {
  const nav = useNavigate()
  const loc = useLocation()
  const userInfo = useAuth(s => s.userInfo)
  const logoutStore = useAuth(s => s.logout)
  const [collapsed, setCollapsed] = useState(false)
  const [menus, setMenus] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [openKeys, setOpenKeys] = useState<string[]>([])

  useEffect(() => {
    const token = readToken()
    if (!token) { nav('/login'); return }
    // 直接使用 FALLBACK_MENUS,避免后端菜单数据混乱
    // 后续可改为从后端获取
    setMenus(FALLBACK_MENUS)
    setLoading(false)
  }, [])

  const menuIndex = useMemo(() => flattenMenus(menus), [menus])

  // 当前路径 -> component key(/admin/system/UserList -> system/UserList; /admin -> dashboard)
  const currentKey = useMemo(() => {
    const k = loc.pathname.replace(/^\/admin\/?/, '')
    return k || 'dashboard'
  }, [loc.pathname])

  // 菜单点击:外链新窗口打开,否则进路由(目录节点只展开/折叠,不跳转)
  const onMenuClick: MenuProps['onClick'] = (e) => {
    const item = menuIndex.get(e.key)
    // 目录节点(有子菜单但自己无实际页面)不跳转
    if (item?.children?.length && !item?.component) {
      return
    }
    const url = item?.meta?.url
    if (item?.meta?.internalOrExternal || isUrl(url)) {
      if (url) window.open(fillToken(url), '_blank')
      return
    }
    nav('/admin/' + e.key)
  }

  const onLogout = async () => { try { await apiLogout() } catch {}; logoutStore(); message.success('已退出'); nav('/login', { replace: true }) }

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spin size="large" /></div>

  // 根据当前路径自动展开父菜单
  const autoOpenKeys = menus.filter(m => m.children?.some(c => (c.component || c.path) === currentKey)).map(m => m.component || m.path || '')
  if (autoOpenKeys.length > 0 && !autoOpenKeys.some(k => openKeys.includes(k))) {
    setOpenKeys(prev => [...new Set([...prev, ...autoOpenKeys])])
  }

  // 解析当前要渲染的内容
  const menuItem = menuIndex.get(currentKey)
  const Comp = resolveAdminComponent(currentKey)
  const isIframe = !!menuItem?.component?.includes('Iframe')

  let content: React.ReactNode
  if (isIframe && menuItem?.meta?.url) {
    content = <iframe src={fillToken(menuItem.meta.url)} style={{ width: '100%', height: '70vh', border: 'none' }} title={menuItem.meta?.title || 'iframe'} />
  } else if (Comp) {
    content = <Suspense fallback={<div style={{ padding: 48, textAlign: 'center' }}><Spin /></div>}><Comp /></Suspense>
  } else if (menuItem?.component) {
    // 已知菜单但无对应组件:走 SimpleCrud 兜底
    content = <SimpleCrud componentPath={menuItem.component} />
  } else {
    content = <Empty description={`页面 ${currentKey} 暂未实现`} style={{ padding: 48 }} />
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={220} theme="dark">
        <div style={{ height: 56, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 16 }}>{collapsed ? '管' : '教学管理后台'}</div>
        <Menu theme="dark" mode="inline" selectedKeys={[currentKey]} openKeys={openKeys} onOpenChange={setOpenKeys} items={toMenuItems(menus)} onClick={onMenuClick} />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ cursor: 'pointer', fontSize: 18 }} onClick={() => setCollapsed(!collapsed)}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
          <Dropdown menu={{ items: [{ key: 'logout', icon: <LogoutOutlined />, label: '退出登录', onClick: onLogout }] }}>
            <Space style={{ cursor: 'pointer' }}><Avatar icon={<UserOutlined />} src={userInfo?.avatar as string} /><span>{userInfo?.realname || userInfo?.username || '管理员'}</span></Space>
          </Dropdown>
        </Header>
        <Content style={{ margin: 16, padding: 24, background: '#fff', borderRadius: 8, overflow: 'auto' }}>{content}</Content>
      </Layout>
    </Layout>
  )
}
