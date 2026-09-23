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
// 访问日志统计 GET /sys/loginfo → { totalVisitCount, todayVisitCount, todayIp }
export function getLoginfo() {
  return getAction<Record<string, number>>('/sys/loginfo')
}

// 按天访问统计 GET /sys/visitInfo → [{ tian: '2026-09-19', ip: 1, visit: 6, type: '09-19' }]
export interface VisitDayStat { tian?: string; type?: string; ip?: number; visit?: number }
export function getVisitInfo() {
  return getAction<VisitDayStat[]>('/sys/visitInfo')
}
