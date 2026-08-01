import { useState, useRef, useEffect } from 'react'
import { Card, Steps, Form, Input, Button, message } from 'antd'
import { UserOutlined, SafetyOutlined, LockOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import {
  randomImage, checkCaptcha, querySysUser,
  sendSms, phoneVerification, passwordChange,
} from '@/api/auth.api'

interface UserList {
  username: string
  phone: string
  smscode?: string
}

/** 手机号脱敏: 138****1234 */
function maskPhone(phone: string): string {
  if (!phone || phone.length < 7) return phone
  return phone.slice(0, 3) + '****' + phone.slice(-4)
}

/** 新密码校验: 8位含大小写+特殊符号 */
function validateNewPassword(_: unknown, value: string) {
  if (!value) return Promise.reject('请输入新密码')
  if (value.length < 8) return Promise.reject('密码至少8位')
  if (!/[a-z]/.test(value)) return Promise.reject('密码需包含小写字母')
  if (!/[A-Z]/.test(value)) return Promise.reject('密码需包含大写字母')
  if (!/[~!@#$%^&*()_+`\-={}:";'<>?,.\/]/.test(value)) return Promise.reject('密码需包含特殊符号')
  return Promise.resolve()
}

export default function Alteration() {
  const nav = useNavigate()
  const [current, setCurrent] = useState(0)
  const [userList, setUserList] = useState<UserList>({ username: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [captchaImg, setCaptchaImg] = useState('')
  const [checkKey, setCheckKey] = useState<number>(Date.now())
  const [smsCount, setSmsCount] = useState(0)
  const [smsLoading, setSmsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [step1Form] = Form.useForm()
  const [step2Form] = Form.useForm()
  const [step3Form] = Form.useForm()

  const refreshCaptcha = async () => {
    const key = Date.now()
    setCheckKey(key)
    try {
      setCaptchaImg(await randomImage(key))
    } catch { /* ignore */ }
  }

  useEffect(() => { refreshCaptcha() }, [])

  // ===== Step 1: 验证账号 + 图形验证码 =====
  const onStep1Next = async (vals: { username: string; captcha: string }) => {
    setLoading(true)
    try {
      await checkCaptcha(vals.captcha, checkKey)
      const res = await querySysUser(vals.username)
      setUserList({ username: res.username, phone: res.phone })
      setCurrent(1)
    } catch {
      refreshCaptcha()
    } finally {
      setLoading(false)
    }
  }

  // ===== Step 2: 短信验证 =====
  const startSmsCountdown = () => {
    let n = 60
    setSmsCount(n)
    const t = setInterval(() => {
      n -= 1
      setSmsCount(n)
      if (n <= 0) clearInterval(t)
    }, 1000)
  }

  const onSendSms = async () => {
    setSmsLoading(true)
    try {
      await sendSms(userList.phone, '2')
      message.success('验证码已发送')
      startSmsCountdown()
    } catch { /* client 已提示 */ } finally {
      setSmsLoading(false)
    }
  }

  const onStep2Next = async (vals: { smscode: string }) => {
    setLoading(true)
    try {
      const token = await phoneVerification(userList.phone, vals.smscode)
      setUserList({ ...userList, smscode: token })
      setCurrent(2)
    } catch { /* client 已提示 */ } finally {
      setLoading(false)
    }
  }

  // ===== Step 3: 设置新密码 =====
  const onStep3Next = async (vals: { password: string }) => {
    setLoading(true)
    try {
      await passwordChange(userList.username, vals.password, userList.smscode ?? '', userList.phone)
      setCurrent(3)
      startReturnCountdown()
    } catch { /* client 已提示 */ } finally {
      setLoading(false)
    }
  }

  // ===== Step 4: 成功倒计时 =====
  const startReturnCountdown = () => {
    let n = 5
    setCountdown(n)
    const t = setInterval(() => {
      n -= 1
      setCountdown(n)
      if (n <= 0) {
        clearInterval(t)
        nav('/login')
      }
    }, 1000)
  }

  const prevStep = () => setCurrent(current - 1)

  const stepItems = [
    { title: '验证账号' },
    { title: '手机验证' },
    { title: '设置密码' },
    { title: '完成' },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#1890ff,#36cfc9)' }}>
      <Card style={{ width: 'calc(100% - 24px)', maxWidth: 480, boxShadow: '0 8px 24px rgba(0,0,0,.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>找回密码</h2>
          <Link to="/login">返回登录</Link>
        </div>
        <Steps current={current} items={stepItems} size="small" style={{ marginBottom: 32 }} />

        {current === 0 && (
          <Form form={step1Form} onFinish={onStep1Next} size="large">
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名或手机号' }]}>
              <Input prefix={<UserOutlined />} placeholder="用户名或手机号" />
            </Form.Item>
            <Form.Item name="captcha" rules={[{ required: true, message: '请输入图形验证码' }]}>
              <Input prefix={<SafetyOutlined />} placeholder="图形验证码" addonAfter={
                captchaImg
                  ? <img src={captchaImg} alt="验证码" onClick={refreshCaptcha} style={{ height: 30, cursor: 'pointer' }} />
                  : <Button type="link" size="small" onClick={refreshCaptcha}>刷新</Button>
              } />
            </Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>下一步</Button>
          </Form>
        )}

        {current === 1 && (
          <Form form={step2Form} onFinish={onStep2Next} size="large">
            <Form.Item label="账号名">
              <Input value={userList.username} disabled />
            </Form.Item>
            <Form.Item label="手机">
              <Input value={maskPhone(userList.phone)} disabled />
            </Form.Item>
            <Form.Item name="smscode" rules={[{ required: true, message: '请输入短信验证码' }]}>
              <Input placeholder="短信验证码" addonAfter={
                <Button type="link" size="small" disabled={smsCount > 0} loading={smsLoading} onClick={onSendSms}>
                  {smsCount > 0 ? `${smsCount}s` : '获取验证码'}
                </Button>
              } />
            </Form.Item>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button block onClick={prevStep}>上一步</Button>
              <Button type="primary" block htmlType="submit" loading={loading}>下一步</Button>
            </div>
          </Form>
        )}

        {current === 2 && (
          <Form form={step3Form} onFinish={onStep3Next} size="large">
            <Form.Item label="账号名">
              <Input value={userList.username} disabled />
            </Form.Item>
            <Form.Item name="password" rules={[{ validator: validateNewPassword }]} validateTrigger={['onBlur']}>
              <Input.Password prefix={<LockOutlined />} placeholder="新密码（8位含大小写+特殊符号）" />
            </Form.Item>
            <Form.Item name="confirm" dependencies={['password']} rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) return Promise.resolve()
                  return Promise.reject('两次密码不一致')
                },
              }),
            ]}>
              <Input.Password prefix={<LockOutlined />} placeholder="确认新密码" />
            </Form.Item>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button block onClick={prevStep}>上一步</Button>
              <Button type="primary" block htmlType="submit" loading={loading}>提交</Button>
            </div>
          </Form>
        )}

        {current === 3 && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a' }} />
            <h3 style={{ marginTop: 16 }}>密码修改成功</h3>
            <p>将在 <span style={{ color: '#1890ff', fontSize: 18 }}>{countdown}</span> 秒后返回登录页面</p>
            <Button type="link" onClick={() => nav('/login')}>立即返回</Button>
          </div>
        )}
      </Card>
    </div>
  )
}
