import { Layout, Menu, Dropdown, Avatar, Space, message, Button } from 'antd'
import { UserOutlined, LogoutOutlined, HomeOutlined, FolderOpenOutlined, ReadOutlined, SettingOutlined, FileTextOutlined, RocketOutlined, DownOutlined, TrophyOutlined } from '@ant-design/icons'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/stores/auth.store'
import { logout as apiLogout } from '@/api/auth.api'
import { useConfig } from '@/stores/config.store'
import { coverUrl, fileUrl } from '@/api/common.api'
import { SafeHtml } from '@/utils/safe-html'
import MobileMenu from '@/components/MobileMenu'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

const { Header, Content } = Layout

export default function StudentLayout() {
  const nav = useNavigate()
  const loc = useLocation()
  const userInfo = useAuth((s) => s.userInfo)
  const role = useAuth((s) => s.role)
  const isAdmin = role.some(r => r.roleCode === 'admin' || r.roleCode === 'teacher' || r.roleCode === 'dev')
    || userInfo?.userIdentity === 2
  const avatarUrl = userInfo ? coverUrl(userInfo) : ''
  const logoutStore = useAuth((s) => s.logout)
  const brandName = useConfig((s) => s.sysConfig?.brandName) || '教学平台'
  const logo = useConfig((s) => s.sysConfig?.logo)
  const footer = useConfig((s) => s.sysConfig?.footer)

  const onLogout = async () => {
    try { await apiLogout() } catch { /* ignore */ }
    logoutStore()
    message.success('已退出登录')
    nav('/login', { replace: true })
  }

  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)

  const userMenu = {
    items: [
      { key: 'settings', icon: <SettingOutlined />, label: '个人设置', onClick: () => nav('/settings') },
      { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', onClick: onLogout }
    ]
  }

  // 高亮映射:长路径前缀(/courses)必须先于短前缀(/course)判断,否则公开课程会错误高亮
  const current = loc.pathname.startsWith('/courses') || loc.pathname.startsWith('/course/') ? 'courses' :
    loc.pathname.startsWith('/center') ? 'center' :
    loc.pathname.startsWith('/news') ? 'news' : loc.pathname.startsWith('/assets') ? 'assets' : loc.pathname.startsWith('/contest') ? 'contest' :
    'home'

  // 「我的课程」菜单移除:该功能尚未上线(个人中心内为占位),两个菜单项都指向 /home 只会误导
  const openCreate = (key: string) => {
    const map: Record<string, string> = {
      scratch3: '/scratch3/index.html?scene=create',
      scratchjr: '/scratchjr/home.html',
      python: '/ide?workType=4',
      blockly: '/blockly/index.html?lang=zh-hans&scene=create',
    }
    if (map[key]) window.open(map[key], '_blank')
  }

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', background: '#fff', borderBottom: '1px solid #f0f0f0', padding: isMobile ? '0 12px' : '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 18, marginRight: isMobile ? 12 : 32, color: '#1890ff', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => nav('/')}>
          {logo ? <img src={fileUrl(logo)} alt={brandName} style={{ height: 28, marginRight: 8, objectFit: 'contain' }} /> : null}
          {brandName}
        </div>
        {isMobile ? (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <MobileMenu isAdmin={isAdmin} />
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', minWidth: 0 }}>
            <Menu mode="horizontal" selectedKeys={[current]} style={{ borderBottom: 'none' }} items={[
              { key: 'home', icon: <HomeOutlined />, label: '社区', onClick: () => nav('/home') },
            ]} />
            {/* rc-menu 横向子菜单弹层在本工程依赖树中不挂载(submenu-open 但 portal 缺失),
                故「创作」用已验证可用的 Dropdown 作为菜单兄弟元素实现,与用户菜单同机制 */}
            <Dropdown menu={{ items: [
              { key: 'scratch3', icon: <RocketOutlined />, label: 'Scratch3 创作' },
              { key: 'scratchjr', icon: <RocketOutlined />, label: 'ScratchJr 创作' },
              { key: 'python', icon: <RocketOutlined />, label: 'Python 创作' },
              { key: 'blockly', icon: <RocketOutlined />, label: 'Blockly 创作' },
            ], onClick: (e) => openCreate(e.key) }} placement="bottomLeft">
              <span className="nav-create-trigger">创作 <DownOutlined style={{ fontSize: 10 }} /></span>
            </Dropdown>
            <Menu mode="horizontal" selectedKeys={[current]} style={{ flex: 1, borderBottom: 'none', minWidth: 0 }} items={[
              { key: 'courses', icon: <ReadOutlined />, label: '公开课程', onClick: () => nav('/courses') },
              { key: 'center', icon: <FolderOpenOutlined />, label: '个人中心', onClick: () => nav('/center') },
              { key: 'news', icon: <FileTextOutlined />, label: '资讯', onClick: () => nav('/news') },
              { key: 'contest', icon: <TrophyOutlined />, label: '赛事', onClick: () => nav('/contest') },
              ...(isAdmin ? [{ key: 'admin', label: '管理后台', onClick: () => nav('/admin') }] : []),
            ]} />
          </div>
        )}
        {userInfo ? (
          <Dropdown menu={userMenu}>
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} {...(avatarUrl ? { src: avatarUrl as string } : {})} />
              <span>{userInfo?.realname || userInfo?.username || '用户'}</span>
            </Space>
          </Dropdown>
        ) : (
          <Space>
            <Button onClick={() => nav('/login')}>登录</Button>
            <Button type="primary" onClick={() => nav('/register')}>注册</Button>
          </Space>
        )}
      </Header>
      <Content style={{ flex: '1 0 auto', background: '#f5f6f8' }}>
        <Outlet />
      </Content>
      <Layout.Footer style={{ flex: '0 0 auto', background: '#001529', color: 'rgba(255,255,255,.65)', textAlign: 'center', padding: isMobile ? '12px 16px' : '16px 24px' }}>
        <SafeHtml html={footer || `© ${new Date().getFullYear()} ${brandName}`} />
      </Layout.Footer>
    </Layout>
  )
}
