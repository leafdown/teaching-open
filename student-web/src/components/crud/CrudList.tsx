import { useState, useEffect, useRef, ReactNode } from 'react'
import { Table, Button, Space, Popconfirm, Upload, Form, Input, message, Tooltip } from 'antd'
import { useCrudList } from './useCrudList'
import { CrudUrls } from './useCrudList'
import CrudModal from './CrudModal'

export interface CrudColumn<T> { title: string; dataIndex: string; width?: number; render?: (val: any, record: T) => ReactNode }
export interface CrudFormField { name: string; label: string; type?: 'text' | 'textarea' | 'number' | 'select' | 'richtext'; required?: boolean; options?: { label: string; value: any }[]; rules?: any[] }

interface CrudListProps<T extends Record<string, any>> {
  urls: CrudUrls; columns: CrudColumn<T>[]; fields?: CrudFormField[]
  searchFields?: { name: string; label: string }[]
  title?: string; isTree?: boolean; rowKey?: string
  fixedParams?: Record<string, unknown>
  renderForm?: (record: T | null, onOk: (vals: any) => Promise<void>, onCancel: () => void) => ReactNode
  onSave?: (vals: any, record: T | null) => Promise<void>
  extraActions?: (record: T) => ReactNode
  hideEdit?: boolean
  hideAdd?: boolean
}

export default function CrudList<T extends Record<string, any>>(props: CrudListProps<T>) {
  const { urls, columns, fields = [], searchFields, title = '', isTree, rowKey = 'id', fixedParams, renderForm, onSave, extraActions, hideEdit, hideAdd } = props
  const crud = useCrudList<T>({ urls, isTree, fixedParams })
  // mount 时自动加载列表(等价 JeecgListMixin created 钩子)
  useEffect(() => { crud.loadData(1) }, [crud.loadData])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<T | null>(null)
  const [searchForm] = Form.useForm()
  const [form] = Form.useForm()
  const [saving, setSaving] = useState(false)
  // 编辑时暂存字段值,Modal 渲染后通过 afterOpenChange 设置
  const pendingRecord = useRef<T | null>(null)

  const handleAdd = () => { setEditing(null); form.resetFields(); setModalOpen(true) }
  const handleEdit = (record: T) => {
    setEditing(record)
    pendingRecord.current = record // 暂存, 等 Modal 渲染后设置
    setModalOpen(true)
  }
  const doSave = async (vals: any) => {
    setSaving(true)
    try {
      if (onSave) await onSave(vals, editing)
      else message.warning('未配置保存逻辑(onSave)')
      setModalOpen(false); crud.loadData()
    } finally { setSaving(false) }
  }

  const actionCol = { title: '操作', width: 120, fixed: 'right' as const, render: (_: any, record: T) => (
    <Space size="small">
      {!hideEdit && <Tooltip title="编辑"><a onClick={() => handleEdit(record)}><i className="fas fa-edit" /></a></Tooltip>}
      {urls.delete && <Popconfirm title="确认删除?" onConfirm={() => crud.handleDelete(record[rowKey])}><Tooltip title="删除"><a style={{ color: '#ff4d4f' }}><i className="fas fa-trash-alt" /></a></Tooltip></Popconfirm>}
      {extraActions?.(record)}
    </Space>
  )}

  return (
    <div>
      {title && <h2 style={{ marginBottom: 16 }}>{title}</h2>}
      {searchFields && searchFields.length > 0 && (
        <Form form={searchForm} layout="inline" style={{ marginBottom: 16 }} onFinish={(v) => crud.searchQuery(v)}>
          {searchFields.map(f => <Form.Item key={f.name} name={f.name} label={f.label}><Input allowClear /></Form.Item>)}
          <Space>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button onClick={() => { searchForm.resetFields(); crud.searchReset() }}>重置</Button>
          </Space>
        </Form>
      )}
      <Space style={{ marginBottom: 16 }}>
        {!hideAdd && <Button type="primary" icon={<i className="fas fa-plus" />} onClick={handleAdd}>新增</Button>}
        {urls.deleteBatch && <Button icon={<i className="fas fa-trash-alt" />} disabled={!crud.selectedKeys.length} onClick={crud.batchDelete}>批量删除</Button>}
        {urls.exportXls && <Button icon={<i className="fas fa-file-export" />} onClick={() => crud.handleExportXls()}>导出</Button>}
        {urls.importExcel && <Upload showUploadList={false} beforeUpload={crud.handleImportExcel}><Button icon={<i className="fas fa-file-import" />}>导入</Button></Upload>}
        <Button icon={<i className="fas fa-sync" />} onClick={() => crud.loadData()}>刷新</Button>
      </Space>
      <Table dataSource={crud.data} columns={[...columns, actionCol]} rowKey={rowKey}
        loading={crud.loading} rowSelection={crud.rowSelection}
        pagination={isTree ? false : { current: crud.page, pageSize: 10, total: crud.total, onChange: (p) => crud.loadData(p) }}
        onChange={crud.handleTableChange} size="middle" scroll={{ x: 'max-content' }} />
      {modalOpen && (renderForm ? renderForm(editing, doSave, () => setModalOpen(false)) :
        <CrudModal open={modalOpen} title={editing ? '编辑' : '新增'} fields={fields} form={form} saving={saving}
          pendingRecord={pendingRecord.current}
          width={fields.some(f => f.type === 'richtext') ? 900 : 600} onCancel={() => setModalOpen(false)} onOk={() => form.validateFields().then(doSave)} />)}
    </div>
  )
}
