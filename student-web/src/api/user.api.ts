import { getAction, putAction } from './client'

export interface StudentUserVO {
  id: string
  username?: string
  realname?: string
  avatar?: string
  birthday?: string
  sex?: number
  email?: string
  phone?: string
  [k: string]: unknown
}

// 当前用户信息 GET /teaching/user/info
export function getMyInfo() {
  return getAction<StudentUserVO>('/teaching/user/info')
}

// 编辑用户 PUT /teaching/user/edit
export function editMyInfo(data: Partial<StudentUserVO>) {
  return putAction('/teaching/user/edit', data)
}
