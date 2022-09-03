/* eslint-disable @typescript-eslint/member-ordering */
import { connect, StringCodec } from 'nats.ws';
import { Communicator } from './tool';
export class MyWS {
  static socket = null;
  private sc = null;
  private listenerEventList = [];
  private options = {
    // 链接地址
    reconnect: true,
    // user: '',
    // pass: '',
    pingInterval: 10000,
    reconnectTimeWait: 10000,
    timeout: 20000,
    servers: [process.env.REACT_APP_WS_URL]
  };
  static read = (instance) => {
    return instance;
  };
  static instance;
  constructor(options = {}) {
    if (MyWS.instance) throw new Error('ws已经建立,请勿重复创建!!');
    this.options = {
      ...this.options,
      ...options
    };
    this.WebSocketConnect();
  }
  get socket() {
    return MyWS.socket;
  }
  set socket(value) {
    MyWS.socket = value;
  }
  private setData = (data = {}) => {
    const actionData = {
      action: 'test',
    };
    // 可以在这里格式化数据
    Object.assign(actionData, data);
    return actionData;
  };
  // 传入一个事件id 返回一个事件描述
  private getEvent = (eventId = 0) => {
    const id = typeof eventId !== 'string' ? eventId.toString() : eventId;
    const eventList = [
      {
        key: '1',
        describe: '事件1'
      },
      {
        key: '2',
        describe: '事件2'
      },
      {
        key: '3',
        describe: '事件3'
      },
      {
        key: '4',
        describe: '事件4'
      },
      {
        key: '5',
        describe: '事件5'
      }
    ];
    const actionEvent = eventList.find((e) => e.key === id);
    if (actionEvent) return actionEvent;
    return {
      key: id,
      describe: '没有定义相关事件'
    };
  };
  WebSocketConnect = async () => {
    this.socket = await connect({
      ...this.options
    });
    MyWS.instance = this;
    this.sc = StringCodec();
    // 这里再初始化成功时创建一个监听时间
    this.createEventListener('foo', null);
    MyWS.read(this);
  };
  private decode = (data) => {
    // 解码
    return data
  };
  createEventListener = async (evnetName, callBack) => {
    try {
      if (this.listenerEventList.includes(evnetName)) return;
      this.listenerEventList.push(evnetName);
      const sub = this.socket.subscribe(evnetName);
      console.log(`开始监听socket事件 : ${evnetName}`);
      for await (const m of sub) {
        const data = this.decode(m.data);
        if (callBack) {
          callBack(data);
          continue;
        };
        const actionData = this.setData(data);
        console.log(`事件:${evnetName};\n数据:\n`, data);
        if (Communicator.action(actionData.action, actionData)) continue;
        // 这里传入事件id
        const errEvent = this.getEvent(data.id);
        console.error(`\n触发了\n{\n  "事件key":"${errEvent.key}",\n  "描述":"${errEvent.describe}"\n}\n事件,但没有处理!\n${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
}