import {
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import { InitData } from "@/utils/dewdrop11";
import { v1 as uuid } from "uuid";

export const DESIGN_WIDTH = 414;
let windowW: number | null = null;
export const getWndowWidth = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth >= 768) return 768;
  return windowWidth;
};

export const getRem = (num: number) => {
  const windowWidth = getWndowWidth();
  return (windowWidth / DESIGN_WIDTH) * num;
};
window.onresize = () => {
  if (windowW === getWndowWidth()) return;
  windowW = getWndowWidth();
  document.documentElement.style.fontSize = `${windowW / DESIGN_WIDTH}px`;
};
interface IAsyncThunk {
  storeName: string;
  funcName: string;
  ascyncFunc: (...args: any[]) => Promise<any>;
  fulfilled: (...args: any[]) => void;
  pending: (...args: any[]) => void;
  rejected: (...args: any[]) => void;
  adapter?: boolean;
  options?: any;
}
export class GetAsyncThunk {
  [key: string]: any;
  extraReducers = {};
  constructor({
    storeName,
    ascyncFunc,
    funcName,
    fulfilled,
    pending,
    rejected,
    adapter,
    options,
  }: IAsyncThunk) {
    this[funcName] = createAsyncThunk(`${storeName}/${funcName}`, ascyncFunc);
    if (adapter) {
      this.adapter = createEntityAdapter(
        options ? options : null
      ) as EntityAdapter<any>;
    }
    this.extraReducers = {
      [this[funcName].pending]: pending,
      // 结束
      [this[funcName].fulfilled]: fulfilled,
      // 错误
      [this[funcName].rejected]: rejected,
    };
  }
}
type ActionType = (action: string, data: Record<string, any>) => boolean;
interface EventItemType {
  key: string;
  func: Function;
}
export class Communicator {
  static [key: string]: any;
  static action: ActionType = (action, data) => {
    const listKey = action;
    if (this[listKey] && Array.isArray(this[listKey])) {
      this[listKey].forEach(({ func }: EventItemType) => {
        func(data);
      });
      return true;
    }
    return false;
  };
  /**
   *
   * @param {string} ListenerName 事件名
   * @returns {array} 事件列表
   */
  static getListenerList = (ListenerName: string): Array<any> | null => {
    try {
      const listKey = ListenerName;
      if (!this[listKey]) throw new Error(`${ListenerName}not Fund`);
      return this[listKey];
    } catch (error) {
      return null;
    }
  };
  /**
   *
   * @param {string} ListenerName 事件名
   * @param {func} func 回调函数
   */
  static removeListener = (ListenerName: string, func: Function) => {
    try {
      const listKey = ListenerName;
      if (!Communicator[listKey] || !Communicator[listKey].length)
        throw new Error("if want Remove ,create first");
      const index = Communicator[listKey].indexOf(func);
      Communicator[listKey].splice(index, 1);
    } catch (error: any) {
      error.message && console.error(error.message);
    }
  };
  /**
   *
   * @param {string} ListenerName 事件名
   * @param {func} func 回调函数
   * @returns 事件实例
   */
  static createListener = (
    ListenerName: string,
    func: Function
  ): EventItemType => {
    try {
      const listKey = ListenerName;
      if (!this[listKey]) this[listKey] = [];
      const item: EventItemType = {
        key: ListenerName,
        func,
      };
      this[listKey].push(item as never);
      return item;
    } catch (error) {
      throw error;
    }
  };
}

export function getNumberPart(total: number, arrs: number[]) {
  const result: number[] = [];
  arrs.reduceRight((prev: number, next: number) => {
    const unit = Math.floor(prev / next);
    result.unshift(unit);
    return prev % next;
  }, total);

  return result;
}

export function sumNumberPart(result: number[]) {
  const arrs: number[] = [];

  result.forEach((element, index) => {
    if (element) {
      arrs.unshift(...new Array(element).fill(index));
    }
  });

  return arrs;
}

/**
 * 格式化金额 3分位
 * @param amount
 * @returns
 */
export function formatAmount(amount: number) {
  return Math.floor(amount)
    .toString()
    .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
}

/**
 * 格式化路图canvas数据
 * @param obj
 * @returns
 */
export function formatResultList(obj: Record<string, Record<string, any>>) {
  return Object.keys(obj).map((key) => formatResultItem(obj[key]));

  function formatResultItem(item: any) {
    const obj: InitData = {
      pair: item.pair,
      winner: "tie",
    };
    if (item.banker_val > item.player_val) {
      obj.winner = "banker"; // 庄赢
    } else if (item.banker_val < item.player_val) {
      obj.winner = "player"; // 闲赢
    }

    return obj;
  }
}

// 初始化画布
export function initCanvas(
  id: string | HTMLCanvasElement,
  useRem = false,
  gridWidth: number,
  gridHeight: number
) {
  const canvas =
    typeof id === "string"
      ? (document.getElementById(id) as HTMLCanvasElement)
      : id;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  let dpr = window.devicePixelRatio;
  dpr = Math.ceil(dpr);
  dpr = dpr > 2 ? dpr : 4;

  canvas.width = gridWidth * dpr;
  canvas.height = gridHeight * dpr;
  canvas.style.setProperty("background", "#FAF8F4");
  canvas.style.setProperty(
    "width",
    useRem ? `${gridWidth / 100}rem` : `${gridWidth}px`
  );
  canvas.style.setProperty(
    "height",
    useRem ? `${gridHeight / 100}rem` : `${gridHeight}px`
  );

  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return ctx;
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @description 获取uuid
 * @return string
 */
export function getUuid() {
  return uuid();
}

/**
 * 给一个dom添加动画
 * @param ele
 * @param animateParams
 * @param onFinish
 * @returns
 */
export function animateEle(ele: HTMLElement, animateParams, onFinish) {
  const { keyframes, options } = animateParams;

  const animation = ele.animate(keyframes, options);

  animation.onfinish = (e: AnimationPlaybackEvent) => {
    onFinish && onFinish();
  };

  return () => (animation as Animation).cancel();
}
