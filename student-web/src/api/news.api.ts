import { getAction } from './client'
import { PageResult } from './types'

export interface NewsVO {
  id: string
  title?: string
  description?: string
  content?: string
  createTime?: string
  cmsType?: string
  [k: string]: unknown
}

// 资讯列表 GET /teaching/teachingNews/newsList
// 后端可能返回数组或分页 {records,total},用 union 类型,调用方归一化
export function newsList(params: { pageSize?: number; cmsStatus?: number; cmsType?: string }) {
  return getAction<NewsVO[] | PageResult<NewsVO>>('/teaching/teachingNews/newsList', { pageSize: 999, cmsStatus: 1, ...params })
}

// 资讯详情 GET /teaching/teachingNews/newsDetail
export function newsDetail(id: string) {
  return getAction<NewsVO>('/teaching/teachingNews/newsDetail', { id })
}

// 归一化为数组
export function toNewsArray(data: NewsVO[] | PageResult<NewsVO> | undefined): NewsVO[] {
  if (!data) return []
  if (Array.isArray(data)) return data
  return data.records || []
}
