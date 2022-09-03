import request from '../utils/request';
export const testRequest = (params = {}) => {
  return request.get<any,any[]>('/posts', params);
};