import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Button, Spin, Empty, Typography } from 'antd'
import { FolderOpenOutlined, StarOutlined, BookOutlined, RocketOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import { useAuth } from '@/stores/auth.store'
import { mineWorks } from '@/api/work.api'
import { coverUrl } from '@/api/common.api'
import StatCard from './StatCard'
import WorkCard from './WorkCard'
import { RESPONSIVE, contentWrapper } from '@/utils/responsive-utils'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

const { Text } = Typography

export default function Center() {
  const nav = useNavigate()
  const userInfo = useAuth(s => s.userInfo)
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)

  const worksQ = useQuery({
    queryKey: ['center-works'],
    queryFn: () => mineWorks({ pageNo: 1, pageSize: 4 }),
    retry: false,
  })
  const totalWorks = worksQ.data?.total || 0
  const recentWorks = worksQ.data?.records || []

  return (
    <div style={contentWrapper}>
      {/* 用户信息卡片 */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexDirection: isMobile ? 'column' : 'row' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
            {userInfo?.avatar ? (
              <img src={coverUrl(userInfo)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            ) : (
              <span style={{ fontSize: 28, color: '#ccc' }}>👤</span>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{userInfo?.realname || userInfo?.username || '用户'}</div>
            <div style={{ color: '#888', fontSize: 13, marginTop: 2 }}>这个人很懒，什么都没留下</div>
          </div>
          <Button onClick={() => nav('/settings')}>编辑资料</Button>
        </div>
      </Card>

      {/* 统计 */}
      <Row gutter={[isMobile ? 8 : 16, isMobile ? 8 : 16]} style={{ marginBottom: 16 }}>
        <Col {...RESPONSIVE.col2}><StatCard icon={<FolderOpenOutlined />} label="作品" value={totalWorks} /></Col>
        <Col {...RESPONSIVE.col2}><StatCard icon={<StarOutlined />} label="获赞" value={0} /></Col>
        <Col {...RESPONSIVE.col2}><StatCard icon={<BookOutlined />} label="课程" value={0} /></Col>
        <Col {...RESPONSIVE.col2}><StatCard icon={<RocketOutlined />} label="学习天数" value={0} /></Col>
      </Row>

      {/* 快捷创作 */}
      <Card title="快捷创作" size="small" style={{ marginBottom: 16 }}>
        <Row gutter={[isMobile ? 8 : 12, isMobile ? 8 : 12]}>
          <Col {...RESPONSIVE.col2}><Button block icon={<PlusOutlined />} onClick={() => window.open('/scratch3/index.html?scene=create', '_blank')}>Scratch</Button></Col>
          <Col {...RESPONSIVE.col2}><Button block icon={<PlusOutlined />} onClick={() => window.open('/ide?workType=4', '_blank')}>Python</Button></Col>
          <Col {...RESPONSIVE.col2}><Button block icon={<PlusOutlined />} onClick={() => window.open('/scratchjr/home.html', '_blank')}>ScratchJr</Button></Col>
          <Col {...RESPONSIVE.col2}><Button block icon={<PlusOutlined />} onClick={() => window.open('/blockly/index.html?lang=zh-hans&scene=create', '_blank')}>Blockly</Button></Col>
        </Row>
      </Card>

      {/* 最近作品 */}
      <Card title="最近作品" size="small" style={{ marginBottom: 16 }}
        extra={<a onClick={() => nav('/works')}>查看全部 <RightOutlined /></a>}>
        {worksQ.isLoading ? <Spin /> : !recentWorks.length ? (
          <Empty description="还没有作品，开始创作吧！" />
        ) : (
          <Row gutter={[12, 12]}>
            {recentWorks.map((w: any) => (
              <Col key={w.id} xs={12} sm={8} md={6}>
                <WorkCard work={w} />
              </Col>
            ))}
          </Row>
        )}
      </Card>

      {/* 我的课程 */}
      <Card title="我的课程" size="small"
        extra={<a onClick={() => nav('/home')}>查看全部 <RightOutlined /></a>}>
        <div style={{ color: '#888', textAlign: 'center', padding: 24 }}>
          <BookOutlined style={{ fontSize: 32, opacity: 0.3 }} />
          <div style={{ marginTop: 8 }}>课程功能即将上线</div>
        </div>
      </Card>
    </div>
  )
}
