import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, Row, Col, Spin, Empty, Tabs, Button, Popconfirm, message, Space, Select, Pagination } from 'antd'
import { mineWorks, leaderboard, deleteWork, WorkVO } from '@/api/work.api'
import { coverUrl, workFileUrl } from '@/api/common.api'
import MineWorkTable from './MineWorkTable'
import { RESPONSIVE, contentWrapper } from '@/utils/responsive-utils'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { useAuth } from '@/stores/auth.store'

const typeMap: Record<string, { label: string; orderBy?: string; workStatus?: number }> = {
  '0': { label: '最火', orderBy: 'view' },
  '1': { label: '最新', orderBy: 'time' },
  '2': { label: '最赞', orderBy: 'star' },
  '3': { label: '精选', workStatus: 4, orderBy: 'create_time' },
}

function editHref(w: WorkVO): string {
  const t = Number(w.workType)
  if (t === 1 || t === 2) return `/scratch3/index.html?workId=${w.id}`
  if (t === 3) return `/scratchjr/editor.html?mode=edit&workFile=${w.workFile || ''}`
  if (t === 4) return `/ide?workType=4&workId=${w.id}`
  if (t === 10) return `/blockly/index.html?lang=zh-hans&workId=${w.id}`
  return workFileUrl(w)
}

function MineWorks() {
  const qc = useQueryClient()
  const nav = useNavigate()
  const token = useAuth((s) => s.token)
  const isLoggedIn = !!token
  const [page, setPage] = useState(1)
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)
  // /works 是公开页: 未登录不发「我的作品」请求(该接口 401 会触发全局登出硬跳 /login)
  const q = useQuery({ queryKey: ['mineWorks', page], queryFn: () => mineWorks({ pageNo: page, pageSize: 12 }), enabled: isLoggedIn })
  const del = useMutation({ mutationFn: deleteWork, onSuccess: () => { message.success('已删除'); qc.invalidateQueries({ queryKey: ['mineWorks'] }) } })

  if (!isLoggedIn) {
    return (
      <div style={contentWrapper}>
        <h2>我的作品</h2>
        <Empty description="登录后可查看和管理我的作品" style={{ padding: '40px 0' }}>
          <Button type="primary" onClick={() => nav('/login')}>去登录</Button>
        </Empty>
      </div>
    )
  }

  return (
    <div style={contentWrapper}>
      <h2>我的作品</h2>
      {q.isLoading ? <Spin /> : (
        <Row gutter={[16, 16]}>
          {(q.data?.records || []).map((w) => (
            <Col key={w.id} {...RESPONSIVE.col4}>
              <Card size="small" hoverable cover={<div style={{ height: isMobile ? 90 : 120, background: '#f0f0f0', overflow: 'hidden' }}>{w.workCover && <img src={coverUrl(w)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />}</div>}
                actions={[
                  <a key="edit" href={editHref(w)} target="_blank" rel="noreferrer">编辑</a>,
                  <a key="view" href={`/work-detail?id=${w.id}`} target="_blank" rel="noreferrer">查看</a>,
                  <Popconfirm key="del" title="确认删除?" onConfirm={() => del.mutate(w.id)}><a style={{ color: '#ff4d4f' }}>删除</a></Popconfirm>
                ]}>
                <Card.Meta title={w.workName} description={<span>状态:{w.workStatus === 1 ? '已提交' : '草稿'}</span>} />
              </Card>
            </Col>
          ))}
          {(!q.data?.records?.length) && <Empty description="暂无作品,去创作吧" />}
        </Row>
      )}
    </div>
  )
}

function Leaderboard() {
  const [params] = useSearchParams()
  const t = params.get('type') || '0'
  const cfg = typeMap[t] || typeMap['0']
  const [page, setPage] = useState(1)
  const [workType, setWorkType] = useState<number | undefined>(undefined)
  const [orderBy, setOrderBy] = useState<string>(cfg.orderBy || 'view')
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)
  const q = useQuery({ queryKey: ['leaderboard', t, page, workType, orderBy], queryFn: () => leaderboard({ pageNo: page, pageSize: 24, orderBy, workStatus: cfg.workStatus, workType }) })

  const typeFilters = [
    { value: undefined, label: '全部' },
    { value: 2, label: 'Scratch' },
    { value: 4, label: 'Python' },
    { value: 3, label: 'ScratchJr' },
    { value: 10, label: 'Blockly' },
  ]
  const orderOptions = [
    { value: 'view', label: '最火' },
    { value: 'time', label: '最新' },
    { value: 'star', label: '最赞' },
    { value: 'random', label: '随机' },
  ]

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? 12 : 24 }}>
      <h2>{cfg.label}作品</h2>
      <Space style={{ marginBottom: 16, flexWrap: 'wrap' }}>
        {typeFilters.map(f => (
          <Button key={String(f.value)} type={workType === f.value ? 'primary' : 'default'} size="small"
            onClick={() => { setWorkType(f.value); setPage(1) }}>{f.label}</Button>
        ))}
        <Select size="small" value={orderBy} onChange={(v) => { setOrderBy(v); setPage(1) }} style={{ width: isMobile ? '100%' : 100 }}
          options={orderOptions} />
      </Space>
      {q.isLoading ? <Spin /> : (
        <>
          <Row gutter={[12, 12]}>
            {(q.data?.records || []).map((w) => (
              <Col key={w.id} {...RESPONSIVE.col6}>
                <Card size="small" hoverable onClick={() => window.open(`/work-detail?id=${w.id}`, '_blank')}
                  cover={<div style={{ height: isMobile ? 80 : 110, background: '#f0f0f0', overflow: 'hidden' }}><img src={coverUrl(w)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /></div>}>
                  <Card.Meta title={<span style={{ fontSize: 12 }}>{w.workName}</span>} description={<span style={{ fontSize: 11, color: '#999' }}>❤ {w.starCount || 0} · 👁 {w.viewCount || 0}</span>} />
                </Card>
              </Col>
            ))}
            {(!q.data?.records?.length) && <Empty description="暂无作品" />}
          </Row>
          <div style={{ textAlign: 'right', marginTop: 16 }}>
            <Pagination current={page} pageSize={24} total={q.data?.total || 0} onChange={setPage} showSizeChanger={false} />
          </div>
        </>
      )}
    </div>
  )
}

export default function WorkList() {
  const [params] = useSearchParams()
  const [view, setView] = useState<'card' | 'table'>('card')
  const hasType = !!params.get('type')
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)
  if (hasType) return <Leaderboard />
  return (
    <>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '12px 12px 0' : '24px 24px 0' }}>
        <Tabs activeKey={view} onChange={(k) => setView(k as 'card' | 'table')} items={[
          { key: 'card', label: '卡片视图' },
          { key: 'table', label: '表格视图' },
        ]} />
      </div>
      {view === 'card' ? <MineWorks /> : <MineWorkTable />}
    </>
  )
}
