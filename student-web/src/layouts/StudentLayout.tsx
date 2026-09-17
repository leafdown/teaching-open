import { Layout, Menu, Dropdown, Avatar, Space, message, Button } from 'antd'
import { UserOutlined, LogoutOutlined, HomeOutlined, BookOutlined, FolderOpenOutlined, ReadOutlined, SettingOutlined, FileTextOutlined, RocketOutlined, DownOutlined } from '@ant-design/icons'
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

  const current = loc.pathname.startsWith('/course') ? 'course' :
    loc.pathname.startsWith('/center') ? 'center' :
    loc.pathname.startsWith('/work') ? 'works' :
    loc.pathname.startsWith('/news') ? 'news' : loc.pathname.startsWith('/assets') ? 'assets' : loc.pathname.startsWith('/contest') ? 'contest' :
    loc.pathname.startsWith('/courses') ? 'courses' :
    loc.pathname === '/' ? 'index' : 'home'

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
          <Menu mode="horizontal" selectedKeys={[current]} style={{ flex: 1, borderBottom: 'none' }} items={[
            { key: 'home', icon: <HomeOutlined />, label: '社区', onClick: () => nav('/home') },
            { key: 'create', icon: <RocketOutlined />, label: (
              <Dropdown menu={{ items: [
                { key: 'scratch3', label: 'Scratch3 创作', onClick: () => window.open('/scratch3/index.html?scene=create', '_blank') },
                { key: 'scratchjr', label: 'ScratchJr 创作', onClick: () => window.open('/scratchjr/home.html', '_blank') },
                { key: 'python', label: 'Python 创作', onClick: () => window.open('/ide?workType=4', '_blank') },
              ] }}>
                <span>创作 <DownOutlined /></span>
              </Dropdown>
            ) },
            { key: 'courses', icon: <ReadOutlined />, label: '公开课程', onClick: () => nav('/courses') },
            { key: 'course', icon: <BookOutlined />, label: '我的课程', onClick: () => nav('/home') },
            { key: 'center', icon: <FolderOpenOutlined />, label: '个人中心', onClick: () => nav('/center') },
            { key: 'news', icon: <FileTextOutlined />, label: '资讯', onClick: () => nav('/news') },
            { key: 'contest', label: '赛事', onClick: () => nav('/contest') },
            ...(isAdmin ? [{ key: 'admin', label: '管理后台', onClick: () => nav('/admin') }] : []),
          ]} />
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
