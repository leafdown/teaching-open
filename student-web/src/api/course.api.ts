import { getAction } from './client'
import { PageResult } from './types'

export interface CourseVO {
  id: string
  courseName?: string
  courseCover?: string
  courseIntro?: string
  courseDesc?: string
  teacherName?: string
  showType?: number
  courseMap?: string
  courseCategory?: string
  courseType?: string
  [k: string]: unknown
}
export interface CourseUnitVO {
  id: string
  unitName?: string
  unitVideo?: string
  unitContent?: string
  courseId?: string
  sortNo?: number
  mapX?: number
  mapY?: number
  courseVideo?: string
  courseCase?: string
  courseWorkType?: number
  coursePpt?: string
  coursePlan?: string
  mediaContent?: string
  unitIntro?: string
  videoSource?: number
  [k: string]: unknown
}

// 我的课程 GET /teaching/teachingCourse/mineCourse
export function mineCourse() {
  return getAction<CourseVO[]>('/teaching/teachingCourse/mineCourse')
}

// 推荐/公开课程 GET /teaching/teachingCourse/getHomeCourse
export function getHomeCourse(params: { pageNo: number; pageSize: number; courseType?: string; courseCategory?: string; courseName?: string; orderBy?: string }) {
  return getAction<PageResult<CourseVO>>('/teaching/teachingCourse/getHomeCourse', params)
}

// 课程详情 GET /teaching/teachingCourse/queryById
export function getCourseById(id: string) {
  return getAction<CourseVO>('/teaching/teachingCourse/queryById', { id })
}

// 我的单元 GET /teaching/teachingCourseUnit/mineUnit
export function mineUnit(courseId: string, pageNo = 1, pageSize = 100) {
  return getAction<PageResult<CourseUnitVO>>('/teaching/teachingCourseUnit/mineUnit', { courseId, pageNo, pageSize })
}

// 单元作业信息(IDE 用) GET /teaching/teachingCourseUnit/getUnitWorkInfo
export function getUnitWorkInfo(unitId: string) {
  return getAction<{ workFile?: string; workUrl?: string; courseWorkType?: number }>('/teaching/teachingCourseUnit/getUnitWorkInfo', { unitId })
}

// 单元浏览埋点 GET /teaching/teachingDepartDayLog/unitViewLog
export function unitViewLog(unitId: string) {
  return getAction('/teaching/teachingDepartDayLog/unitViewLog', { unitId })
}
