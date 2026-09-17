import { useQuery } from '@tanstack/react-query'
import { Spin, Row, Col, Card, Empty, Button } from 'antd'
import { leaderboard, WorkVO } from '@/api/work.api'
import { getHomeCourse, CourseVO } from '@/api/course.api'
import { coverUrl } from '@/api/common.api'
import { useNavigate } from 'react-router-dom'
import { useConfig } from '@/stores/config.store'
import { SafeHtml } from '@/utils/safe-html'
import { RESPONSIVE, contentWrapper } from '@/utils/responsive-utils'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

const openIDE = (type: 'scratch3' | 'scratchjr' | 'python') => {
  const map = { scratch3: '/scratch3/index.html?scene=create', scratchjr: '/scratchjr/home.html', python: '/ide?workType=4' }
  window.open(map[type], '_blank')
}

export default function Landing() {
  const nav = useNavigate()
  const sysConfig = useConfig((s) => s.sysConfig)
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)
  const featured = useQuery({ queryKey: ['leaderboard', 'featured'], queryFn: () => leaderboard({ pageNo: 1, pageSize: 8, workStatus: 4, orderBy: 'create_time' }) })
  const starred = useQuery({ queryKey: ['leaderboard', 'star'], queryFn: () => leaderboard({ pageNo: 1, pageSize: 8, orderBy: 'star' }) })
  const courses = useQuery({ queryKey: ['homeCourse'], queryFn: () => getHomeCourse({ pageNo: 1, pageSize: 8, orderBy: 'time' }) })

  const cardCoverStyle: React.CSSProperties = {
    height: isMobile ? 90 : 110,
    background: '#f0f0f0',
    overflow: 'hidden',
  }

  return (
    <div style={contentWrapper}>
      {sysConfig?._homeHtml && (
        <SafeHtml html={sysConfig._homeHtml} style={{ marginBottom: 16 }} />
      )}

      <h2 style={{ marginBottom: 12 }}>开始创作</h2>
      <Row gutter={[isMobile ? 8 : 16, isMobile ? 8 : 16]} style={{ marginBottom: 24 }}>
        <Col {...RESPONSIVE.col3}>
          <Card hoverable onClick={() => openIDE('scratchjr')} styles={{ body: { display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px' } }}>
            <img src="/images/tools/scratchjr.png" alt="" style={{ width: 44, height: 44, borderRadius: 8, flexShrink: 0, objectFit: 'contain' }} />
            <Card.Meta title={<span style={{ fontSize: 16, fontWeight: 600 }}>ScratchJr</span>} description={<span style={{ fontSize: 13 }}>低年级图形化编程</span>} />
          </Card>
        </Col>
        <Col {...RESPONSIVE.col3}>
          <Card hoverable onClick={() => openIDE('scratch3')} styles={{ body: { display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px' } }}>
            <img src="/images/tools/scratch3.jpg" alt="" style={{ width: 44, height: 44, borderRadius: 8, flexShrink: 0, objectFit: 'contain' }} />
            <Card.Meta title={<span style={{ fontSize: 16, fontWeight: 600 }}>Scratch3</span>} description={<span style={{ fontSize: 13 }}>图形化编程创作</span>} />
          </Card>
        </Col>
        <Col {...RESPONSIVE.col3}>
          <Card hoverable onClick={() => openIDE('python')} styles={{ body: { display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px' } }}>
            <img src="/images/tools/python.png" alt="" style={{ width: 44, height: 44, borderRadius: 8, flexShrink: 0, objectFit: 'contain' }} />
            <Card.Meta title={<span style={{ fontSize: 16, fontWeight: 600 }}>Python</span>} description={<span style={{ fontSize: 13 }}>Python Turtle 编程</span>} />
          </Card>
        </Col>
      </Row>

      <Section title="精选作品" onMore={() => nav('/works?type=3')}>
        {featured.isLoading ? <Spin /> : (
          <Row gutter={[isMobile ? 8 : 12, isMobile ? 8 : 12]}>
            {(featured.data?.records || []).map((w: WorkVO) => (
              <Col key={w.id} {...RESPONSIVE.col4}>
                <Card size="small" hoverable onClick={() => window.open(`/work-detail?id=${w.id}`, '_blank')} cover={<div style={cardCoverStyle}><img src={coverUrl(w)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /></div>}>
                  <Card.Meta title={w.workName} description={<span style={{ fontSize: 12 }}>❤ {w.starCount || 0}</span>} />
                </Card>
              </Col>
            ))}
            {(!featured.data?.records?.length) && <Empty description="暂无作品" />}
          </Row>
        )}
      </Section>

      <Section title="推荐课程" onMore={() => nav('/courses')}>
        {courses.isLoading ? <Spin /> : (
          <Row gutter={[isMobile ? 8 : 12, isMobile ? 8 : 12]}>
            {(courses.data?.records || []).map((c: CourseVO) => (
              <Col key={c.id} {...RESPONSIVE.col4}>
                <Card size="small" hoverable onClick={() => nav(`/course/${c.id}`)} cover={<div style={cardCoverStyle}><img src={coverUrl(c)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /></div>}>
                  <Card.Meta title={c.courseName} />
                </Card>
              </Col>
            ))}
            {(!courses.data?.records?.length) && <Empty description="暂无课程" />}
          </Row>
        )}
      </Section>

      <Section title="最赞作品" onMore={() => nav('/works?type=2')}>
        {starred.isLoading ? <Spin /> : (
          <Row gutter={[isMobile ? 8 : 12, isMobile ? 8 : 12]}>
            {(starred.data?.records || []).map((w: WorkVO) => (
              <Col key={w.id} {...RESPONSIVE.col4}>
                <Card size="small" hoverable onClick={() => window.open(`/work-detail?id=${w.id}`, '_blank')} cover={<div style={cardCoverStyle}><img src={coverUrl(w)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /></div>}>
                  <Card.Meta title={w.workName} description={<span style={{ fontSize: 12 }}>❤ {w.starCount || 0}</span>} />
                </Card>
              </Col>
            ))}
            {(!starred.data?.records?.length) && <Empty description="暂无作品" />}
          </Row>
        )}
      </Section>
    </div>
  )
}

function Section({ title, onMore, children }: { title: string; onMore?: () => void; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3>{title}</h3>
        {onMore && <Button type="link" size="small" onClick={onMore}>查看全部</Button>}
      </div>
      {children}
    </div>
  )
}
