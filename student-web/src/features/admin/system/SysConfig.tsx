import { useEffect, useState } from 'react'
import { Tabs, Form, Input, Switch, Button, message, Spin, Row, Col, Select, Upload, Image } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getAllConfigList, saveTenantConfig } from '@/api/system.api'
import { getAction } from '@/api/client'
import { uploadQiniu, fileUrl } from '@/api/common.api'
import RichEditor from '@/components/editor/RichEditor'

interface NameId { id: string; roleName?: string; departName?: string; roleCode?: string }

// 图片上传+预览受控组件:value 存存储相对 key(与 getFileAccessHttpUrl 消费方式一致),
// 上传后自动把新 key 通过 onChange 回传,界面显示 qiniuDomain 拼接的预览图。
function ImageUpload({ value, onChange }: { value?: string; onChange?: (v: string) => void }) {
  const [err, setErr] = useState('')
  const handleUpload = async (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase() || 'png'
    const key = `logo/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`
    try {
      await uploadQiniu(file, key)
      onChange?.(key)
      setErr('')
    } catch (e) {
      setErr(String(e))
      message.error('Logo 上传失败')
    }
  }
  const previewUrl = value ? fileUrl(value) : ''
  return (
    <div>
      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={(file) => {
          handleUpload(file as unknown as File)
          return false
        }}
      >
        <Button icon={<UploadOutlined />}>上传 Logo</Button>
      </Upload>
      {previewUrl && (
        <div style={{ marginTop: 8 }}>
          <Image src={previewUrl} alt="logo" style={{ maxWidth: 160, maxHeight: 60, objectFit: 'contain', border: '1px solid #eee', borderRadius: 4, padding: 4 }} />
        </div>
      )}
      {err ? <div style={{ color: 'red', marginTop: 4 }}>{err}</div> : null}
    </div>
  )
}

export default function SysConfig() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [roles, setRoles] = useState<NameId[]>([])
  const [departs, setDeparts] = useState<NameId[]>([])

  useEffect(() => {
    Promise.all([
      getAllConfigList(),
      getAction<NameId[]>('/sys/role/list', { pageSize: 999 }).then(r => Array.isArray(r) ? r : (r as any)?.records || []).catch(() => []),
      getAction<NameId[]>('/sys/sysDepart/listAll').then(r => Array.isArray(r) ? r : []).catch(() => []),
    ]).then(([list, roleList, departList]) => {
      const obj: Record<string, string> = {}
      ;(list || []).forEach((c) => { obj[c.configKey] = c.configValue })
      // 0/1 数字值 → Switch 的 boolean
      form.setFieldsValue({
        ...obj,
        allowComment: obj.allowComment === '1',
        allowReg: obj.allowReg === '1',
      })
      setRoles(roleList)
      setDeparts(departList)
    }).finally(() => setLoading(false))
  }, [])

  const save = async () => {
    const vals = await form.validateFields()
    setSaving(true)
    try {
      // boolean → '1'/'0',其余原样提交
      const submit: Record<string, string> = {}
      Object.keys(vals).forEach(k => {
        const v = vals[k]
        submit[k] = (typeof v === 'boolean') ? (v ? '1' : '0') : (v ?? '')
      })
      await saveTenantConfig(submit)
      message.success('保存成功')
    } finally { setSaving(false) }
  }

  if (loading) return <Spin />
  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>系统配置</h2>
      <Form form={form} layout="vertical">
        <Tabs items={[
          { forceRender: true, key: 'site', label: '网站配置', children: <Row gutter={16}><Col span={12}><Form.Item name="brandName" label="品牌名称"><Input /></Form.Item><Form.Item name="brandDesc" label="品牌简介"><Input.TextArea /></Form.Item><Form.Item name="logo" label="Logo"><ImageUpload /></Form.Item><Form.Item name="qiniuDomain" label="存储访问域名(素材库/CDN)"><Input placeholder="如 storage.lanqu.vip,留空则用后端配置" /></Form.Item><Form.Item name="footer" label="底部信息"><RichEditor height={200} /></Form.Item></Col></Row> },
          { forceRender: true, key: 'home', label: '前台首页', children: <><Form.Item name="_homeHtml" label="首页富文本"><RichEditor height={300} /></Form.Item><Form.Item name="homeBgColor" label="背景色"><Input /></Form.Item></> },
          { forceRender: true, key: 'admin', label: '后台首页', children: <Form.Item name="_indexHtml" label="后台首页富文本"><RichEditor height={300} /></Form.Item> },
          { forceRender: true, key: 'share', label: '作品分享页', children: <Form.Item name="_workShareHtml" label="分享页富文本"><RichEditor height={300} /></Form.Item> },
          { forceRender: true, key: 'func', label: '功能配置', children: (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="allowComment" label="开放评论" valuePropName="checked"><Switch checkedChildren="开放" unCheckedChildren="关闭" /></Form.Item>
                <Form.Item name="allowReg" label="开放注册" valuePropName="checked"><Switch checkedChildren="开放" unCheckedChildren="关闭" /></Form.Item>
                <Form.Item name="_defaultRole" label="默认角色"><Select allowClear placeholder="请选择默认角色" options={roles.map(r => ({ label: `${r.roleName} (${r.roleCode})`, value: r.id }))} /></Form.Item>
                <Form.Item name="_defaultDepart" label="默认班级"><Select allowClear placeholder="请选择默认班级" options={departs.map(d => ({ label: d.departName, value: d.id }))} /></Form.Item>
                <Form.Item name="avatar" label="默认头像"><Input /></Form.Item>
              </Col>
            </Row>
          )},
          { forceRender: true, key: 'custom', label: '自定义JS/CSS', children: <><Form.Item name="customJS" label="自定义JS"><Input.TextArea rows={6} /></Form.Item><Form.Item name="customCss" label="自定义CSS"><Input.TextArea rows={6} /></Form.Item></> },
          { forceRender: true, key: 'contact', label: '联系信息', children: <Row gutter={16}><Col span={12}><Form.Item name="_linkman" label="联系人"><Input /></Form.Item><Form.Item name="_phone" label="电话"><Input /></Form.Item><Form.Item name="_address" label="地址"><Input /></Form.Item></Col></Row> },
        ]} />
        <Button type="primary" onClick={save} loading={saving}>保存配置</Button>
      </Form>
    </div>
  )
}
