import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface CustomParams {
  _isNeedToken?: boolean;
  _isNeedLoading?: boolean;
  _isShowErrorTips?: boolean;
  _notHandleResponse?: boolean;
  _notShowErrorTipsCode?: string;
}

export interface RequestParams extends CustomParams {
  [key: string]: unknown;
}

export interface ResponseData<T = any> {
  data: T;
  code: string;
  message: string;
  success: boolean;

  [key: string]: unknown;
}

export type ApiFunctionReturnCustomData<T = any> = (
  params?: RequestParams,
  config?: AxiosRequestConfig
) => Promise<T>;

export type ApiFunctionReturnResponseData<T = any> = (
  params?: RequestParams,
  config?: AxiosRequestConfig
) => Promise<ResponseData<T>>;

export type ApiFunctionReturnAxiosResponse<T = any> = (
  params?: RequestParams,
  config?: AxiosRequestConfig
) => Promise<AxiosResponse<T>>;
