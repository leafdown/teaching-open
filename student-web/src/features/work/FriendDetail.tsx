import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Spin, Card, Avatar, Row, Col, Empty, Statistic, Space, Button, Pagination } from 'antd'
import { workUserInfo, leaderboard, WorkVO } from '@/api/work.api'
import { coverUrl } from '@/api/common.api'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

export default function FriendDetail() {
  const [params] = useSearchParams()
  const userId = params.get('id') || ''
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState('time')
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)
  const u = useQuery({ queryKey: ['friend', userId], queryFn: () => workUserInfo(userId) })
  const works = useQuery({ queryKey: ['friendWorks', userId, page, orderBy], queryFn: () => leaderboard({ pageNo: page, pageSize: 12, orderBy, userId }) })

  // 聚合统计(基于当前页数据 + total)
  const stats = useMemo(() => {
    const list = works.data?.records || []
    return {
      total: works.data?.total || 0,
      star: list.reduce((s, w) => s + (Number(w.starCount) || 0), 0),
      view: list.reduce((s, w) => s + (Number(w.viewCount) || 0), 0),
    }
  }, [works.data])

  if (u.isLoading) return <div style={{ padding: 24, textAlign: 'center' }}><Spin /></div>
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? 12 : 24 }}>
      <Card style={{ marginBottom: 16, background: 'linear-gradient(135deg,#fff,#f0f5ff)' }}>
        <Row gutter={16} align="middle" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
          <Col><Avatar size={80} src={coverUrl(u.data) as string}>{(u.data?.realname || u.data?.username || '?')[0]}</Avatar></Col>
          <Col flex="auto">
            <h2 style={{ marginBottom: 4 }}>{u.data?.realname || u.data?.username || '创作者'}</h2>
            <div style={{ color: '#666' }}>{u.data?.sign || (u.data?.school ? `学校:${u.data.school}` : '这个人很懒,什么都没留下')}</div>
          </Col>
          <Col>
            <Space size="large">
              <Statistic title="作品" value={stats.total} />
              <Statistic title="获赞" value={stats.star} />
              <Statistic title="观看" value={stats.view} />
            </Space>
          </Col>
        </Row>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>作品</h3>
        <Space>
          <Button size="small" type={orderBy === 'time' ? 'primary' : 'default'} onClick={() => { setOrderBy('time'); setPage(1) }}>最新</Button>
          <Button size="small" type={orderBy === 'star' ? 'primary' : 'default'} onClick={() => { setOrderBy('star'); setPage(1) }}>最赞</Button>
          <Button size="small" type={orderBy === 'view' ? 'primary' : 'default'} onClick={() => { setOrderBy('view'); setPage(1) }}>最火</Button>
        </Space>
      </div>
      <Row gutter={[16, 16]}>
        {(works.data?.records || []).map((w: WorkVO) => (
          <Col key={w.id} xs={12} sm={8} md={6}>
            <Card size="small" hoverable cover={<div style={{ height: 110, background: '#f0f0f0', overflow: 'hidden' }}><img src={coverUrl(w)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /></div>}>
              <Card.Meta title={<a href={`/work-detail?id=${w.id}`} target="_blank" rel="noreferrer">{w.workName}</a>} description={<span style={{ fontSize: 12, color: '#999' }}>❤ {w.starCount || 0}</span>} />
            </Card>
          </Col>
        ))}
        {(!works.data?.records?.length) && <Empty description="暂无作品" />}
      </Row>
      {stats.total > 12 && (
        <div style={{ textAlign: 'right', marginTop: 16 }}>
          <Pagination current={page} pageSize={12} total={stats.total} onChange={setPage} showSizeChanger={false} />
        </div>
      )}
    </div>
  )
}
