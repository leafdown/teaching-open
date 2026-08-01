import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button, Spin, Typography, Divider } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { newsDetail } from '@/api/news.api'
import { SafeHtml } from '@/utils/safe-html'
import { contentWrapper } from '@/utils/responsive-utils'

const { Title, Text } = Typography

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()

  const { data: news, isLoading } = useQuery({
    queryKey: ['newsDetail', id],
    queryFn: () => newsDetail(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 48 }}>
        <Spin />
      </div>
    )
  }

  return (
    <div style={contentWrapper}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => nav(-1)}
        style={{ marginBottom: 16 }}
      >
        返回
      </Button>

      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <Title level={2}>{news?.title}</Title>
        <Text type="secondary">本文发布于：{news?.createTime}</Text>
      </div>

      <Divider />

      <SafeHtml
        html={news?.content || ''}
        style={{
          lineHeight: 1.8,
          overflow: 'auto',
          padding: '0 8px',
        }}
      />
    </div>
  )
}
