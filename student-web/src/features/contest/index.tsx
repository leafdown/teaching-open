import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, List, Pagination, Empty, Spin, Tag, Space, Select, Input } from 'antd'
import { FilePdfOutlined, FileZipOutlined, DownloadOutlined } from '@ant-design/icons'
import { newsList, toNewsArray, NewsVO } from '@/api/news.api'
import { fileUrl } from '@/api/common.api'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

const PAGE_SIZE = 10

// 赛事分类(对应 teaching_news.cmsType 或标签)
const CONTEST_TYPES = [
  { value: '', label: '全部赛事' },
  { value: 'lanqiao', label: '蓝桥杯' },
  { value: 'electron', label: '电子学会等级考试' },
  { value: 'nocc', label: '全国青少年信息素养大赛' },
  { value: 'other', label: '其他' },
]

export default function Contest() {
  const [contestType, setContestType] = useState('')
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)
  // 赛事资料复用资讯接口,cmsType=contest
  const q = useQuery({ queryKey: ['contest', contestType], queryFn: () => newsList({ cmsType: 'contest' }) })
  const list = toNewsArray(q.data).filter(n => !contestType || (n.title || '').includes(contestType)).filter(n => !keyword || (n.title || '').includes(keyword))
  const total = list.length
  const paged = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? 12 : 24 }}>
      <h2 style={{ marginBottom: 16 }}>赛事资料</h2>
      <Space style={{ marginBottom: 16, flexWrap: 'wrap' }}>
        <Select value={contestType} onChange={(v) => { setContestType(v); setPage(1) }} style={{ width: isMobile ? '100%' : 200 }} options={CONTEST_TYPES} />
        <Input.Search placeholder="搜索资料标题" allowClear style={{ width: isMobile ? '100%' : 220 }} onSearch={(v) => { setKeyword(v); setPage(1) }} />
      </Space>

      {q.isLoading ? <Spin /> : (
        paged.length ? (
          <List dataSource={paged} renderItem={(item: NewsVO) => (
            <List.Item>
              <List.Item.Meta
                avatar={item.content?.match(/\.pdf$/i) ? <FilePdfOutlined style={{ fontSize: 32, color: '#ff4d4f' }} /> : <FileZipOutlined style={{ fontSize: 32, color: '#1890ff' }} />}
                title={<a href={fileUrl(item.content)} target="_blank" rel="noreferrer">{item.title}</a>}
                description={<Space><span>{item.description}</span><Tag>{item.createTime?.slice(0, 10)}</Tag></Space>}
              />
              <a href={fileUrl(item.content)} target="_blank" rel="noreferrer"><DownloadOutlined /> 下载</a>
            </List.Item>
          )} />
        ) : <Empty description="暂无赛事资料" />
      )}
      {total > PAGE_SIZE && (
        <div style={{ textAlign: 'right', marginTop: 16 }}>
          <Pagination current={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} showSizeChanger={false} />
        </div>
      )}
    </div>
  )
}
