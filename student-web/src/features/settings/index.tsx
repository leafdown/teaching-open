import { useEffect, useState } from 'react'
import { Form, Input, Button, DatePicker, Radio, Upload, Avatar, message, Spin, Card, Tabs, List, Switch, Modal } from 'antd'
import { UserOutlined, UploadOutlined } from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { getMyInfo, editMyInfo, StudentUserVO } from '@/api/user.api'
import { uploadFile, duplicateCheck, fileUrl } from '@/api/common.api'
import { passwordChange, phoneVerification, sendSms } from '@/api/auth.api'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

// ===== 基础资料 =====
function BaseSetting({ form, q, save }: { form: any; q: any; save: any }) {
  const avatar = Form.useWatch('avatar', form)
  const beforeUpload = async (file: File) => {
    const res = await uploadFile(file, file.name, 'avatar')
    form.setFieldValue('avatar', res.url)
    return false
  }

  return (
    <Form form={form} layout="vertical" onFinish={(v) => save.mutate(v)}>
      <Form.Item label="头像">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar size={64} src={avatar ? fileUrl(avatar) : undefined} icon={<UserOutlined />} />
          <Upload showUploadList={false} beforeUpload={beforeUpload}>
            <Button icon={<UploadOutlined />}>更换头像</Button>
          </Upload>
        </div>
        <Form.Item name="avatar" hidden><Input /></Form.Item>
      </Form.Item>
      <Form.Item name="realname" label="真实姓名" rules={[{ required: true, message: '请输入真实姓名' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="birthday" label="生日"><DatePicker style={{ width: '100%' }} /></Form.Item>
      <Form.Item name="sex" label="性别"><Radio.Group><Radio value={1}>男</Radio><Radio value={2}>女</Radio></Radio.Group></Form.Item>
      <Form.Item name="email" label="邮箱" rules={[
        { type: 'email', message: '邮箱格式不正确' },
        { validator: async (_, v) => { if (!v) return; const r = await duplicateCheck('sys_user', 'email', v, q.data?.id); if (r && (r as any).status === '0') throw new Error('邮箱已被占用') } }
      ]}><Input /></Form.Item>
      <Form.Item name="phone" label="手机号" rules={[
        { pattern: /^1\d{10}$/, message: '手机号格式不正确' },
        { validator: async (_, v) => { if (!v) return; const r = await duplicateCheck('sys_user', 'phone', v, q.data?.id); if (r && (r as any).status === '0') throw new Error('手机号已被占用') } }
      ]}><Input /></Form.Item>
      <Button type="primary" htmlType="submit" loading={save.isPending}>保存</Button>
    </Form>
  )
}

// ===== 安全设置 =====
function SecuritySetting() {
  const [modal, setModal] = useState<'password' | null>(null)
  const [pwForm] = Form.useForm()
  const [phoneCodeSent, setPhoneCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const changePw = useMutation({
    mutationFn: (v: any) => passwordChange(v.username, v.newPassword, v.smscode, v.phone),
    onSuccess: () => { message.success('密码修改成功'); setModal(null); pwForm.resetFields() }
  })

  const sendCode = async () => {
    const phone = pwForm.getFieldValue('phone')
    if (!phone || !/^1\d{10}$/.test(phone)) { message.warning('请先输入正确的手机号'); return }
    await sendSms(phone, '2')
    setPhoneCodeSent(true); setCountdown(60)
    const timer = setInterval(() => { setCountdown(v => { if (v <= 1) { clearInterval(timer); return 0 }; return v - 1 }) }, 1000)
  }

  const items = [
    { title: '账户密码', description: '修改登录密码', actions: { title: '修改', callback: () => setModal('password') } },
    { title: '密保手机', description: '绑定手机号用于找回密码', actions: { title: '绑定', callback: () => message.info('手机绑定请到基础资料页修改') } },
  ]

  return (
    <div>
      <List dataSource={items} renderItem={(item: any) => (
        <List.Item actions={[<a key="action" onClick={item.actions.callback}>{item.actions.title}</a>]}>
          <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
      )} />

      <Modal title="修改密码" open={modal === 'password'} onCancel={() => setModal(null)} onOk={() => pwForm.submit()} destroyOnClose>
        <Form form={pwForm} layout="vertical" onFinish={(v) => changePw.mutate(v)}>
          <Form.Item name="username" label="用户名" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="phone" label="手机号" rules={[{ required: true, pattern: /^1\d{10}$/ }]}><Input /></Form.Item>
          <Form.Item name="smscode" label="验证码" rules={[{ required: true }]}>
            <Input placeholder={phoneCodeSent ? '验证码已发送' : '点击发送获取'} />
          </Form.Item>
          <Form.Item name="newPassword" label="新密码" rules={[{ required: true, min: 6 }]}><Input.Password /></Form.Item>
          <Button onClick={sendCode} disabled={countdown > 0} style={{ marginBottom: 8 }}>{countdown > 0 ? `${countdown}s` : phoneCodeSent ? '重新发送' : '发送验证码'}</Button>
        </Form>
      </Modal>
    </div>
  )
}

// ===== 通知设置 =====
function NotificationSetting() {
  const data = [
    { title: '作品评论', description: '有人评论我的作品时通知', value: true },
    { title: '系统公告', description: '系统发布公告时通知', value: true },
    { title: '课程更新', description: '课程有更新时通知', value: false },
  ]
  return (
    <List dataSource={data} renderItem={(item: any) => (
      <List.Item actions={[<Switch key="sw" defaultChecked={item.value} />]}>
        <List.Item.Meta title={item.title} description={item.description} />
      </List.Item>
    )} />
  )
}

// ===== 自定义偏好 =====
function CustomSetting() {
  return (
    <List>
      <List.Item actions={[<Switch key="sw" />]}>
        <List.Item.Meta title="暗色模式" description="使用深色主题（暂未支持）" />
      </List.Item>
    </List>
  )
}

// ===== 主页面 =====
export default function Settings() {
  const [form] = Form.useForm()
  const qc = useQueryClient()
  const q = useQuery({ queryKey: ['myInfo'], queryFn: getMyInfo })
  const screens = useBreakpoint()
  const isMobile = !(screens.md ?? false)

  useEffect(() => {
    if (q.data) {
      form.setFieldsValue({
        ...q.data,
        birthday: q.data.birthday ? dayjs(q.data.birthday) : undefined
      })
    }
  }, [q.data])

  const save = useMutation({
    mutationFn: (vals: any) => editMyInfo({ ...vals, birthday: vals.birthday?.format('YYYY-MM-DD') }),
    onSuccess: () => { message.success('保存成功'); qc.invalidateQueries({ queryKey: ['myInfo'] }) }
  })

  if (q.isLoading) return <div style={{ padding: 48, textAlign: 'center' }}><Spin /></div>

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: isMobile ? 12 : 24 }}>
      <Card>
        <Tabs items={[
          { key: 'base', label: '基础资料', children: <BaseSetting form={form} q={q} save={save} /> },
          { key: 'security', label: '安全设置', children: <SecuritySetting /> },
          { key: 'notification', label: '通知设置', children: <NotificationSetting /> },
          { key: 'custom', label: '个性化', children: <CustomSetting /> },
        ]} />
      </Card>
    </div>
  )
}
