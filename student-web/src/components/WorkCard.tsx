// 作品卡片(首页/落地页/个人中心共用):统一真实点赞/浏览数字段与实体解码
import { Card } from 'antd'
import { WorkVO } from '@/api/work.api'
import { coverUrl } from '@/api/common.api'
import { decodeEntities } from '@/utils/text'

export default function WorkCard({ w, isMobile }: { w: WorkVO; isMobile: boolean }) {
  return (
    <Card size="small" hoverable styles={{ body: { padding: 8 } }} onClick={() => window.open(`/work-detail?id=${w.id}`, '_blank')}>
      <div style={{ height: isMobile ? 90 : 110, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
        {w.workCover ? <img src={coverUrl(w)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /> : null}
      </div>
      <div style={{ fontSize: 13, marginTop: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={w.workName || ''}>
        {decodeEntities(w.workName)}
      </div>
      <div style={{ fontSize: 12, color: '#999' }}>❤ {w.starNum ?? w.starCount ?? 0} · 👁 {w.viewNum ?? w.viewCount ?? 0}</div>
    </Card>
  )
}
