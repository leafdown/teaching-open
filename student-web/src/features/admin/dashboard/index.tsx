// 管理后台首页看板(对齐旧 dashboard/Index.vue 的统计卡 + 访问图表)
// 数据来自 /sys/loginfo 与 /sys/visitInfo(jeecg 约定)
import { useQuery } from '@tanstack/react-query'
import { Row, Col, Card, Spin, Empty } from 'antd'
import { Line, Pie } from '@ant-design/charts'
import { getLoginfo, getVisitInfo } from '@/api/report.api'

export default function Dashboard() {
  const logQ = useQuery({ queryKey: ['loginfo'], queryFn: getLoginfo, retry: false })
  const visitQ = useQuery({ queryKey: ['visitInfo'], queryFn: getVisitInfo, retry: false })

  const log = logQ.data || {}
  // jeecg /sys/loginfo 常见字段:todayIpCount/todayVisitCount/totalVisitCount
  const stats = [
    { label: '今日 IP', value: log.todayIpCount ?? 0 },
    { label: '今日访问', value: log.todayVisitCount ?? 0 },
    { label: '总访问量', value: log.totalVisitCount ?? 0 },
    { label: '在线用户', value: log.userCount ?? 0 },
  ]

  // 访问来源/浏览器分布:兼容数组或对象
  const visit = visitQ.data
  const pieData: { type: string; value: number }[] = Array.isArray(visit)
    ? visit.map((v) => ({ type: String(v.type ?? '未知'), value: Number(v.count ?? 0) }))
    : visit ? Object.entries(visit).map(([k, v]) => ({ type: k, value: Number(v as number ?? 0) })) : []

  // 近期访问趋势(后端若无直接序列,用今日/总量合成示意,真实序列待接口提供)
  const lineData = [
    { date: '今日', value: log.todayVisitCount ?? 0, series: '访问' },
    { date: '累计', value: log.totalVisitCount ?? 0, series: '访问' },
  ]

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>数据看板</h2>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        {stats.map((s) => (
          <Col key={s.label} span={6}>
            <Card><div style={{ textAlign: 'center' }}><div style={{ color: '#666' }}>{s.label}</div><h2 style={{ margin: '8px 0 0' }}>{logQ.isLoading ? <Spin /> : s.value}</h2></div></Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16}>
        <Col span={14}>
          <Card title="访问趋势">
            {logQ.isLoading ? <Spin /> : lineData.some((d) => d.value > 0)
              ? <Line height={280} data={lineData} xField="date" yField="value" colorField="series" />
              : <Empty description="暂无访问数据" style={{ paddingTop: 60 }} />}
          </Card>
        </Col>
        <Col span={10}>
          <Card title="访问来源分布">
            {visitQ.isLoading ? <Spin /> : pieData.length
              ? <Pie height={280} data={pieData} angleField="value" colorField="type" legend={{ color: { position: 'right' } }} />
              : <Empty description="暂无来源数据" style={{ paddingTop: 60 }} />}
          </Card>
        </Col>
      </Row>
    </div>
  )
}
