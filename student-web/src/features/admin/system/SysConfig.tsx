import { useEffect, useState } from 'react'
import { Tabs, Form, Input, Switch, Button, message, Spin, Row, Col } from 'antd'
import { getAllConfigList, saveTenantConfig } from '@/api/system.api'
import RichEditor from '@/components/editor/RichEditor'

export default function SysConfig() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  useEffect(() => {
    getAllConfigList().then((list) => {
      const obj: Record<string, string> = {}
      ;(list || []).forEach((c) => { obj[c.configKey] = c.configValue })
      form.setFieldsValue(obj)
    }).finally(() => setLoading(false))
  }, [])
  const save = async () => {
    const vals = await form.validateFields()
    setSaving(true)
    try { await saveTenantConfig(vals); message.success('保存成功') } finally { setSaving(false) }
  }
  if (loading) return <Spin />
  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>系统配置</h2>
      <Form form={form} layout="vertical">
        <Tabs items={[
          { forceRender: true, key: 'site', label: '网站配置', children: <Row gutter={16}><Col span={12}><Form.Item name="brandName" label="品牌名称"><Input /></Form.Item><Form.Item name="brandDesc" label="品牌简介"><Input.TextArea /></Form.Item><Form.Item name="logo" label="Logo"><Input /></Form.Item><Form.Item name="footer" label="底部信息"><RichEditor height={200} /></Form.Item></Col></Row> },
          { forceRender: true, key: 'home', label: '前台首页', children: <><Form.Item name="_homeHtml" label="首页富文本"><RichEditor height={300} /></Form.Item><Form.Item name="homeBgColor" label="背景色"><Input /></Form.Item></> },
          { forceRender: true, key: 'admin', label: '后台首页', children: <Form.Item name="_indexHtml" label="后台首页富文本"><RichEditor height={300} /></Form.Item> },
          { forceRender: true, key: 'share', label: '作品分享页', children: <Form.Item name="_workShareHtml" label="分享页富文本"><RichEditor height={300} /></Form.Item> },
          { forceRender: true, key: 'func', label: '功能配置', children: <Row gutter={16}><Col span={12}><Form.Item name="allowComment" label="开放评论"><Input placeholder="1开放 0关闭" /></Form.Item><Form.Item name="allowReg" label="开放注册"><Input placeholder="1开放 0关闭" /></Form.Item><Form.Item name="_defaultRole" label="默认角色"><Input /></Form.Item><Form.Item name="_defaultDepart" label="默认班级"><Input /></Form.Item><Form.Item name="avatar" label="默认头像"><Input /></Form.Item></Col></Row> },
          { forceRender: true, key: 'custom', label: '自定义JS/CSS', children: <><Form.Item name="customJS" label="自定义JS"><Input.TextArea rows={6} /></Form.Item><Form.Item name="customCss" label="自定义CSS"><Input.TextArea rows={6} /></Form.Item></> },
          { forceRender: true, key: 'contact', label: '联系信息', children: <Row gutter={16}><Col span={12}><Form.Item name="_linkman" label="联系人"><Input /></Form.Item><Form.Item name="_phone" label="电话"><Input /></Form.Item><Form.Item name="_address" label="地址"><Input /></Form.Item></Col></Row> },
        ]} />
        <Button type="primary" onClick={save} loading={saving}>保存配置</Button>
      </Form>
    </div>
  )
}
