import React, { useEffect, useRef, useState } from "react";
import { connect, JSONCodec, NatsConnection, Subscription } from "nats.ws";

const jc = JSONCodec();

/**
 * 自定义的natsio的hook
 * @param url natIO 连接的地址
 * @param autoUnSub 是否自动取消所有订阅
 * @returns
 */
function useNatws(url: string, autoUnSub = false) {
  const [conn, setConnection] = useState<NatsConnection>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  // 初始化连接
  const initConnect = async () => {
    const conn = await connect({ servers: url });
    console.log(conn, 'dsssdfse-f0000')
    await setConnection(conn);
  };

  /**
   * 广播事件
   * @param topic 主题
   * @param payload 负载
   */
  const publish = (topic: string, payload: Record<string, any>) => {
    if (conn) {
      conn.publish(topic, jc.encode(payload));
    } else {
      console.log("no connection exsit");
    }
  };

  /**
   * 订阅事件
   * @param topic 主题
   * @param handle 回调函数
   */
  const subscribe = (
    topic: string,
    handle: (data: Record<string, any>) => void
  ) => {
    if (conn) {
      (async () => {
        const subscription = conn.subscribe(topic);
        console.log(
          subscription.getSubject(),
          "subscriptionsubscriptionsubscription"
        );
        setSubscriptions([...subscriptions, subscription]);
        for await (const m of subscription) {
          console.log(m, m.data, "我我我哦-----");
          const jm = jc.decode(m.data);
          console.log(jm, 'jmjmjm')
          handle(jm);
        }
      })();
    } else {
      console.log("no connection exsit");
    }
  };

  /**
   * 取消订阅 不传取消所有订阅
   * @param topic 主题
   */
  const unSubscribe = (topic?: string) => {
    if (!topic) {
      subscriptions.forEach((sub) => sub.unsubscribe());
    } else {
      subscriptions
        .filter((sub) => sub.getSubject() === topic)
        .forEach((sub) => sub.unsubscribe());
    }
  };

  useEffect(() => {
    initConnect().catch((ex) => {
      console.log(`Error connecting to NATS: ${ex}`);
    });

    return () => {
      if (autoUnSub) {
        unSubscribe();
      }
    };
  }, []);

  return {
    conn,
    publish,
    subscribe,
    unSubscribe,
  };
}

export default useNatws;
