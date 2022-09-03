import Heart from './heart'
type CallBack = (e: Event) => void;

interface Ioptions<T> {
  /** ws连接的地址 */
  url: string | null;
  /** 心跳重连间隔 */
  heartTime?: number;
  /** 心跳信息 default ping */
  heartMsg: string;
  /** 是否自动重连 */
  isReconnect?: boolean;
  /** 重连间隔时间 */
  reconnectTime?: number;
  /** 最大重连次数 -1则不限制*/
  reconnectCount?: number;
  /** 连接成功的回调 */
  openCb?: CallBack;
  /** 收到消息的回调 */
  messageCb?: CallBack;
  /** 关闭的回调 */
  closeCb?: CallBack;
}

class Socket<T> extends Heart{
  public ws: WebSocket;

  private reconnectTimer;

  private RECONNECT_COUNT: number;

  private options: Ioptions<T> = {
    url: null,
    heartTime: 5000,
    heartMsg: "ping",
    isReconnect: true,
    reconnectTime: 5000,
    reconnectCount: 5,
    openCb: (e: Event) => console.log("ws连接成功的回调"),
  };

  constructor(ops: Ioptions<T>) {
    super()
    Object.assign(this.options, ops);
  }

  create(): void {
    if (!("WebSocket" in window)) {
      throw new Error("当前浏览器不支持，无法使用");
    }

    this.ws = new WebSocket(this.options.url);

    this.onopen(this.options.openCb);
    this.onclose(this.options.closeCb);
    this.onmessage(this.options.messageCb);

    // this.
  }
  onopen(callback: CallBack): void {
    this.ws.onopen = (event) => {
      clearTimeout(this.reconnectTimer);

      if (typeof callback === "function") {
        callback(event);
      }
    };
  }

  /**
   * 自定义关闭事件
   * 如果callback存在，调用callback，不存在调用OPTIONS中的回调
   * @param {Function} callback 回调函数
   */
  onclose(callback) {
    this.ws.onclose = (event) => {
      //   super.reset();
      this.onreconnect();
      if (typeof callback === "function") {
        callback(event);
      } else {
        typeof this.options.closeCb === "function" &&
          this.options.closeCb(event);
      }
    };
  }

  /**
   * 连接事件
   */
  onreconnect() {
    if (this.options.reconnectCount > 0 || this.options.reconnectCount === -1) {
      this.reconnectTimer = setTimeout(() => {
        this.create();
        if (this.options.reconnectCount !== -1) this.options.reconnectCount--;
      }, this.options.reconnectTime);
    } else {
      clearTimeout(this.reconnectTimer);
      this.options.reconnectCount = this.RECONNECT_COUNT;
    }
  }

  /**
   * 自定义消息监听事件
   * 如果callback存在，调用callback，不存在调用OPTIONS中的回调
   * @param {Function} callback 回调函数
   */
  onmessage(callback) {
    this.ws.onmessage = (event) => {
      // 收到任何消息，重新开始倒计时心跳检测
      super.reset().start(() => {
        this.send(this.options.heartMsg);
      });
      if (typeof callback === "function") {
        callback(event.data);
      } else {
        typeof this.options.messageCb === "function" &&
          this.options.messageCb(event.data);
      }
    };
  }

  send(data: T | string): void {
    if (this.ws.readyState !== this.ws.OPEN) {
      throw new Error("没有连接到服务器, 无法推送");
    }
    this.ws.send(JSON.stringify(data));
  }
}

export const aa = 5;
