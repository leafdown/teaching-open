// 教学报表 / 后台看板数据接口(对齐旧 TeacherReport.vue 与 dashboard)
import { getAction } from './client'

// 教师/平台汇总报表 GET /teaching/teachingDepartDayLog/getReport
// 返回 unitOpenCount / courseWorkAssignCount / additionalWorkAssignCount /
//      courseWorkSubmitCount / additionalWorkSubmitCount /
//      courseWorkCorrectCount / additionalWorkCorrectCount
export function getReport(params: { startTime: string; endTime: string }) {
  return getAction<Record<string, number>>('/teaching/teachingDepartDayLog/getReport', params)
}

// 按部门(班级)分组 GET /teaching/teachingDepartDayLog/getReportGroupByDepart
export function getReportGroupByDepart(params: { startTime: string; endTime: string }) {
  return getAction<DepartReport[]>('/teaching/teachingDepartDayLog/getReportGroupByDepart', params)
}

// 按月分组 GET /teaching/teachingDepartDayLog/getReportGroupByMonth
export function getReportGroupByMonth(params: { startTime: string; endTime: string }) {
  return getAction<MonthReport[]>('/teaching/teachingDepartDayLog/getReportGroupByMonth', params)
}

export interface DepartReport {
  departId: string
  departName: string
  unitOpenCount: number
  courseWorkAssignCount: number
  additionalWorkAssignCount: number
  courseWorkSubmitCount: number
  additionalWorkSubmitCount: number
  courseWorkCorrectCount: number
  additionalWorkCorrectCount: number
}

export interface MonthReport {
  createTime: string // 形如 2024-03-xx
  unitOpenCount: number
  courseWorkAssignCount: number
  additionalWorkAssignCount: number
}

// ===== dashboard 看板 =====
// 访问日志统计 GET /sys/loginfo (jeecg 约定:今日访问/IP/访问量等)
export function getLoginfo() {
  return getAction<Record<string, number>>('/sys/loginfo')
}

// 访问来源/浏览器分布 GET /sys/visitInfo
export function getVisitInfo() {
  return getAction<{ type?: string; count?: number }[] | Record<string, unknown>>('/sys/visitInfo')
}
