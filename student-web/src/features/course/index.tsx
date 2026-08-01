import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Spin, Empty, Card, Row, Col, message } from 'antd'
import { getCourseById, mineUnit, CourseVO, CourseUnitVO } from '@/api/course.api'
import { fileUrl } from '@/api/common.api'
import UnitViewModal from './UnitViewModal'
import { RESPONSIVE, contentWrapper } from '@/utils/responsive-utils'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

export default function CourseView() {
  const { courseId } = useParams()
  const [active, setActive] = useState<CourseUnitVO | null>(null)
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)
  const courseQ = useQuery({ queryKey: ['course', courseId], queryFn: () => getCourseById(courseId!), enabled: !!courseId })
  const unitsQ = useQuery({ queryKey: ['mineUnit', courseId], queryFn: () => mineUnit(courseId!), enabled: !!courseId })

  if (courseQ.isLoading || unitsQ.isLoading) return <div style={{ padding: 24, textAlign: 'center' }}><Spin /></div>
  const course = courseQ.data
  const units = unitsQ.data?.records || []

  return (
    <div style={contentWrapper}>
      <h2 style={{ marginBottom: 16 }}>{course?.courseName}</h2>

      {course?.showType === 1 && course.courseMap ? (
        // 地图视图:courseMap 背景 + mapX/mapY 定位
        <div style={{ position: 'relative', maxWidth: '100%' }}>
          <img src={fileUrl(course.courseMap)} alt="课程地图" style={{ width: '100%', borderRadius: 8 }} loading="lazy" />
          {units.map((u: CourseUnitVO, i: number) => (
            <button key={u.id} title={u.unitName}
              style={{ position: 'absolute', left: `${u.mapX || 0}%`, top: `${u.mapY || 0}%`, transform: 'translate(-50%,-50%)', fontSize: 24, cursor: 'pointer', border: 'none', background: 'transparent' }}
              onClick={() => setActive(u)}>📍<span style={{ fontSize: 12 }}>{i + 1}</span></button>
          ))}
        </div>
      ) : (
        // 卡片视图
        <Row gutter={[16, 16]}>
          {units.map((u: CourseUnitVO, i: number) => (
            <Col key={u.id} {...RESPONSIVE.col4}>
              <Card hoverable onClick={() => setActive(u)} styles={{ body: { padding: 12 } }}>
                <div style={{ fontWeight: 600 }}>第{i + 1}单元</div>
                <div>{u.unitName}</div>
              </Card>
            </Col>
          ))}
          {units.length === 0 && <Empty description="暂无单元" />}
        </Row>
      )}

      <UnitViewModal unit={active} course={course || null} open={!!active} onClose={() => setActive(null)} />
    </div>
  )
}
