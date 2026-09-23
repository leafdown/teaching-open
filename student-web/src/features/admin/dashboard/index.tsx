// 管理后台首页看板(对齐旧 dashboard/Index.vue 的统计卡 + 访问图表)
// /sys/loginfo → { totalVisitCount, todayVisitCount, todayIp }  (无 userCount 字段)
// /sys/visitInfo → [{ tian: '2026-09-19', ip: 1, visit: 6, type: '09-19' }] 按天统计
import { useQuery } from '@tanstack/react-query'
import { Row, Col, Card, Spin, Empty } from 'antd'
import { Line } from '@ant-design/charts'
import { getLoginfo, getVisitInfo } from '@/api/report.api'

export default function Dashboard() {
  const logQ = useQuery({ queryKey: ['loginfo'], queryFn: getLoginfo, retry: false })
  const visitQ = useQuery({ queryKey: ['visitInfo'], queryFn: getVisitInfo, retry: false })

  const log = logQ.data || {}
  const stats = [
    { label: '今日访问', value: log.todayVisitCount ?? 0 },
    { label: '今日 IP', value: log.todayIp ?? 0 },
    { label: '总访问量', value: log.totalVisitCount ?? 0 },
  ]

  // visitInfo 只返回有访问记录的日期,按时间升序画真实趋势(访问量 + IP 数双序列)
  const days = (Array.isArray(visitQ.data) ? visitQ.data : [])
    .slice()
    .sort((a: any, b: any) => String(a.tian).localeCompare(String(b.tian)))
  const lineData = days.flatMap((d: any) => [
    { date: String(d.type || d.tian), series: '访问量', value: Number(d.visit ?? 0) },
    { date: String(d.type || d.tian), series: 'IP 数', value: Number(d.ip ?? 0) },
  ])

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>数据看板</h2>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        {stats.map((s) => (
          <Col key={s.label} xs={24} sm={8}>
            <Card><div style={{ textAlign: 'center' }}><div style={{ color: '#666' }}>{s.label}</div><h2 style={{ margin: '8px 0 0' }}>{logQ.isLoading ? <Spin /> : s.value}</h2></div></Card>
          </Col>
        ))}
      </Row>

      <Card title="近期访问趋势">
        {visitQ.isLoading ? <Spin /> : lineData.length ? (
          <Line height={280} data={lineData} xField="date" yField="value" colorField="series"
            legend={{ color: { position: 'top' } }} />
        ) : <Empty description="暂无访问数据" style={{ paddingTop: 60 }} />}
      </Card>
    </div>
  )
}
