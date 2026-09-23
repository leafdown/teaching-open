import { postAction, getAction, putAction } from './client'
import { LoginResult } from './types'

// 图形验证码 GET /sys/randomImage/{checkKey} 返回 base64 dataURI
export function randomImage(checkKey: string | number) {
  return getAction<string>(`/sys/randomImage/${checkKey}`)
}

// 账号登录 POST /sys/login {username,password,captcha,checkKey}
export function login(data: { username: string; password: string; captcha: string; checkKey: string | number }) {
  return postAction<LoginResult>('/sys/login', data)
}

// 手机登录 POST /sys/phoneLogin {mobile,captcha}
export function phoneLogin(data: { mobile: string; captcha: string }) {
  return postAction<LoginResult>('/sys/phoneLogin', data)
}

// 发送短信 POST /sys/sms {mobile, smsmode} smsmode: '0'默认 '1'注册 '2'找回密码
// 注意:后端只有 /sys/sms(LoginController),不存在 /account/sms,打错会 404
export function sendSms(mobile: string, smsmode: string = '0') {
  return postAction('/sys/sms', { mobile, smsmode })
}

// 登出 POST /sys/logout
export function logout() {
  return postAction('/sys/logout')
}

// 注册 POST /sys/user/register
// email 传 null 而不是 '':uniq_sys_user_email 唯一索引会把多条 email='' 判为重复,
// NULL 才允许多条(邮箱未填的用户)
export function register(data: { username: string; password: string; email: string | null; phone: string; smscode: string }) {
  return postAction('/sys/user/register', data)
}

// 校验字段唯一性 GET /sys/user/checkOnlyUser
export function checkOnlyUser(fieldName: 'username' | 'email' | 'phone', fieldVal: string) {
  return getAction<boolean>('/sys/user/checkOnlyUser', { [fieldName]: fieldVal })
}

// 校验图形验证码 POST /sys/checkCaptcha
export function checkCaptcha(captcha: string, checkKey: string | number) {
  return postAction<boolean>('/sys/checkCaptcha', { captcha, checkKey })
}

// 查询系统用户(用户名或手机号) GET /sys/user/querySysUser
export function querySysUser(username: string) {
  return getAction<{ username: string; phone: string }>('/sys/user/querySysUser', { username })
}

// 手机验证码校验 POST /sys/user/phoneVerification 返回 smscode token
export function phoneVerification(phone: string, smscode: string) {
  return postAction<string>('/sys/user/phoneVerification', { phone, smscode })
}

// 修改密码 GET /sys/user/passwordChange
export function passwordChange(username: string, password: string, smscode: string, phone: string) {
  return getAction<boolean>('/sys/user/passwordChange', { username, password, smscode, phone })
}

// 旧密码修改密码 PUT /sys/user/updatePassword {username,oldpassword,password,confirmpassword}
// 不依赖短信,已登录用户自助改密用这个
export function updatePassword(data: { username: string; oldpassword: string; password: string; confirmpassword: string }) {
  return putAction('/sys/user/updatePassword', data)
}
