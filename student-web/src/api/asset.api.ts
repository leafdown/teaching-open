import { getAction } from './client'
import { PageResult } from './types'

export interface AssetVO {
  id: string
  assetType?: number // 1背景 2声音 3造型 4角色
  assetName?: string
  assetData?: string
  md5Ext?: string
  tags?: string
  createBy?: string
  createTime?: string
  [k: string]: unknown
}

// 素材列表 GET /teaching/teachingScratchAssets/list
export function assetList(params: { pageNo: number; pageSize: number; assetType?: number; assetName?: string }) {
  return getAction<PageResult<AssetVO>>('/teaching/teachingScratchAssets/list', params)
}

// 素材详情 GET /teaching/teachingScratchAssets/queryById
export function assetDetail(id: string) {
  return getAction<AssetVO>('/teaching/teachingScratchAssets/queryById', { id })
}

// 素材类型字典
export const ASSET_TYPES = [
  { value: 1, label: '背景', color: '#52c41a' },
  { value: 2, label: '声音', color: '#1890ff' },
  { value: 3, label: '造型', color: '#722ed1' },
  { value: 4, label: '角色', color: '#fa8c16' },
]
