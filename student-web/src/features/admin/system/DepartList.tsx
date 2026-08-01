import { useState } from 'react'
import { Form, Input, Select, Upload, Button, Image, Modal, Card } from 'antd'
import { UploadOutlined, PictureOutlined } from '@ant-design/icons'
import CrudList from '@/components/crud/CrudList'
import { crudApi } from '@/api/system.api'
import { fileUrl, uploadFile } from '@/api/common.api'
import type { CrudFormField } from '@/components/crud/CrudList'

export default function DepartList() {
  const api = crudApi('/sys/sysDepart')
  const [form] = Form.useForm()
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const basicFields: CrudFormField[] = [
    { name: 'departName', label: '部门名称', required: true },
    { name: 'parentId', label: '上级部门' },
    { name: 'orgCode', label: '编码' },
    { name: 'orgCategory', label: '类型', type: 'select', options: [{ label: '机构', value: 1 }, { label: '部门', value: 2 }, { label: '班级', value: 3 }] },
    { name: 'isPublic', label: '是否公开', type: 'select', options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
    { name: 'departDesc', label: '简介', type: 'textarea' },
    { name: 'departLink', label: '外链' },
    { name: 'address', label: '地址' },
    { name: 'mobile', label: '手机' },
    { name: 'departOrder', label: '排序', type: 'number' },
  ]

  const renderForm = (record: any | null, onOk: (vals: any) => Promise<void>, onCancel: () => void) => {
    const isEdit = !!record
    const existingCover = isEdit && record.departCover ? fileUrl(record.departCover) : ''

    return (
      <Modal title={isEdit ? '编辑部门' : '新增部门'} open onCancel={onCancel} width={700}
        onOk={async () => {
          try {
            const vals = await form.validateFields()
            let departCover = record?.departCover || ''
            if (coverFile) {
              const ext = coverFile.name.split('.').pop() || ''
              const res = await uploadFile(coverFile, `${Date.now()}.${ext}`, 'depart-cover')
              departCover = res.key || res.url || ''; setCoverFile(null)
            }
            await onOk({ ...vals, departCover })
          } catch { /* validation error */ }
        }} destroyOnClose>
        <Form form={form} layout="vertical" initialValues={record || {}} preserve={false}>
          <Card title="基本信息" size="small" style={{ marginBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              {basicFields.map(f => (
                <Form.Item key={f.name} name={f.name} label={f.label}
                  rules={f.required ? [{ required: true, message: `请输入${f.label}` }] : []}
                  style={f.name === 'departDesc' || f.name === 'address' ? { gridColumn: '1 / -1' } : {}}>
                  {f.type === 'select' ? <Select options={f.options} /> :
                   f.type === 'number' ? <Input type="number" /> :
                   f.type === 'textarea' ? <Input.TextArea rows={2} /> : <Input />}
                </Form.Item>
              ))}
            </div>
          </Card>
          <Card title={<><PictureOutlined /> 封面</>} size="small">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ width: 140, height: 90, background: '#f5f5f5', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid #e8e8e8' }}>
                {coverFile ? <Image src={URL.createObjectURL(coverFile)} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /> :
                 existingCover ? <Image src={existingCover} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /> :
                 <PictureOutlined style={{ fontSize: 28, color: '#ccc' }} />}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Upload beforeUpload={(f) => { setCoverFile(f); return false }} showUploadList={false} accept="image/*">
                  <Button icon={<UploadOutlined />}>{existingCover ? '替换封面' : '上传封面'}</Button>
                </Upload>
                {(existingCover || coverFile) && <Button danger onClick={() => { setCoverFile(null); form.setFieldsValue({ departCover: '' }) }}>删除封面</Button>}
              </div>
            </div>
          </Card>
        </Form>
      </Modal>
    )
  }

  return <CrudList
    urls={{ list: '/sys/sysDepart/queryMyDeptTreeList', delete: '/sys/sysDepart/delete', deleteBatch: '/sys/sysDepart/deleteBatch', exportXls: '/sys/sysDepart/exportXls', importExcel: '/sys/sysDepart/importExcel' }}
    title="部门/机构管理" isTree
    renderForm={renderForm}
    columns={[{title:'部门名称',dataIndex:'departName'},{title:'上级部门',dataIndex:'parentId',render:(v:any,record:any)=>record.parentName||v||'顶级'},{title:'类型',dataIndex:'orgCategory'},{title:'编码',dataIndex:'orgCode'},{title:'手机',dataIndex:'mobile'},{title:'地址',dataIndex:'address'},{title:'排序',dataIndex:'departOrder'}]}
    fields={[]}
    onSave={async (vals, record) => record ? api.edit({ ...record, ...vals }) : api.add(vals)}
  />
}
