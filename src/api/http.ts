import qs from 'qs'
import axios, { AxiosRequestHeaders, AxiosRequestConfig, AxiosResponse } from 'axios'
import store from '@/store'
import { RequestParams, ResponseData, CustomParams } from '@/api/types'
import { getUuid } from '@/utils/tool'
import { LoadingClass } from '@/components/Loading'
import { message } from '@/components/Message'

interface AppAxiosRequestConfig extends AxiosRequestConfig {
  customParams?: CustomParams
}

interface AppAxiosResponse extends AxiosResponse {
  config: AppAxiosRequestConfig
}

let requestIdList: string[] = []
const loading = new LoadingClass()
// 创建 axios 实例
const _http = axios.create({
  timeout: 120 * 1000,
  baseURL: '/',
  headers: {
    AppId: '1'
  }
})

// 添加请求拦截器
_http.interceptors.request.use(request, error => {
  console.log('request error:\n', error)
  return Promise.reject(error)
})

// 添加响应拦截器
_http.interceptors.response.use(response, responseOnRejected)

function request (config: AppAxiosRequestConfig) {
  const qid = getUuid()
  const state = store.getState()
  const token = localStorage.getItem('token') || ''

  const headers = config.headers as AxiosRequestHeaders
  const contentType = headers['Content-Type'] as string
  const isFormData = /multipart\/form-data/.test(contentType)
  const paramsFiled = /get|delete/.test(String(config.method)) ? 'params' : 'data'
  const needStringify = /application\/x-www-form-urlencoded/.test(contentType)

  const data = {
    ...config[paramsFiled]
  }

  const customParams = {
    _isNeedLoading: data._isNeedLoading,
    _isShowErrorTips: data._isShowErrorTips !== false,
    _notHandleResponse: data._notHandleResponse,
    _notShowErrorTipsCode: data._notShowErrorTipsCode
  }

  delete data._isNeedToken
  delete data._isNeedLoading
  delete data._isShowErrorTips
  delete data._notHandleResponse
  delete data._notShowErrorTipsCode

  if (!isFormData) {
    config[paramsFiled] = needStringify ? qs.stringify(data) : data
  }

  if (customParams._isNeedLoading) {
    requestIdList.push(qid)
    loading.show()
  }

  config.headers = {
    qid,
    lToken: token,
    ...config.headers
  }
  config.customParams = customParams

  return config
}

function response (response: AppAxiosResponse) {
  const qid = response.config.headers?.qid
  const {
    _isNeedLoading,
    _isShowErrorTips,
    _notHandleResponse,
    _notShowErrorTipsCode
  } = response.config.customParams as CustomParams

  _isNeedLoading && closeLoading(qid)

  if (_notHandleResponse) return response

  const data = response.data as ResponseData
  const code = data.code
  const message = data.message
  const notTipsCode = ['N_000000', 'N_000026', 'N_000027']
  const needLoginCode = ['N_000003', 'N_000004', 'N_000015']

  const isTips = _isShowErrorTips && code !== _notShowErrorTipsCode && !~notTipsCode.indexOf(code)
  if (isTips) {
    console.log(message)
  }
  if (needLoginCode.includes(code)) {
    console.log('to login')
  }

  return response
}

function responseOnRejected (error: any) {
  const config = error.config
  if (config?.customParams._isNeedLoading) {
    closeLoading(config.headers.qid)
  }
  message.error(error.message)
  console.log('response error:\n', error)
  return Promise.reject(error.message)
}

function closeLoading (qid?: any) {
  requestIdList = requestIdList.filter(item => item !== qid)
  if (!requestIdList.length) {
    loading.hide()
  }
}

function get<T = ResponseData, P = RequestParams> (url: string, params?: RequestParams, config?: AxiosRequestConfig<P>) {
  config = {
    params,
    ...config
  }
  return _http.get<T>(url, config)
}

function put<T = ResponseData, P = RequestParams> (url: string, params?: RequestParams, config?: AxiosRequestConfig<P>) {
  return _http.put<T>(url, params, config)
}

function post<T = ResponseData, P = RequestParams> (url: string, params?: RequestParams, config?: AxiosRequestConfig<P>) {
  return _http.post<T>(url, params, config)
}

function remove<T = ResponseData, P = RequestParams> (url: string, params?: RequestParams, config?: AxiosRequestConfig<P>) {
  config = {
    params,
    ...config
  }
  return _http.delete<T>(url, config)
}

// 封装常用请求方法
const http = {
  get,
  put,
  post,
  delete: remove
}

export default http
