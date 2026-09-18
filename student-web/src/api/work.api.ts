import { getAction, postAction, deleteAction } from './client'
import { PageResult } from './types'

export interface WorkVO {
  id: string
  workName?: string
  workFile?: string
  workCover?: string
  workType?: number // 1/2=scratch3, 3=scratchjr, 4=python, 10=blockly
  workStatus?: number
  workScene?: string
  createTime?: string
  courseId?: string
  departId?: string
  additionalId?: string
  hasCloudData?: boolean
  workTag?: string
  viewNum?: number // 后端字段名为 viewNum(旧 Vue 同名)
  starNum?: number // 后端字段名为 starNum(旧 Vue 同名)
  // 兼容别名(部分接口可能返回 viewCount/starCount)
  viewCount?: number
  starCount?: number
  teacherComment?: string
  teacherScore?: number
  mineWorkStatus?: number
  workUrl_url?: string
  workFileKey_url?: string
  [k: string]: unknown
}

// 我的作品 GET /teaching/teachingWork/mine
export function mineWorks(params: { pageNo: number; pageSize: number; [k: string]: unknown }) {
  return getAction<PageResult<WorkVO>>('/teaching/teachingWork/mine', params)
}

// 附加作业 GET /teaching/teachingWork/mineAdditionalWork
export function mineAdditionalWork(params: { pageNo: number; pageSize: number; submit?: boolean | string }) {
  return getAction<PageResult<WorkVO>>('/teaching/teachingWork/mineAdditionalWork', params)
}

// 作品榜/用户作品 GET /teaching/teachingWork/leaderboard
export function leaderboard(params: { pageNo: number; pageSize: number; orderBy?: string; workStatus?: number; userId?: string; workType?: number }) {
  return getAction<PageResult<WorkVO>>('/teaching/teachingWork/leaderboard', params)
}

// 作品详情 GET /teaching/teachingWork/studentWorkInfo
export function studentWorkInfo(workId: string) {
  return getAction<WorkVO>('/teaching/teachingWork/studentWorkInfo', { workId })
}

// 点赞 GET /teaching/teachingWork/starWork
// 后端返回 message 区分「点赞成功」/「已点赞」等,故走 __raw 拿完整响应
export function starWork(workId: string) {
  return getAction<{ message?: string }>('/teaching/teachingWork/starWork', { workId }, { __raw: true } as any)
}

// 评论列表 GET /teaching/teachingWork/getWorkComments (返回数组,非分页)
export interface WorkComment { id: string; userId?: string; comment?: string; username?: string; realname?: string; avatar?: string; avatar_url?: string; createTime?: string }
export function getWorkComments(workId: string, page: number) {
  return getAction<WorkComment[]>('/teaching/teachingWork/getWorkComments', { workId, page })
}

// 发表评论 POST /teaching/teachingWork/saveComment
export function saveComment(workId: string, comment: string) {
  return postAction('/teaching/teachingWork/saveComment', { workId, comment })
}

// 删除评论 POST /teaching/teachingWork/deleteComment(仅评论作者本人或 admin 可删)
export function deleteComment(id: string) {
  return postAction('/teaching/teachingWork/deleteComment', { id })
}

// 作者信息 GET /teaching/teachingWork/userInfo
export function workUserInfo(userId: string) {
  return getAction<{ id: string; realname?: string; username?: string; avatar?: string; sign?: string; school?: string }>('/teaching/teachingWork/userInfo', { userId })
}

// 标签列表 GET /teaching/teachingWork/getWorkTags
export function getWorkTags() {
  return getAction<string[]>('/teaching/teachingWork/getWorkTags')
}

// 设置标签 GET /teaching/teachingWork/setWorkTag
export function setWorkTag(workId: string, workTag: string) {
  return getAction('/teaching/teachingWork/setWorkTag', { workId, workTag })
}

// 删标签 DELETE /teaching/teachingWork/delWorkTag
export function delWorkTag(tag: string, force?: boolean) {
  return deleteAction('/teaching/teachingWork/delWorkTag', { tag, force })
}

// 提交作业 POST /teaching/teachingWork/submit
export interface SubmitWorkPayload {
  id?: string
  courseId?: string
  workCover?: string
  workFile?: string
  workName?: string
  workType: number
  workStatus: number
  departId?: string
  additionalId?: string
  workScene?: string
  hasCloudData?: boolean
}
export function submitWork(payload: SubmitWorkPayload) {
  return postAction<{ id: string }>('/teaching/teachingWork/submit', payload)
}

// 删除作品 DELETE /teaching/teachingWork/delete
export function deleteWork(id: string) {
  return deleteAction('/teaching/teachingWork/delete', { id })
}

// 批量删除 DELETE /teaching/teachingWork/deleteBatch
export function deleteBatchWork(ids: string) {
  return deleteAction('/teaching/teachingWork/deleteBatch', { ids })
}

// 发送作品给学生 POST /teaching/teachingWork/sendWork
export function sendWorkToUsers(sendWorkId: string, userIdList: string[]) {
  return postAction<{ count: number }>('/teaching/teachingWork/sendWork', { sendWorkId, userIdList })
}
