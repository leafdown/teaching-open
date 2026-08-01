import { useState } from 'react'
import { Form, Upload, Button, Image, Modal, message, Space, Card, Input, Select } from 'antd'
import { UploadOutlined, DownloadOutlined, DeleteOutlined, PlusOutlined, PictureOutlined, FileOutlined } from '@ant-design/icons'
import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
import { fileUrl, uploadFile } from '@/api/common.api'
import type { CrudFormField } from '@/components/crud/CrudList'

export default function Page() {
  const api = crudApi('/teaching/teachingAdditionalWork')
  const [form] = Form.useForm()
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const basicFields: CrudFormField[] = [
    { name: 'workName', label: '作业名称', required: true },
    { name: 'codeType', label: '作业类型' },
    { name: 'workDept', label: '分配班级' },
    { name: 'status', label: '状态' },
  ]

  const upload = async (file: File, biz: string): Promise<string> => {
    if (file.size > 10 * 1024 * 1024) {
      message.warning('文件超过 10MB，上传可能失败，建议压缩后重试')
    }
    const ext = file.name.split('.').pop() || ''
    const res = await uploadFile(file, `${Date.now()}.${ext}`, biz)
    return res.key || res.url || ''
  }

  // 通用文件列表管理组件
  function FileListField({ label, fieldName, record }: {
    label: string; fieldName: string; record: any
  }) {
    const initVal = record?.[fieldName] || ''
    const initFiles = initVal ? initVal.split(',').filter(Boolean) : []
    const [files, setFiles] = useState<string[]>(initFiles)
    const [uloading, setUloading] = useState(false)

    return (
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontWeight: 500, fontSize: 13 }}><FileOutlined /> {label}</span>
          <Upload beforeUpload={async (file) => {
            setUloading(true)
            try {
              const path = await upload(file, 'additional-work')
              setFiles(prev => { const n = [...prev, path]; form.setFieldsValue({ [fieldName]: n.join(',') }); return n })
            } catch { message.error('上传失败') } finally { setUloading(false) }
            return false
          }} showUploadList={false}>
            <Button size="small" icon={<PlusOutlined />} loading={uloading}>上传</Button>
          </Upload>
        </div>
        {files.length === 0 ? (
          <div style={{ color: '#999', fontSize: 12, padding: '8px 0' }}>暂无文件</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {files.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 6 }}>
                <FileOutlined style={{ color: '#1890ff', fontSize: 14 }} />
                <span style={{ flex: 1, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.split('/').pop()}</span>
                <a href={fileUrl(f)} target="_blank" rel="noreferrer"><DownloadOutlined title="下载" style={{ color: '#52c41a' }} /></a>
                <DeleteOutlined style={{ color: '#ff4d4f', cursor: 'pointer' }} title="删除" onClick={() => {
                  const next = files.filter((_, j) => j !== i)
                  setFiles(next); form.setFieldsValue({ [fieldName]: next.join(',') })
                }} />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // 封面上传组件
  function CoverField({ existingCover }: { existingCover: string }) {
    const [localCoverFile, setLocalCoverFile] = useState<File | null>(null)
    const previewUrl = localCoverFile ? URL.createObjectURL(localCoverFile) : existingCover

    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ width: 140, height: 90, background: '#f5f5f5', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid #e8e8e8' }}>
          {previewUrl ? (
            <Image src={previewUrl} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          ) : (
            <PictureOutlined style={{ fontSize: 28, color: '#ccc' }} />
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Upload beforeUpload={(f) => { setCoverFile(f); setLocalCoverFile(f); return false }} showUploadList={false} accept="image/*">
            <Button icon={<UploadOutlined />}>{existingCover ? '替换封面' : '上传封面'}</Button>
          </Upload>
          {existingCover && (
            <Button danger onClick={() => { setCoverFile(null); setLocalCoverFile(null); form.setFieldsValue({ workCover: '' }) }}>
              删除封面
            </Button>
          )}
          <span style={{ fontSize: 11, color: '#999' }}>支持 JPG/PNG/GIF，建议 16:9 比例</span>
        </div>
      </div>
    )
  }

  const renderForm = (record: any | null, onOk: (vals: any) => Promise<void>, onCancel: () => void) => {
    const isEdit = !!record
    const existingCover = isEdit && record.workCover ? fileUrl(record.workCover) : ''

    return (
      <Modal title={isEdit ? '编辑班级作业' : '新增班级作业'} open onCancel={onCancel} width={800}
        onOk={async () => {
          try {
            const vals = await form.validateFields()
            let workCover = record?.workCover || ''
            if (coverFile) { workCover = await upload(coverFile, 'additional-work-cover'); setCoverFile(null) }
            await onOk({ ...vals, workCover })
          } catch { /* validation error */ }
        }} destroyOnClose>
        <Form form={form} layout="vertical" initialValues={record || {}} preserve={false}>
          {/* 基本信息分组 */}
          <Card title="基本信息" size="small" style={{ marginBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              {basicFields.map(f => (
                <Form.Item key={f.name} name={f.name} label={f.label}
                  rules={f.required ? [{ required: true, message: `请输入${f.label}` }] : []}>
                  {f.type === 'select' ? <Select options={f.options} /> :
                   f.type === 'number' ? <Input type="number" /> : <Input />}
                </Form.Item>
              ))}
            </div>
          </Card>

          {/* 封面分组 */}
          <Card title={<><PictureOutlined /> 封面</>} size="small" style={{ marginBottom: 16 }}>
            <CoverField existingCover={existingCover} />
          </Card>

          {/* 作业文件分组 */}
          <Card title={<><FileOutlined /> 作业文件</>} size="small" style={{ marginBottom: 16 }}>
            <FileListField label="文件" fieldName="workUrl" record={record} />
          </Card>

          {/* 描述分组 */}
          <Card title="描述" size="small">
            <Form.Item name="workDesc">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Card>
        </Form>
      </Modal>
    )
  }

  return <CrudList
    urls={{ list: '/teaching/teachingAdditionalWork/list', delete: '/teaching/teachingAdditionalWork/delete', deleteBatch: '/teaching/teachingAdditionalWork/deleteBatch', exportXls: '/teaching/teachingAdditionalWork/exportXls', importExcel: '/teaching/teachingAdditionalWork/importExcel' }}
    title="班级作业"
    hideEdit
    renderForm={renderForm}
    columns={[{title:'作业名称',dataIndex:'workName'},{title:'类型',dataIndex:'codeType_dictText'},{title:'描述',dataIndex:'workDesc'},{title:'分配班级',dataIndex:'workDept_dictText'},{title:'状态',dataIndex:'status_dictText'},{title:'创建时间',dataIndex:'createTime'}]}
    fields={[]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
