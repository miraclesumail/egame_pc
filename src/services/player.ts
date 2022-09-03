import http from '@/api/http'
import { ApiFunctionReturnResponseData } from '@/api/types'

// 获取登录信息
export const getPlayerBalance: ApiFunctionReturnResponseData<{
  player_id: string;
  currency_code: string;
}> = (params: any, config) => {
  const url = '/player/balance'
  return http.get(url, params, config).then((r) => r.data)
}

// 获取玩家信息
export const getPlayerInfo: ApiFunctionReturnResponseData<{
  player_id: string;
}> = (params: any, config) => {
  const url = '/player/info'
  return http.get(url, params, config).then((r) => r.data)
}

// 退出登录
export const logout: ApiFunctionReturnResponseData<void> = (params, config) => {
  const url = '/player/logout'
  return http.post(url, params, config).then((r) => r.data)
}

// 获取玩家游戏记录
export const getGameRecord: ApiFunctionReturnResponseData<{
  player_id: string;
  page_size: number;
  page_num: number;
}> = (params, config) => {
  const url = '/player/records'
  return http.post(url, params, config).then((r) => r.data)
}
