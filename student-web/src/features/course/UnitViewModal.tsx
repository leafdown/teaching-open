import { useEffect } from 'react'
import { Modal, Tabs, Button, Descriptions } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { CourseUnitVO, CourseVO, unitViewLog } from '@/api/course.api'
import { fileUrl } from '@/api/common.api'
import { SafeHtml } from '@/utils/safe-html'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

interface Props { unit: CourseUnitVO | null; course: CourseVO | null; open: boolean; onClose: () => void }

// 去做作业:按 courseWorkType 跳 IDE
function goIDE(unit: CourseUnitVO, scene: 'course' | 'additional' = 'course') {
  const wt = unit.courseWorkType || 2
  const params = `scene=${scene}&unitId=${unit.id}&workType=${wt}`
  window.open(`/ide?${params}`, '_blank')
}

export default function UnitViewModal({ unit, course, open, onClose }: Props) {
  // 打开时上报浏览日志
  useEffect(() => {
    if (open && unit?.id) { unitViewLog(unit.id).catch(() => {}) }
  }, [open, unit?.id])
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)

  if (!unit) return null

  const videoUrl = unit.courseVideo ? fileUrl(unit.courseVideo) : ''
  const caseUrl = unit.courseCase ? fileUrl(unit.courseCase) : ''

  return (
    <Modal title={unit.unitName} open={open} onCancel={onClose} footer={null} width={isMobile ? '100%' : 800} destroyOnClose>
      <Tabs items={[
        { key: 'video', label: '视频', children: videoUrl ? <video src={videoUrl} controls style={{ width: '100%' }} /> : <div style={{ color: '#999' }}>暂无视频</div> },
        { key: 'case', label: '案例', children: caseUrl ? <iframe src={caseUrl} sandbox="allow-scripts allow-same-origin allow-forms" style={{ width: '100%', height: 400, border: 'none' }} title="案例" /> : <div style={{ color: '#999' }}>暂无案例</div> },
        { key: 'content', label: '课程内容', children: <SafeHtml html={unit.mediaContent || '<span style="color:#999">暂无内容</span>'} /> }
      ]} />

      <Descriptions title="本节课资料" column={1} size="small" style={{ marginTop: 16 }} bordered>
        <Descriptions.Item label="课程说明">{unit.unitIntro || '—'}</Descriptions.Item>
        <Descriptions.Item label="课后作业">
          <Button type="primary" onClick={() => goIDE(unit)}>去做作业</Button>
        </Descriptions.Item>
        <Descriptions.Item label="课程资料">
          {unit.coursePpt ? <a href={fileUrl(unit.coursePpt)} target="_blank" rel="noreferrer">查看资料</a> : '—'}
        </Descriptions.Item>
        <Descriptions.Item label="课程教案">
          {unit.coursePlan ? <a href={fileUrl(unit.coursePlan)} target="_blank" rel="noreferrer">查看教案</a> : '—'}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}
