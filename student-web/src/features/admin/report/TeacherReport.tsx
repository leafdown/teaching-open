// 教师教学数据报表(对齐旧 report/TeacherReport.vue)
// 饼图:布置作业类型分布;多折线:开课节数 vs 作业布置次数;表格:班级统计
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Row, Col, Card, Radio, DatePicker, Table, Spin, Empty, message } from 'antd'
import { Pie, Line } from '@ant-design/charts'
import dayjs from 'dayjs'
import { getReport, getReportGroupByDepart, getReportGroupByMonth, DepartReport, MonthReport } from '@/api/report.api'
import { RESPONSIVE } from '@/utils/responsive-utils'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

const { RangePicker } = DatePicker

type Range = 'day30' | 'day60' | 'day90'

function rangeFor(r: Range): [dayjs.Dayjs, dayjs.Dayjs] {
  const map = { day30: 1, day60: 2, day90: 3 } as const
  return [dayjs().subtract(map[r], 'month'), dayjs()]
}

export default function TeacherReport() {
  const [range, setRange] = useState<Range>('day60')
  const [dates, setDates] = useState<[dayjs.Dayjs, dayjs.Dayjs]>(rangeFor('day60'))
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)

  const params = { startTime: dates[0].format('YYYY-MM-DD'), endTime: dates[1].format('YYYY-MM-DD') }

  const reportQ = useQuery({ queryKey: ['report', params], queryFn: () => getReport(params), retry: false })
  const departQ = useQuery({ queryKey: ['reportDepart', params], queryFn: () => getReportGroupByDepart(params), retry: false })
  const monthQ = useQuery({ queryKey: ['reportMonth', params], queryFn: () => getReportGroupByMonth(params), retry: false })

  const report = reportQ.data || {}
  const assignCourse = report.courseWorkAssignCount || 0
  const assignAdditional = report.additionalWorkAssignCount || 0

  // 饼图数据:随堂作业 vs 自定义作业
  const pieData = [
    { item: '随堂作业', count: assignCourse },
    { item: '自定义作业', count: assignAdditional },
  ]

  // 多折线数据:转长格式 {type, value, series}
  const lineData = (monthQ.data || []).flatMap((m: MonthReport) => [
    { type: m.createTime?.slice(0, 7) || '', value: m.unitOpenCount || 0, series: '开课节数' },
    { type: m.createTime?.slice(0, 7) || '', value: (m.courseWorkAssignCount || 0) + (m.additionalWorkAssignCount || 0), series: '作业布置次数' },
  ])

  const stats = [
    { label: '开课节数', value: report.unitOpenCount || 0 },
    { label: '作业布置次数', value: assignCourse + assignAdditional },
    { label: '作业上交次数', value: (report.courseWorkSubmitCount || 0) + (report.additionalWorkSubmitCount || 0) },
    { label: '作业批改次数', value: (report.courseWorkCorrectCount || 0) + (report.additionalWorkCorrectCount || 0) },
  ]

  const departCols = [
    { title: '班级', dataIndex: 'departName' },
    { title: '开课节数', dataIndex: 'unitOpenCount' },
    { title: '作业布置次数', render: (_: unknown, r: DepartReport) => r.courseWorkAssignCount + r.additionalWorkAssignCount },
    { title: '作业上交次数', render: (_: unknown, r: DepartReport) => r.courseWorkSubmitCount + r.additionalWorkSubmitCount },
    { title: '作业批改数量', render: (_: unknown, r: DepartReport) => r.courseWorkCorrectCount + r.additionalWorkCorrectCount },
  ]

  if (reportQ.isError) message.warning('暂无报表数据')

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>教学数据概览</h2>

      <Radio.Group value={range} buttonStyle="solid" onChange={(e) => { setRange(e.target.value); setDates(rangeFor(e.target.value)) }} style={{ marginBottom: 16 }}>
        <Radio.Button value="day30">最新30天</Radio.Button>
        <Radio.Button value="day60">最新60天</Radio.Button>
        <Radio.Button value="day90">最新90天</Radio.Button>
      </Radio.Group>
      <RangePicker
        value={dates}
        onChange={(v) => { if (v && v[0] && v[1]) { setDates([v[0], v[1]]); setRange('day90' as Range) } }}
        style={{ marginLeft: 16 }}
      />

      <Row gutter={[16, 16]} style={{ margin: '16px 0' }}>
        {stats.map((s) => (
          <Col key={s.label} {...RESPONSIVE.col2}>
            <Card><div style={{ textAlign: 'center' }}><div style={{ color: '#666' }}>{s.label}</div><h2 style={{ margin: '8px 0 0' }}>{reportQ.isLoading ? <Spin /> : s.value}</h2></div></Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title="布置作业类型分布">
            {pieData.some((d) => d.count > 0)
              ? <Pie height={250} data={pieData} angleField="count" colorField="item" legend={{ color: { position: 'right' } }} />
              : <Empty description="暂无数据" style={{ paddingTop: 60 }} />}
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card title="开课节数 / 作业布置次数">
            {lineData.length
              ? <Line height={250} data={lineData} xField="type" yField="value" colorField="series" shapeField="series" legend={{ color: { position: 'top' } }} />
              : <Empty description="暂无数据" style={{ paddingTop: 60 }} />}
          </Card>
        </Col>
      </Row>

      <Card title="班级教学数据统计" style={{ marginTop: 16 }}>
        <Table
          dataSource={departQ.data || []}
          columns={departCols}
          rowKey="departId"
          pagination={{ pageSize: 100 }}
          loading={departQ.isLoading}
          size="middle"
        />
      </Card>
    </div>
  )
}
