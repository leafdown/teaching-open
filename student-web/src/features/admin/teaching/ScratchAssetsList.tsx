import { useState } from 'react'
import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
import { fileUrl, uploadFile } from '@/api/common.api'
import { Modal, Image, message, Space, Form, Input, Select, Upload, Button } from 'antd'
import { EyeOutlined, SoundOutlined, UploadOutlined } from '@ant-design/icons'
import type { CrudFormField } from '@/components/crud/CrudList'

export default function Page() {
  const api = crudApi('/teaching/teachingScratchAssets')
  const [preview, setPreview] = useState<any>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadFileState, setUploadFileState] = useState<File | null>(null)
  const [form] = Form.useForm()

  const ASSET_TYPE_NAMES: Record<number, string> = { 1: '背景', 2: '声音', 3: '造型', 4: '角色' }

  // 渲染预览列(角色 type=4 可能有多个逗号分隔的图片)
  const renderPreview = (v: string, record: any) => {
    if (!v) return <span style={{ color: '#ccc' }}>无文件</span>
    const parts = v.split(',').filter(Boolean)
    const type = record?.assetType
    if (type === 2) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <SoundOutlined style={{ color: '#1890ff' }} />
          <a onClick={() => setPreview(record)}>播放</a>
        </div>
      )
    }
    if (parts.length > 1) {
      return (
        <div style={{ display: 'flex', gap: 2 }}>
          {parts.slice(0, 3).map((p, i) => (
            <Image key={i} src={fileUrl(p)} alt=""
              style={{ width: 28, height: 28, objectFit: 'contain', cursor: 'pointer', border: '1px solid #f0f0f0', borderRadius: 2 }}
              preview={{ mask: <EyeOutlined style={{ fontSize: 10 }} /> }} />
          ))}
          {parts.length > 3 && <span style={{ fontSize: 10, color: '#999', alignSelf: 'center' }}>+{parts.length - 3}</span>}
        </div>
      )
    }
    return (
      <Image src={fileUrl(v)} alt="" style={{ maxWidth: 60, maxHeight: 40, objectFit: 'contain', cursor: 'pointer' }}
        preview={{ mask: <EyeOutlined /> }} />
    )
  }

  const fields: CrudFormField[] = [
    { name: 'assetType', label: '类型', type: 'select', required: true, options: [{ label: '背景', value: 1 }, { label: '声音', value: 2 }, { label: '造型', value: 3 }, { label: '角色', value: 4 }] },
    { name: 'assetName', label: '名称', required: true },
    { name: 'tags', label: '标签' },
  ]

  // 自定义新增/编辑表单(带文件上传)
  const renderForm = (record: any | null, onOk: (vals: any) => Promise<void>, onCancel: () => void) => {
    const isEdit = !!record
    return (
      <Modal title={isEdit ? '编辑素材' : '新增素材'} open onCancel={onCancel} onOk={async () => {
        try {
          const vals = await form.validateFields()
          let md5Ext = record?.md5Ext || ''
          if (uploadFileState) {
            const ext = uploadFileState.name.split('.').pop() || ''
            const res = await uploadFile(uploadFileState, `${Date.now()}.${ext}`, 'scratch-assets')
            md5Ext = res.key || res.url || ''
          }
          await onOk({ ...vals, md5Ext })
          setUploadFileState(null)
        } catch (e) { /* form validation error */ }
      }} width={500} destroyOnClose>
        <Form form={form} layout="vertical" initialValues={record || {}} preserve={false}>
          {fields.map(f => (
            <Form.Item key={f.name} name={f.name} label={f.label}
              rules={f.required ? [{ required: true, message: `请选择${f.label}` }] : []}>
              {f.type === 'select' ? <Select options={f.options} placeholder={`请选择${f.label}`} /> : <Input placeholder={`请输入${f.label}`} />}
            </Form.Item>
          ))}
          <Form.Item label="文件">
            <Upload beforeUpload={(file) => { setUploadFileState(file); return false }} maxCount={1}
              onRemove={() => setUploadFileState(null)} fileList={uploadFileState ? [{ uid: '-1', name: uploadFileState.name, status: 'done' }] : []}>
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
            {record?.md5Ext && !uploadFileState && (
              <div style={{ marginTop: 8 }}>
                {record.assetType === 2 ? (
                  <audio src={fileUrl(record.md5Ext.split(',')[0])} controls style={{ width: '100%' }} />
                ) : (
                  <Image src={fileUrl(record.md5Ext.split(',')[0])} style={{ maxWidth: 200, maxHeight: 150, objectFit: 'contain' }} />
                )}
                <div style={{ color: '#888', fontSize: 12, marginTop: 4 }}>现有文件: {record.md5Ext}</div>
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }

  return (<>
    <CrudList
      urls={{ list: '/teaching/teachingScratchAssets/list', delete: '/teaching/teachingScratchAssets/delete', deleteBatch: '/teaching/teachingScratchAssets/deleteBatch', exportXls: '/teaching/teachingScratchAssets/exportXls', importExcel: '/teaching/teachingScratchAssets/importExcel' }}
      title="Scratch素材"
      hideEdit
      renderForm={renderForm}
      onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
      columns={[
        {title:'预览',dataIndex:'md5Ext',render: renderPreview},
        {title:'类型',dataIndex:'assetType',render:(v:any)=>ASSET_TYPE_NAMES[v]||v},
        {title:'名称',dataIndex:'assetName'},
        {title:'标签',dataIndex:'tags'},
        {title:'创建时间',dataIndex:'createTime'},
      ]}
      fields={[]}
    />
    <Modal title={preview?.assetName || '预览'} open={!!preview} onCancel={() => setPreview(null)} footer={null} destroyOnClose>
      {preview?.md5Ext && (
        preview.assetType === 2 ? (
          <audio src={fileUrl(preview.md5Ext.split(',')[0])} controls style={{ width: '100%' }} />
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {preview.md5Ext.split(',').filter(Boolean).map((p: string, i: number) => (
              <Image key={i} src={fileUrl(p)} alt="" style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }} />
            ))}
          </div>
        )
      )}
    </Modal>
  </>)
}