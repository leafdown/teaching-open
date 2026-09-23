import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Input, Select, Button, Space, Popconfirm, Rate, Tooltip, Tag, message, Empty } from 'antd'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mineWorks, deleteWork, deleteBatchWork, getWorkTags, setWorkTag, WorkVO } from '@/api/work.api'
import { useDict } from '@/stores/dict.store'
import { useAuth } from '@/stores/auth.store'
import { coverUrl } from '@/api/common.api'
import { contentWrapper } from '@/utils/responsive-utils'
import { decodeEntities } from '@/utils/text'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

// work_status 字典(sys_dict: 0已保存/1已提交/2优秀作品/4精选作品);固定映射避免刷新后字典丢失显示成数字
const STATUS_TAG: Record<number, { text: string; color?: string }> = {
  0: { text: '已保存' },
  1: { text: '已提交', color: 'green' },
  2: { text: '优秀作品', color: 'gold' },
  4: { text: '精选作品', color: 'blue' },
}

function editHref(w: WorkVO): string {
  const t = Number(w.workType)
  if (t === 1 || t === 2) return `/scratch3/index.html?workId=${w.id}`
  if (t === 3) return `/scratchjr/editor.html?mode=edit&workFile=${w.workFile || ''}`
  if (t === 4) return `/ide?workType=4&workId=${w.id}`
  if (t === 10) return `/blockly/index.html?lang=zh-hans&workId=${w.id}`
  return '#'
}

export default function MineWorkTable() {
  const qc = useQueryClient()
  const nav = useNavigate()
  const dict = useDict()
  const token = useAuth((s) => s.token)
  const isLoggedIn = !!token
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<{ workName?: string; workTag?: string; workType?: string }>({})
  const [selected, setSelected] = useState<React.Key[]>([])
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)

  // 未登录不发请求(避免 401 触发全局登出硬跳 /login)
  const q = useQuery({ queryKey: ['mineWorksTable', page, filters], queryFn: () => mineWorks({ pageNo: page, pageSize: 10, ...filters }), enabled: isLoggedIn })
  const tagsQ = useQuery({ queryKey: ['workTags'], queryFn: getWorkTags, enabled: isLoggedIn })
  const del = useMutation({ mutationFn: deleteWork, onSuccess: () => { message.success('已删除'); qc.invalidateQueries({ queryKey: ['mineWorksTable'] }) } })
  const batchDel = useMutation({ mutationFn: deleteBatchWork, onSuccess: () => { message.success('批量删除成功'); setSelected([]); qc.invalidateQueries({ queryKey: ['mineWorksTable'] }) } })

  const columns = [
    { title: '作品名', dataIndex: 'workName', render: (v: string, r: WorkVO) => <a href={`/work-detail?id=${r.id}`} target="_blank" rel="noreferrer">{decodeEntities(v)}</a> },
    { title: '封面', dataIndex: 'workCover', render: (_: any, r: WorkVO) => coverUrl(r) ? <img src={coverUrl(r)} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} loading="lazy" /> : '—' },
    { title: '类型', dataIndex: 'workType', render: (v: number) => dict.textOf('work_type', String(v)) },
    { title: '状态', dataIndex: 'workStatus', render: (v: number) => { const s = STATUS_TAG[v ?? 0] ?? STATUS_TAG[0]; return <Tag color={s.color}>{s.text}</Tag> } },
    { title: '标签', dataIndex: 'workTag', render: (v: string) => v ? v.split(',').map((t:string) => <Tag key={t}>{t}</Tag>) : '—' },
    { title: '得分', dataIndex: 'score', render: (v: number, r: WorkVO) => v ? <Tooltip title={r.teacherComment}><Rate disabled value={v} allowHalf /></Tooltip> : '—' },
    { title: '观看', dataIndex: 'viewCount', sorter: true },
    { title: '点赞', dataIndex: 'starCount', sorter: true },
    { title: '创建时间', dataIndex: 'createTime', sorter: true },
    { title: '操作', render: (_: any, r: WorkVO) => (
      <Space>
        <a href={editHref(r)} target="_blank" rel="noreferrer">编辑</a>
        <Popconfirm title="确认删除?" onConfirm={() => del.mutate(r.id)}><a style={{ color: '#ff4d4f' }}>删除</a></Popconfirm>
      </Space>
    ) },
  ]

  if (!isLoggedIn) {
    return (
      <div style={{ ...contentWrapper, padding: isMobile ? 12 : 24 }}>
        <Empty description="登录后可查看和管理我的作品" style={{ padding: '40px 0' }}>
          <Button type="primary" onClick={() => nav('/login')}>去登录</Button>
        </Empty>
      </div>
    )
  }

  return (
    <div style={{ ...contentWrapper, padding: isMobile ? 12 : 24 }}>
      <Space style={{ marginBottom: 16, flexWrap: 'wrap' }}>
        <Input.Search placeholder="作品名" allowClear onSearch={(v) => { setFilters({ ...filters, workName: v || undefined }); setPage(1) }} style={{ width: isMobile ? '100%' : 180 }} />
        <Select placeholder="标签" allowClear style={{ width: isMobile ? '100%' : 120 }} options={(tagsQ.data || []).map((t:string) => ({ label: t, value: t }))} onChange={(v) => { setFilters({ ...filters, workTag: v }); setPage(1) }} />
        <Select placeholder="类型" allowClear style={{ width: isMobile ? '100%' : 120 }} options={dict.get('work_type').map(d => ({ label: d.text, value: d.value }))} onChange={(v) => { setFilters({ ...filters, workType: v }); setPage(1) }} />
        <Popconfirm title={`确认删除选中的 ${selected.length} 项?`} onConfirm={() => batchDel.mutate(selected.join(','))} disabled={!selected.length}>
          <Button danger disabled={!selected.length}>批量删除</Button>
        </Popconfirm>
      </Space>
      <Table dataSource={q.data?.records} columns={columns} rowKey="id" loading={q.isLoading}
        rowSelection={{ selectedRowKeys: selected, onChange: setSelected }}
        pagination={{ current: page, pageSize: 10, total: q.data?.total, onChange: setPage }} />
    </div>
  )
}
