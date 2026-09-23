import { useEffect, useState } from 'react'
import { Form, Input, Button, DatePicker, Radio, Upload, Avatar, message, Spin, Card, Tabs, List, Modal } from 'antd'
import { UserOutlined, UploadOutlined } from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { getMyInfo, editMyInfo, StudentUserVO } from '@/api/user.api'
import { uploadFile, duplicateCheck, fileUrl } from '@/api/common.api'
import { useAuth } from '@/stores/auth.store'
import { updatePassword } from '@/api/auth.api'
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
  const userInfo = useAuth((s) => s.userInfo)

  // 旧密码改密:PUT /sys/user/updatePassword 校验旧密码,不依赖短信
  // (短信改密端点 passwordChange 强制要求验证码,本部署未配置短信服务,走它会死路)
  const changePw = useMutation({
    mutationFn: (v: any) => updatePassword({
      username: userInfo?.username || '',
      oldpassword: v.oldpassword,
      password: v.newPassword,
      confirmpassword: v.confirm,
    }),
    onSuccess: () => { message.success('密码修改成功，下次登录请使用新密码'); setModal(null); pwForm.resetFields() }
  })

  const items = [
    { title: '账户密码', description: '通过旧密码修改登录密码', actions: { title: '修改', callback: () => setModal('password') } },
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
          <Form.Item label="账号"><Input value={userInfo?.username || ''} disabled /></Form.Item>
          <Form.Item name="oldpassword" label="旧密码" rules={[{ required: true, message: '请输入旧密码' }]}><Input.Password /></Form.Item>
          <Form.Item name="newPassword" label="新密码" rules={[{ required: true, min: 6, message: '至少6位' }]}><Input.Password /></Form.Item>
          <Form.Item name="confirm" label="确认新密码" dependencies={['newPassword']} rules={[
            { required: true, message: '请确认新密码' },
            ({ getFieldValue }) => ({
              validator: async (_, v) => { if (v && v !== getFieldValue('newPassword')) throw new Error('两次密码不一致') }
            }),
          ]}><Input.Password /></Form.Item>
        </Form>
      </Modal>
    </div>
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
        ]} />
      </Card>
    </div>
  )
}
