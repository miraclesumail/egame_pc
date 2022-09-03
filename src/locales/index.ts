import zhCN from '@/locales/zh_CN'
import enUS from '@/locales/en_US'
import koKR from '@/locales/ko_KR'
import { Locale } from '@/store/slices/config.slice'

const locales: Record<Locale, Record<string, string>> = {
  'zh-CN': zhCN,
  'ko-KR': koKR,
  'en-US': enUS
}

export default locales
