import { Modal, Form, Input, InputNumber, Select } from 'antd'
import { useEffect, useRef } from 'react'
import { CrudFormField } from './CrudList'
import RichEditor from '@/components/editor/RichEditor'

interface Props {
  open: boolean; title: string; fields: CrudFormField[]
  form: any; saving: boolean; pendingRecord?: any
  width?: number
  onCancel: () => void; onOk: () => void
}
export default function CrudModal({ open, title, fields, form, saving, pendingRecord, width = 600, onCancel, onOk }: Props) {
  const hasSetValue = useRef(false)

  useEffect(() => { if (!open) hasSetValue.current = false }, [open])

  return (
    <Modal open={open} title={title} onCancel={onCancel} onOk={onOk} confirmLoading={saving} destroyOnClose width={width}
      afterOpenChange={(visible) => {
        if (visible && pendingRecord && !hasSetValue.current) {
          hasSetValue.current = true
          requestAnimationFrame(() => {
            form.resetFields()
            requestAnimationFrame(() => form.setFieldsValue(pendingRecord))
          })
        }
      }}
    >
      <Form form={form} layout="vertical" preserve={false}>
        {fields.map(f => (
          <Form.Item key={f.name} name={f.name} label={f.label} valuePropName={f.type === 'textarea' ? 'value' : 'value'}
            rules={f.rules || (f.required ? [{ required: true, message: `请输入${f.label}` }] : undefined)}>
            {f.type === 'richtext' ? <RichEditor height={260} /> :
             f.type === 'textarea' ? <Input.TextArea rows={3} /> :
             f.type === 'number' ? <InputNumber style={{ width: '100%' }} /> :
             f.type === 'select' ? <Select options={f.options} /> : <Input />}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  )
}
