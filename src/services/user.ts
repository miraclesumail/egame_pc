import http from '@/api/http'
import { ApiFunctionReturnResponseData } from '@/api/types'

// 获取登录信息
export const login: ApiFunctionReturnResponseData<{
  token: string;
  userName: string;
}> = (params, config) => {
  const url = '/auth/login'
  return http.post(url, params, config).then((r) => r.data)
}

// 游客登录
export const visitLogin: ApiFunctionReturnResponseData<{
  token: string;
  userName: string;
}> = (params, config) => {
  const url = '/auth/visit/login'
  return http.post(url, params, config).then((r) => r.data)
}

// 获取图形验证码
export const getCaptcha: ApiFunctionReturnResponseData<{
  token: string;
  userName: string;
}> = (params, config) => {
  const url = '/auth/verification-code'
  return http.get(url, params, config).then((r) => r.data)
}
