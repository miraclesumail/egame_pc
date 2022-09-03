import storage from 'redux-persist/lib/storage';

export const getUrlParams = (search: string) => {
  try {
    const url = search;
    const urlParams = {};
    const paramPos = url.lastIndexOf('?');
    if (paramPos !== -1) {
      const anchorPos = url.lastIndexOf('#');
      // let paramAry = (url.substr(url.indexOf("?") + 1)).split('&')
      const paramAry = (paramPos < anchorPos ? url.substring(paramPos + 1, anchorPos) : url.substring(paramPos + 1)).split('&');
      for (let i = 0; i < paramAry.length; i++) {
        const key = paramAry[i].split('=')[0];
        const value = paramAry[i].split('=')[1];
        const obj: { [key: string]: string } = {};
        obj[key] = value;
        Object.assign(urlParams, obj);
      }
    }
    return urlParams;
  } catch (e) {
    console.error(e);
    return {};
  }
};
interface Idata {
  [key: string]: any;
}
export const getPokerValue = (num: string): string => {
  const pokerValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  return pokerValue[Number(num) - 1];
}
export class ObjectUtility {
  // 通过a.b.c的方式获取对象的值
  static getValue = (data: Idata, key: string) => {
    const keys = key.split('.');
    let result = data;
    keys.forEach(item => {
      result = result[item];
    }
    );
    return result;
  }
  // 通过a.b.c的方式设置对象的值
  static setValue = (data: Idata, key: string, value: any) => {
    const keys = key.split('.');
    let result = data;
    keys.forEach((item, index) => {
      if (index === keys.length - 1) {
        result[item] = value;
      } else {
        result = result[item];
      }
    }
    );
    return result;
  }
}
export class IStorage {
  // 删除一个储存的数据
  static async removeItem(key: string) {
    await storage.removeItem(key);
  }
  // 创建一个存储对象
  static async setItem<T>(key: string, data: T) {
    try {
      if (key.startsWith('@')) {
        // 先获取到root的数据如果没有就创建一个 如果有就更新
        const root = await this.getRoot();
        if (key.indexOf('.') === -1) {
          root[key.substring(1)] = JSON.stringify(data);
        }
        else {
          const prefix = key.substring(1, key.indexOf('.'));
          const suffix = key.substring(key.indexOf('.') + 1);
          const rootData = root[prefix] ? JSON.parse(root[prefix]) : {};
          ObjectUtility.setValue(rootData, suffix, data);
          root[prefix] = JSON.stringify(rootData);
        }
        await this.setRoot(root);
      } else {
        await storage.setItem(key, JSON.stringify(data));
      }
    } catch (e) {
      console.error(e);
    }
  }
  // 获取root的数据
  static async getRoot(): Promise<any> {
    try {
      const root = await storage.getItem('persist:root') || '{}';
      const rootObj = JSON.parse(root);
      return rootObj;
    } catch (e) {
      console.error(e);
    }
  }
  // 设置root的数据
  static async setRoot(data: any) {
    try {
      await storage.setItem('persist:root', JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }
  // 如果@开头封装
  static async getRootData(key: string) {
    try {
      const root = await this.getRoot();
      if (key.indexOf('.') === -1) {
        const data = root[key.substring(1)]
        return JSON.parse(data);
      }
      const prefix = key.substring(1, key.indexOf('.'));
      const data = root[prefix] ? JSON.parse(root[prefix]) : {};
      const suffix = key.substring(key.indexOf('.') + 1);
      return ObjectUtility.getValue(data, suffix);
    } catch (e) {
      console.error(e);
    }
  }
  static async getItem(key: string) {
    if (key.startsWith('@')) {
      const data = await this.getRootData(key);
      return data;
    }
    const json = await storage.getItem(key) || '{}';
    const data = JSON.parse(json);
    return data ? data : {};
  }
}

export interface CustomRule {
  message?: string
  validator: (value: string) => boolean
}
export class ValidateInput {
  static validate = (rules: any[] | CustomRule, value: string) => {
    if (rules instanceof Array) {
      let errMsg = ''
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];

        if (rule.required && !value) {
          errMsg = rule.message
          break
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errMsg = rule.message
          break
        }
      }
      return errMsg
    } else if( rules instanceof Object) {
      const isTrue = rules.validator(value)
      return !isTrue && rules.message
    }
  }
}
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 将throttle函数转成类 用来管理节流函数
export class Throttle {
  private timer: number = Date.now()
  private now = Date.now()
  private func: Function
  private wait: number
  constructor(func: Function, wait: number) {
    this.func = func
    this.wait = wait
  }
  public run = (...args: any[]) => {
    this.now = Date.now()
    if (this.now - this.timer > this.wait) {
      this.func(...args)
      this.timer = this.now
    }
  }
}
export class ItimeTool {
  static getNowTime() {
    return new Date().getTime();
  }
  // 时间字符串转时间对象 兼容ios
  static getTime = (time: string | number) => {
    if (typeof time === 'number') return new Date(time);
    if (time.indexOf('-') === -1) {
      return new Date(time);
    }
    return new Date(time.replace(/-/g, '/'));
  }
  // 格式化时间字符串
  static formatYearTime = (date: Date | string | number, changeYear = true) => {
    let iDate=date
    // 如果time是字符串 就转成时间对象
    if (typeof iDate === 'string' || typeof iDate === 'number') {
      iDate = this.getTime(iDate);
    }
    const time = iDate.toLocaleString()
    const newTime = time.replace(/\d{4}/, '0' + ((iDate as Date).getFullYear() % 100).toString()).replace(/\//g, '-')
    return changeYear ? newTime : time.replace(/\d{4}/, ((iDate as Date).getFullYear()).toString()).replace(/\//g, '-');
  }
  // 传入一个时间字符串格式为yyyy/mm/dd hh:mm:ss或一个时间戳 和一个秒数  将时间加上秒数 返回一个时间字符
  static addSecond = (time: string | number, second: number): string => {
    const date = this.getTime(time)
    date.setSeconds(date.getSeconds() + second)
    // 格式化时间字符串 year change to 021
    return date.toLocaleString()
  }
  // 传入一个时间字符串或时间戳 格式为 00:00:00 返回一个秒数
  static getSecond = (time: string | number) => {
    if (typeof time === 'string' && time.indexOf(':') !== -1) {
      const timeArr = time.split(':')
      const hour = parseInt(timeArr[0])
      const minute = parseInt(timeArr[1])
      const second = parseInt(timeArr[2])
      return hour * 3600 + minute * 60 + second
    }
    return this.getTime(time).getSeconds()
  }
  static formatSecond = (second: number) => {
    const hour = Math.floor(second / 3600)
    const minute = Math.floor((second - hour * 3600) / 60)
    const second2 = Math.floor(second - hour * 3600 - minute * 60)
    return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second2 < 10 ? '0' + second2 : second2}`
  }
}
const testRequest1 = <T>(data: T) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const num = Math.random()
    if (num > 0.5) {
      resolve(data)
    } else {
      reject('error')
    }
  }, 1000)
})
const getResult = async (id: string) => {
  const res: any = await testRequest1({ id: id })
  const { t: data } = res
  return data
}
export const getNewResult = (id: string, key: string, func?: (res: any) => boolean, actionCallBack?: (res: any) => void) => new Promise((resolve, reject) => {
  getResult(id).then(res => {
    if (actionCallBack && res) actionCallBack(res)
    if (func && func(res)) return resolve(res)
    if (!func && res[key]) return resolve(res)
    setTimeout(() => getNewResult(id, key, func, actionCallBack).then(res => resolve(res)), 1000)
  }).catch(err => reject(err))
})
