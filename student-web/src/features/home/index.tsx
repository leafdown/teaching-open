import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Card, Row, Col, Spin, Empty, Button } from 'antd'
import { leaderboard } from '@/api/work.api'
import { getHomeCourse } from '@/api/course.api'
import { fileUrl, coverUrl, workFileUrl } from '@/api/common.api'
import { WorkVO } from '@/api/work.api'
import { CourseVO } from '@/api/course.api'
import { RESPONSIVE, contentWrapper } from '@/utils/responsive-utils'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

const openIDE = (type: 'scratch3' | 'scratchjr' | 'python') => {
  const map = { scratch3: '/scratch3/index.html?scene=create', scratchjr: '/scratchjr/home.html', python: '/ide?workType=4' }
  window.open(map[type], '_blank')
}

function WorkCard({ w, isMobile }: { w: WorkVO; isMobile: boolean }) {
  const nav = useNavigate()
  return (
    <Card size="small" hoverable styles={{ body: { padding: 8 } }} onClick={() => window.open(`/work-detail?id=${w.id}`, '_blank')}>
      <div style={{ height: isMobile ? 90 : 110, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
        {w.workCover ? <img src={coverUrl(w)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /> : null}
      </div>
      <div style={{ fontSize: 13, marginTop: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{w.workName}</div>
      <div style={{ fontSize: 12, color: '#999' }}>❤ {w.starNum ?? w.starCount ?? 0} · 👁 {w.viewNum ?? w.viewCount ?? 0}</div>
    </Card>
  )
}

function CourseCard({ c, isMobile }: { c: CourseVO; isMobile: boolean }) {
  const nav = useNavigate()
  return (
    <Card size="small" hoverable styles={{ body: { padding: 8 } }} onClick={() => nav(`/course/${c.id}`)}>
      <div style={{ height: isMobile ? 90 : 110, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
        {c.courseCover ? <img src={coverUrl(c)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /> : null}
      </div>
      <div style={{ fontSize: 13, marginTop: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.courseName}</div>
    </Card>
  )
}

function Section({ title, onMore, children }: { title: string; onMore?: () => void; children: React.ReactNode }) {
  const nav = useNavigate()
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

export default function Home() {
  const nav = useNavigate()
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)
  const featured = useQuery({ queryKey: ['leaderboard', 'featured'], queryFn: () => leaderboard({ pageNo: 1, pageSize: 8, workStatus: 4, orderBy: 'create_time' }) })
  const starred = useQuery({ queryKey: ['leaderboard', 'star'], queryFn: () => leaderboard({ pageNo: 1, pageSize: 8, orderBy: 'star' }) })
  const courses = useQuery({ queryKey: ['homeCourse'], queryFn: () => getHomeCourse({ pageNo: 1, pageSize: 8, orderBy: 'time' }) })

  return (
    <div style={contentWrapper}>
      <Row gutter={[isMobile ? 8 : 16, isMobile ? 8 : 16]}>
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
            {(featured.data?.records || []).map((w) => <Col key={w.id} {...RESPONSIVE.col4}><WorkCard w={w} isMobile={isMobile} /></Col>)}
            {(!featured.data?.records?.length) && <Empty description="暂无作品" />}
          </Row>
        )}
      </Section>

      <Section title="推荐课程" onMore={() => nav('/courses')}>
        {courses.isLoading ? <Spin /> : (
          <Row gutter={[isMobile ? 8 : 12, isMobile ? 8 : 12]}>
            {(courses.data?.records || []).map((c) => <Col key={c.id} {...RESPONSIVE.col4}><CourseCard c={c} isMobile={isMobile} /></Col>)}
            {(!courses.data?.records?.length) && <Empty description="暂无课程" />}
          </Row>
        )}
      </Section>

      <Section title="最赞作品" onMore={() => nav('/works?type=2')}>
        {starred.isLoading ? <Spin /> : (
          <Row gutter={[isMobile ? 8 : 12, isMobile ? 8 : 12]}>
            {(starred.data?.records || []).map((w) => <Col key={w.id} {...RESPONSIVE.col4}><WorkCard w={w} isMobile={isMobile} /></Col>)}
            {(!starred.data?.records?.length) && <Empty description="暂无作品" />}
          </Row>
        )}
      </Section>
    </div>
  )
}
