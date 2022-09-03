import React, { useEffect, FC } from 'react'

const FlvPlayer: FC<any> = ({width, height, id}) => {
  useEffect(() => {
    let player;

    window.NodePlayer.load(() => {
       console.log('阿基德凤山街道富家大室')

       player = new window.NodePlayer();


      /**
       * 自动测试浏览器是否支持MSE播放，如不支持，仍然使用软解码。
       * 紧随 new 后调用
       * 不调用则只使用软解
       */
      // player.useMSE();

      /**
       * 开启屏幕常亮
       * 在手机浏览器上,canvas标签渲染视频并不会像video标签那样保持屏幕常亮
       * 如果需要该功能, 可以调用此方法
       * H5目前在chrome\edge 84, android chrome 84及以上有原生亮屏API, 需要是https页面
       * 其余平台为模拟实现，非全兼容。
       */
      player.setKeepScreenOn();

      /**
       * 传入 canvas视图的id，当使用mse时，自动转换为video标签
       */
      player.setView(id);

      /**
       * 设置最大缓冲时长，单位毫秒，只在软解时有效
       */
      player.setBufferTime(1000);

      /**
       * 设置超时时长, 单位秒,只在软解时有效
       * 在连接成功之前和播放中途,如果超过设定时长无数据返回,则回调timeout事件
       */
      // player.setTimeout(10);

      player.on("start", () => {
        console.log("player on start");
      });

      player.on("stop", () => {
        console.log("player on stop");
      });

      // @ts-ignore
      player.on("error", (e) => {
        console.log("player on error", e);
      });

      // @ts-ignore
      player.on("videoInfo", (w, h, codec) => {
        console.log("player on video info width=" + w + " height=" + h + " codec=" + codec);
      });
      // @ts-ignore
      player.on("audioInfo", (r, c, codec) => {
        console.log("player on audio info samplerate=" + r + " channels=" + c + " codec=" + codec);
      });

      // player.on("metadata", (metadata) => {
      //   var m = NodePlayer.AMF.parseScriptData(metadata.buffer, 0, metadata.length);
      //   console.log(m);
      // });

      // player.on("videoSei", (sei, pts) => {
      //   console.log("player on video sei=" + sei + " pts=" + pts);
      // });

      // player.on("videoFrame", (pts) => {
      //   console.log("player on videoFrame pts=" + pts);
      // });

      // player.on("timeout", () => {
      //   console.log("player on timeout");
      //   player.stop();
      // });

      // player.on("buffer", (state) => {
      //   console.log("player on buffer state=" + state);
      // });

      // @ts-ignore
      player.on("stats", (stats) => {
        console.log("player on stats=", stats);
      });

      player.start('https://pull-tx.cgcxs.net/live/cg01_m.flv?txSecret=9d34f2574174f17ab449b935a947bbeb&txTime=81C97A38');

    })
  }, [] )

  return (
    <canvas id={id} {...{width, height}}></canvas>

  )
}

export default FlvPlayer