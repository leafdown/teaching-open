import { Drawer, Menu, Button } from 'antd'
import { MenuOutlined, HomeOutlined, RocketOutlined, ReadOutlined, FolderOpenOutlined, FileTextOutlined, TrophyOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface MobileMenuProps {
  isAdmin: boolean
}

export default function MobileMenu({ isAdmin }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const nav = useNavigate()

  const handleNav = (path: string) => {
    setOpen(false)
    nav(path)
  }

  // 「我的课程」未上线,不在菜单中展示(与桌面端一致)
  const items = [
    { key: 'home', icon: <HomeOutlined />, label: '社区', onClick: () => handleNav('/home') },
    {
      key: 'create', icon: <RocketOutlined />, label: '创作',
      children: [
        { key: 'scratch3', label: 'Scratch3 创作', onClick: () => { setOpen(false); window.open('/scratch3/index.html?scene=create', '_blank') } },
        { key: 'scratchjr', label: 'ScratchJr 创作', onClick: () => { setOpen(false); window.open('/scratchjr/home.html', '_blank') } },
        { key: 'python', label: 'Python 创作', onClick: () => { setOpen(false); window.open('/ide?workType=4', '_blank') } },
        { key: 'blockly', label: 'Blockly 创作', onClick: () => { setOpen(false); window.open('/blockly/index.html?lang=zh-hans&scene=create', '_blank') } },
      ],
    },
    { key: 'courses', icon: <ReadOutlined />, label: '公开课程', onClick: () => handleNav('/courses') },
    { key: 'center', icon: <FolderOpenOutlined />, label: '个人中心', onClick: () => handleNav('/center') },
    { key: 'news', icon: <FileTextOutlined />, label: '资讯', onClick: () => handleNav('/news') },
    { key: 'contest', icon: <TrophyOutlined />, label: '赛事', onClick: () => handleNav('/contest') },
    ...(isAdmin ? [{ key: 'admin', label: '管理后台', onClick: () => handleNav('/admin') }] : []),
  ]

  return (
    <>
      <Button type="text" icon={<MenuOutlined style={{ fontSize: 20 }} />} onClick={() => setOpen(true)} />
      <Drawer title="导航菜单" placement="left" onClose={() => setOpen(false)} open={open} width={280}>
        <Menu mode="inline" items={items} style={{ borderInlineEnd: 'none' }} />
      </Drawer>
    </>
  )
}
