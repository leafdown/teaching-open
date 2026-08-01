import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Card, List, Pagination, Typography, Empty, Spin } from 'antd'
import { newsList, toNewsArray, NewsVO } from '@/api/news.api'
import { contentWrapper } from '@/utils/responsive-utils'

const { Title } = Typography
const PAGE_SIZE = 10

export default function NewsList() {
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const cmsType = searchParams.get('type') || undefined
  const [page, setPage] = useState(1)

  const { data: news, isLoading } = useQuery({
    queryKey: ['newsList', cmsType],
    queryFn: () => newsList({ cmsType }),
  })

  const list: NewsVO[] = toNewsArray(news)
  const total = list.length
  const pagedData = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div style={contentWrapper}>
      <Title level={3}>资讯</Title>
      <Card bordered={false}>
        {isLoading && <div style={{ textAlign: 'center', padding: 48 }}><Spin /></div>}
        {!isLoading && list.length === 0 && <Empty description="暂无资讯" />}
        {list.length > 0 && (
          <>
            <List itemLayout="vertical" dataSource={pagedData} renderItem={(item: NewsVO) => (
              <List.Item style={{ cursor: 'pointer', padding: '16px 0' }} onClick={() => nav(`/news/${item.id}`)}>
                <List.Item.Meta title={<span style={{ fontSize: 16, fontWeight: 600 }}>{item.title}</span>} description={item.description} />
                <div style={{ color: '#999', fontSize: 13 }}>发布时间：{item.createTime}</div>
              </List.Item>
            )} />
            <div style={{ textAlign: 'right', marginTop: 16 }}>
              <span style={{ marginRight: 16, color: '#999', fontSize: 13 }}>共 {total} 篇</span>
              <Pagination current={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} showSizeChanger={false} />
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
