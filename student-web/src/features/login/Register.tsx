import { useState, useRef, useEffect } from 'react'
import { Card, Form, Input, Button, Progress, message } from 'antd'
import { UserOutlined, LockOutlined, MobileOutlined, SafetyOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { register, sendSms, checkOnlyUser } from '@/api/auth.api'

interface RegisterForm {
  username: string
  password: string
  confirm: string
  phone: string
  smscode: string
}

/** 计算密码强度: 0弱 1中 2强 */
function calcStrength(pwd: string): number {
  if (!pwd) return 0
  let level = 0
  if (/[0-9]/.test(pwd)) level++
  if (/[a-zA-Z]/.test(pwd)) level++
  if (/[^0-9a-zA-Z_]/.test(pwd)) level++
  return level
}

const STRENGTH_PERCENT = [10, 40, 70, 100]
const STRENGTH_COLOR = ['#ff0000', '#ff0000', '#ff7e05', '#52c41a']
const STRENGTH_NAME = ['', '低', '中', '强']

export default function Register() {
  const nav = useNavigate()
  const [form] = Form.useForm<RegisterForm>()
  const [loading, setLoading] = useState(false)
  const [smsCount, setSmsCount] = useState(0)
  const [smsLoading, setSmsLoading] = useState(false)
  const [pwdStrength, setPwdStrength] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  const startCountdown = () => {
    let n = 60
    setSmsCount(n)
    timerRef.current = setInterval(() => {
      n -= 1
      setSmsCount(n)
      if (n <= 0 && timerRef.current) clearInterval(timerRef.current)
    }, 1000)
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwdStrength(calcStrength(e.target.value))
  }

  /** 用户名唯一性校验 */
  const validateUsername = async (_: unknown, value: string) => {
    if (!value) return Promise.reject('用户名不能为空')
    try {
      await checkOnlyUser('username', value)
      return Promise.resolve()
    } catch {
      return Promise.reject('用户名已存在!')
    }
  }

  /** 手机号唯一性校验 */
  const validatePhone = async (_: unknown, value: string) => {
    if (!value) return Promise.reject('请输入手机号')
    if (!/^1[3-9]\d{9}$/.test(value)) return Promise.reject('请输入正确的手机号')
    try {
      await checkOnlyUser('phone', value)
      return Promise.resolve()
    } catch {
      return Promise.reject('手机号已存在!')
    }
  }

  /** 密码强度校验 */
  const validatePassword = (_: unknown, value: string) => {
    if (!value) return Promise.reject('请输入密码')
    if (value.length < 6) return Promise.reject('密码至少6位')
    if (!/[0-9]/.test(value) || !/[a-zA-Z]/.test(value)) return Promise.reject('密码需包含数字和字母')
    return Promise.resolve()
  }

  /** 确认密码校验 */
  const validateConfirm = (_: unknown, value: string) => {
    if (!value) return Promise.reject('请确认密码')
    if (value !== form.getFieldValue('password')) return Promise.reject('两次密码不一致')
    return Promise.resolve()
  }

  const onSendSms = async () => {
    const phone = form.getFieldValue('phone')
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      message.error('请先输入正确的手机号')
      return
    }
    setSmsLoading(true)
    try {
      await sendSms(phone, '1')
      message.success('验证码已发送')
      startCountdown()
    } catch { /* client 已提示 */ } finally {
      setSmsLoading(false)
    }
  }

  const onSubmit = async (vals: RegisterForm) => {
    setLoading(true)
    try {
      await register({
        username: vals.username,
        password: vals.password,
        email: '',
        phone: vals.phone,
        smscode: vals.smscode,
      })
      message.success('注册成功')
      nav('/login', { state: { username: vals.username, password: vals.password } })
    } catch { /* client 已提示 */ } finally {
      setLoading(false)
    }
  }

  const strengthPercent = STRENGTH_PERCENT[pwdStrength] ?? 10
  const strengthColor = STRENGTH_COLOR[pwdStrength] ?? '#ff0000'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#1890ff,#36cfc9)' }}>
      <Card style={{ width: 'calc(100% - 32px)', maxWidth: 400, boxShadow: '0 8px 24px rgba(0,0,0,.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>注册账号</h2>
          <Link to="/login">返回登录</Link>
        </div>
        <Form form={form} onFinish={onSubmit} size="large" layout="vertical">
          <Form.Item name="username" rules={[{ validator: validateUsername }]} validateTrigger={['onBlur']}>
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ validator: validatePassword }]} validateTrigger={['onBlur']}>
            <Input.Password prefix={<LockOutlined />} placeholder="至少6位，含数字和字母" onChange={onPasswordChange} />
          </Form.Item>
          {pwdStrength > 0 && (
            <div style={{ marginBottom: 16 }}>
              <Progress percent={strengthPercent} showInfo={false} strokeColor={strengthColor} size="small" />
              <span style={{ fontSize: 12, color: strengthColor }}>强度：{STRENGTH_NAME[pwdStrength]}</span>
            </div>
          )}
          <Form.Item name="confirm" rules={[{ validator: validateConfirm }]} validateTrigger={['onBlur']}>
            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
          </Form.Item>
          <Form.Item name="phone" rules={[{ validator: validatePhone }]} validateTrigger={['onBlur']}>
            <Input prefix={<MobileOutlined />} placeholder="11 位手机号" />
          </Form.Item>
          <Form.Item name="smscode" rules={[{ required: true, message: '请输入短信验证码' }]}>
            <Input prefix={<SafetyOutlined />} placeholder="短信验证码" addonAfter={
              <Button type="link" size="small" disabled={smsCount > 0} loading={smsLoading} onClick={onSendSms}>
                {smsCount > 0 ? `${smsCount}s` : '获取验证码'}
              </Button>
            } />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>注册</Button>
        </Form>
      </Card>
    </div>
  )
}
