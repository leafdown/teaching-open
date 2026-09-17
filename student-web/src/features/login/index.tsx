import { useState, useEffect } from 'react'
import { Card, Form, Input, Button, Tabs, message } from 'antd'
import { UserOutlined, LockOutlined, MobileOutlined, SafetyOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { login, phoneLogin, sendSms, randomImage } from '@/api/auth.api'
import { getCurrentConfig } from '@/api/system.api'
import { fileUrl } from '@/api/common.api'
import { useAuth, normalizeRoles } from '@/stores/auth.store'
import { useConfig } from '@/stores/config.store'
import { useDict } from '@/stores/dict.store'

export default function Login() {
  const nav = useNavigate()
  const [accountForm] = Form.useForm()
  const [phoneForm] = Form.useForm()
  const setLogin = useAuth((s) => s.setLogin)
  const setSysConfig = useConfig((s) => s.setSysConfig)
  const brandName = useConfig((s) => s.sysConfig?.brandName)
  const setAllDict = useDict((s) => s.setAll)
  const logo = useConfig((s) => s.sysConfig?.logo)
  const [loading, setLoading] = useState(false)
  const [smsLoading, setSmsLoading] = useState(false)
  const [smsCount, setSmsCount] = useState(0)
  const [captchaImg, setCaptchaImg] = useState('')
  const [checkKey, setCheckKey] = useState<number>(Date.now())

  const refreshCaptcha = async () => {
    const key = Date.now()
    setCheckKey(key)
    try {
      const img = await randomImage(key)
      setCaptchaImg(img)
    } catch { /* ignore */ }
  }
  useEffect(() => { refreshCaptcha() }, [])

  const afterLogin = async (token: string, userInfo: any, role: any[], dict?: Record<string, any[]>) => {
    const roles = normalizeRoles(role)
    setLogin(token, userInfo, roles)
    if (dict) setAllDict(dict)
    message.success('登录成功')
    // 管理员进管理后台,学生进学生首页
    const isAdmin = roles.some((r: any) => r.roleCode === 'admin' || r.roleCode === 'teacher' || r.roleCode === 'dev')
    nav(isAdmin ? '/admin' : '/', { replace: true })
  }

  const onAccountLogin = async (vals: { username: string; password: string; captcha: string }) => {
    setLoading(true)
    try {
      const res = await login({ ...vals, checkKey })
      try { setSysConfig(await getCurrentConfig()) } catch { /* ignore */ }
      await afterLogin(res.token, res.userInfo, res.role, res.sysAllDictItems)
    } catch { refreshCaptcha() } finally { setLoading(false) }
  }

  const onPhoneLogin = async (vals: { mobile: string; captcha: string }) => {
    setLoading(true)
    try {
      const res = await phoneLogin(vals)
      try { setSysConfig(await getCurrentConfig()) } catch { message.warning('配置加载失败') }
      await afterLogin(res.token, res.userInfo, res.role, res.sysAllDictItems)
    } catch (e: any) { message.error(e?.message || '手机登录失败') } finally { setLoading(false) }
  }

  const onSendSms = async () => {
    const mobile = phoneForm.getFieldValue('mobile')
    if (!mobile || !/^1\d{10}$/.test(mobile)) { message.error('请输入正确的手机号'); return }
    setSmsLoading(true)
    try {
      await sendSms(mobile)
      message.success('验证码已发送')
      let n = 60; setSmsCount(n)
      const t = setInterval(() => { n -= 1; setSmsCount(n); if (n <= 0) clearInterval(t) }, 1000)
    } catch { /* ignore */ } finally { setSmsLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#1890ff,#36cfc9)' }}>
      <Card style={{ width: 'calc(100% - 32px)', maxWidth: 400, boxShadow: '0 8px 24px rgba(0,0,0,.15)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {logo ? <img src={fileUrl(logo)} alt={brandName} style={{ height: 32, marginRight: 8, objectFit: 'contain' }} /> : null}
          <span style={{ fontSize: 20, fontWeight: 600 }}>{brandName ? `${brandName} · 学生端` : '学生端'}</span>
        </div>
        <Tabs items={[
          {
            key: 'account', label: '账号登录', children: (
              <Form form={accountForm} onFinish={onAccountLogin} size="large">
                <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                  <Input prefix={<UserOutlined />} placeholder="用户名" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                  <Input.Password prefix={<LockOutlined />} placeholder="密码" />
                </Form.Item>
                <Form.Item name="captcha" rules={[{ required: true, message: '请输入验证码' }]}>
                  <Input prefix={<SafetyOutlined />} placeholder="验证码" addonAfter={
                    captchaImg
                      ? <img src={captchaImg} alt="验证码" onClick={refreshCaptcha} style={{ height: 30, cursor: 'pointer' }} />
                      : <Button type="link" size="small" onClick={refreshCaptcha}>刷新</Button>
                  } />
                </Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>登录</Button>
              </Form>
            )
          },
          {
            key: 'phone', label: '手机号登录', children: (
              <Form form={phoneForm} onFinish={onPhoneLogin} size="large">
                <Form.Item name="mobile" rules={[{ required: true, message: '请输入手机号' }]}>
                  <Input prefix={<MobileOutlined />} placeholder="手机号" />
                </Form.Item>
                <Form.Item name="captcha" rules={[{ required: true, message: '请输入验证码' }]}>
                  <Input placeholder="验证码" addonAfter={
                    <Button type="link" size="small" disabled={smsCount > 0} loading={smsLoading} onClick={onSendSms}>
                      {smsCount > 0 ? `${smsCount}s` : '获取验证码'}
                    </Button>
                  } />
                </Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>登录</Button>
              </Form>
            )
          }
        ]} />
      </Card>
    </div>
  )
}
