import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tag, Form, Input, Select, Upload, Button, Image, Modal, message, Space, Collapse, Card } from 'antd'
import { UploadOutlined, DownloadOutlined, DeleteOutlined, PlusOutlined, PictureOutlined, FileOutlined, VideoCameraOutlined, ReadOutlined } from '@ant-design/icons'
import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
import { fileUrl, uploadFile } from '@/api/common.api'
import { useDictOptions, toOptions } from '@/hooks/use-dict-options'
import RichEditor from '@/components/editor/RichEditor'
import type { CrudFormField } from '@/components/crud/CrudList'

export default function Page() {
  const api = crudApi('/teaching/teachingCourseUnit')
  const [params] = useSearchParams()
  const courseId = params.get('courseId') || undefined
  const courseName = params.get('courseName') || ''
  const [form] = Form.useForm()
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const courseWorkTypeOptions = useDictOptions('course_work_type')

  const basicFields: CrudFormField[] = [
    { name: 'unitName', label: '单元名称', required: true },
    { name: 'courseId', label: '课程' },
    { name: 'unitIntro', label: '简介' },
    { name: 'courseWorkType', label: '作业类型', type: 'select', options: toOptions(courseWorkTypeOptions.data) },
    { name: 'orderNum', label: '排序', type: 'number' },
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
  function FileListField({ label, fieldName, icon, accept, record }: {
    label: string; fieldName: string; icon?: React.ReactNode; accept?: string; record: any
  }) {
    const initVal = record?.[fieldName] || ''
    const initFiles = initVal ? initVal.split(',').filter(Boolean) : []
    const [files, setFiles] = useState<string[]>(initFiles)
    const [uloading, setUloading] = useState(false)

    return (
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontWeight: 500, fontSize: 13 }}>{icon} {label}</span>
          <Upload beforeUpload={async (file) => {
            setUloading(true)
            try {
              const path = await upload(file, 'course-unit')
              setFiles(prev => { const n = [...prev, path]; form.setFieldsValue({ [fieldName]: n.join(',') }); return n })
            } catch { message.error('上传失败') } finally { setUloading(false) }
            return false
          }} showUploadList={false} accept={accept}>
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
    const hasCover = !!existingCover || !!localCoverFile

    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
        <div style={{ width: 160, height: 100, background: '#f5f5f5', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid #e8e8e8', flexShrink: 0 }}>
          {previewUrl ? (
            <Image src={previewUrl} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          ) : (
            <PictureOutlined style={{ fontSize: 32, color: '#ccc' }} />
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
          <Upload beforeUpload={(f) => { setCoverFile(f); setLocalCoverFile(f); return false }} showUploadList={false} accept="image/*">
            <Button icon={<UploadOutlined />} style={{ minWidth: 120 }}>{hasCover ? '替换封面' : '上传封面'}</Button>
          </Upload>
          {hasCover && (
            <Button danger onClick={() => { setCoverFile(null); setLocalCoverFile(null); form.setFieldsValue({ unitCover: '' }) }} style={{ minWidth: 120 }}>
              删除封面
            </Button>
          )}
          <span style={{ fontSize: 11, color: '#999', marginTop: 4 }}>建议 16:9 比例</span>
        </div>
      </div>
    )
  }

  const renderForm = (record: any | null, onOk: (vals: any) => Promise<void>, onCancel: () => void) => {
    const isEdit = !!record
    const existingCover = isEdit && record.unitCover ? fileUrl(record.unitCover) : ''

    return (
      <Modal title={isEdit ? '编辑课程单元' : '新增课程单元'} open onCancel={onCancel} width={800}
        onOk={async () => {
          try {
            const vals = await form.validateFields()
            let unitCover = record?.unitCover || ''
            if (coverFile) { unitCover = await upload(coverFile, 'course-cover'); setCoverFile(null) }
            await onOk({ ...vals, unitCover })
          } catch { /* validation error */ }
        }} destroyOnClose>
        <Form form={form} layout="vertical" initialValues={record || {}} preserve={false}>
          {/* 基本信息分组 */}
          <Card title="基本信息" size="small" style={{ marginBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              {/* 课程名称单独显示(只读,不参与表单提交) */}
              <Form.Item label="课程" style={{ gridColumn: '1 / -1' }}>
                <Input disabled value={courseName || record?.courseName || record?.courseId || ''} />
              </Form.Item>
              {basicFields.map(f => (
                <Form.Item key={f.name} name={f.name} label={f.label}
                  rules={f.required ? [{ required: true, message: `请输入${f.label}` }] : []}
                  hidden={f.name === 'courseId'}>
                  {f.name === 'courseId' ? null :
                   f.type === 'select' ? <Select options={f.options} /> :
                   f.type === 'number' ? <Input type="number" /> : <Input />}
                </Form.Item>
              ))}
            </div>
          </Card>

          {/* 封面分组 */}
          <Card title={<><PictureOutlined /> 封面</>} size="small" style={{ marginBottom: 16 }}>
            <CoverField existingCover={existingCover} />
          </Card>

          {/* 教学资源分组 */}
          <Card title={<><FileOutlined /> 教学资源</>} size="small" style={{ marginBottom: 16 }}>
            <FileListField label="课件/文档资料" fieldName="coursePpt" icon={<FileOutlined />} record={record} />
            <FileListField label="教案" fieldName="coursePlan" icon={<ReadOutlined />} record={record} />
            <FileListField label="视频" fieldName="courseVideo" icon={<VideoCameraOutlined />} accept="video/*" record={record} />
            <FileListField label="案例" fieldName="courseCase" icon={<FileOutlined />} record={record} />
          </Card>

          {/* 内容分组 */}
          <Card title="教学内容" size="small">
            <Form.Item name="mediaContent">
              <RichEditor height={300} />
            </Form.Item>
          </Card>
        </Form>
      </Modal>
    )
  }

  return (<>
    {courseId && <div style={{ marginBottom: 12 }}><Tag color="blue">当前课程: {courseName || courseId}</Tag> <a href="/admin/teaching/TeachingCourseUnitList">清除筛选</a></div>}
    <CrudList
      urls={{ list: '/teaching/teachingCourseUnit/list', delete: '/teaching/teachingCourseUnit/delete', deleteBatch: '/teaching/teachingCourseUnit/deleteBatch', exportXls: '/teaching/teachingCourseUnit/exportXls', importExcel: '/teaching/teachingCourseUnit/importExcel' }}
      title="课程单元管理"
      fixedParams={courseId ? { courseId } : undefined}
      renderForm={renderForm}
      columns={[
        {title:'单元名称',dataIndex:'unitName'},{title:'课程',dataIndex:'courseName'},{title:'简介',dataIndex:'unitIntro'},
        {title:'作业类型',dataIndex:'courseWorkType_dictText'},{title:'排序',dataIndex:'orderNum'},
      ]}
      fields={[]}
      onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
    />
  </>)
}
