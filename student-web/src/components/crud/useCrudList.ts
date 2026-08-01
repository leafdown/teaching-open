import { useState, useCallback, useRef } from 'react'
import { message, Modal } from 'antd'
import { getAction, deleteAction, downFile, uploadAction } from '@/api/client'
import { PageResult } from '@/api/types'

export interface CrudUrls {
  list: string
  delete?: string
  deleteBatch?: string
  exportXls?: string
  importExcel?: string
}

export interface CrudOptions<T> {
  urls: CrudUrls
  pageSize?: number
  // 树形列表(无分页,如菜单/部门树)传 true
  isTree?: boolean
  // 列表加载前对 params 处理(追加固定筛选)
  fixedParams?: Record<string, unknown>
}

export function useCrudList<T extends Record<string, any>>(opts: CrudOptions<T>) {
  const { urls, pageSize = 10, isTree = false, fixedParams } = opts
  const [data, setData] = useState<T[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [selectedRows, setSelectedRows] = useState<T[]>([])
  const searchParams = useRef<Record<string, unknown>>({})
  const sorter = useRef<{ column?: string; order?: 'ascend' | 'descend' }>({})

  const loadData = useCallback(async (argPage?: number) => {
    const p = argPage ?? page
    setLoading(true)
    try {
      const params: Record<string, unknown> = { ...fixedParams, ...searchParams.current }
      if (!isTree) { params.pageNo = p; params.pageSize = pageSize }
      // 默认按创建时间倒序(最新的在前面)
      if (sorter.current.column) { params.column = sorter.current.column; params.order = sorter.current.order }
      else { params.column = 'createTime'; params.order = 'descend' }
      const res = isTree ? await getAction<T[]>(urls.list, params) : await getAction<PageResult<T>>(urls.list, params)
      if (isTree) { setData(res as T[]); setTotal((res as T[]).length) }
      else { const r = res as PageResult<T>; setData(r.records || []); setTotal(r.total || 0) }
    } catch (e) {
      console.error('列表加载失败:', e)
    } finally { setLoading(false) }
  }, [page, pageSize, isTree, urls.list, fixedParams])

  const searchQuery = useCallback((vals?: Record<string, unknown>) => {
    if (vals) searchParams.current = vals
    setPage(1); loadData(1)
  }, [loadData])

  const searchReset = useCallback(() => {
    searchParams.current = {}; setPage(1); loadData(1)
  }, [loadData])

  const handleTableChange = useCallback((pag: any, _filters: any, sort: any) => {
    setPage(pag.current || 1)
    if (sort.field) sorter.current = { column: sort.field, order: sort.order }
    else sorter.current = {}
    loadData(pag.current)
  }, [loadData])

  const onSelectChange = useCallback((keys: React.Key[], rows: T[]) => {
    setSelectedKeys(keys); setSelectedRows(rows)
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    if (!urls.delete) return
    await deleteAction(urls.delete!, { id })
    message.success('删除成功'); loadData()
  }, [urls.delete, loadData])

  const batchDelete = useCallback(async () => {
    if (!urls.deleteBatch || !selectedKeys.length) return
    Modal.confirm({
      title: '确认批量删除', content: `将删除 ${selectedKeys.length} 条数据`, onOk: async () => {
        await deleteAction(urls.deleteBatch!, { ids: selectedKeys.join(",") })
        message.success('删除成功'); setSelectedKeys([]); loadData()
      }
    })
  }, [urls.deleteBatch, selectedKeys, loadData])

  const handleExportXls = useCallback(async (fileName?: string) => {
    if (!urls.exportXls) return
    const params = { ...fixedParams, ...searchParams.current }
    await downFile(urls.exportXls, params, fileName || '导出.xls')
    message.success('导出成功')
  }, [urls.exportXls, fixedParams])

  const handleImportExcel = useCallback(async (file: File) => {
    if (!urls.importExcel) return false
    try {
      await uploadAction(urls.importExcel.startsWith('/') ? urls.importExcel : '/' + urls.importExcel, file)
      message.success('导入成功'); loadData()
    } catch { /* 拦截器已报错 */ }
    return false
  }, [urls.importExcel, loadData])

  return {
    data, total, page, loading, selectedKeys, selectedRows,
    loadData, searchQuery, searchReset, handleTableChange, onSelectChange,
    handleDelete, batchDelete, handleExportXls, handleImportExcel,
    rowSelection: { selectedRowKeys: selectedKeys, onChange: onSelectChange }
  }
}
