import { Card, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { WorkVO } from '@/api/work.api'
import { coverUrl } from '@/api/common.api'

interface Props { work: WorkVO }

const TYPE_MAP: Record<number, { label: string; color: string }> = {
  1: { label: 'Scratch', color: '#fa8c16' },
  2: { label: 'Scratch', color: '#fa8c16' },
  3: { label: 'ScratchJr', color: '#52c41a' },
  4: { label: 'Python', color: '#4ec9b0' },
  10: { label: 'Blockly', color: '#722ed1' },
}

export default function WorkCard({ work }: Props) {
  const nav = useNavigate()
  const type = TYPE_MAP[work.workType || 2] || { label: '未知', color: '#888' }
  const imgUrl = coverUrl(work) || ''
  return (
    <Card hoverable size="small" onClick={() => nav(`/work-detail?id=${work.id}`)}
      cover={
        <div style={{ height: 100, background: '#f5f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {imgUrl ? (
            <img src={imgUrl} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          ) : (
            <span style={{ fontSize: 36, opacity: 0.3 }}>{work.workType === 4 ? '🐍' : '🧩'}</span>
          )}
        </div>
      }>
      <Card.Meta title={<span style={{ fontSize: 13 }}>{work.workName}</span>} />
      <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
        <Tag color={type.color} style={{ fontSize: 10 }}>{type.label}</Tag>
        {work.starNum != null && <span style={{ fontSize: 11, color: '#999' }}>⭐ {work.starNum}</span>}
      </div>
    </Card>
  )
}
