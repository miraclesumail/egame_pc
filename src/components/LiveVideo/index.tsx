import React, {
  useRef,
  MutableRefObject,
  useEffect,
  FC,
  useState,
} from "react";
import { Column } from "../flex";
import styled, { CSSProperties } from "styled-components";
import VideoOffControl from "@/assets/images/bet/VideoOffControl.png";
import VideoExpandControl from "@/assets/images/bet/VideoExpandControl.png";
// @ts-ignore
import flvjs from "flv.js";
// @ts-ignore
import Hls from "hls.js";

interface VideoProps {
  /** 直播源地址 */
  source: string;
  /** 类名 */
  className?: string;
  /** 是否自动播放 默认是 */
  autoPlay?: boolean;
}

const VideoWrap = styled(Column)`
  width: ${(props: CSSProperties) => props.width};
  height: ${(props: CSSProperties) => props.height};
  position: absolute;
  top: 0;
  left: ${(props: CSSProperties) => `calc(50% - ${props.left})`};
  background: #000;
  transform-origin: center top;
  transition: transform 0.5s linear;
  will-change: transform;
  transform: ${({ scale }: any) => `scale(${scale})`};

  video {
    position: absolute;
    width: 500px;
    height: 100%;
    top: 0;
    left: 0;
  }
`;

const VideoControl = styled.div`
  background: url(${VideoOffControl}) no-repeat center;
  background-size: contain;
  width: 35px;
  height: 35px;
  align-self: flex-end;
  z-index: 10;
  transform: translate(-10px, -80px);
  cursor: pointer;
`;

const VideoExpand = styled.div`
  background: url(${VideoExpandControl}) no-repeat center;
  background-size: contain;
  width: 35px;
  height: 35px;
  align-self: flex-end;
  z-index: 10;
  transform: translate(-10px, -70px);
  cursor: pointer;
`;

const VideoTip = styled.div`
  color: #fff;
  font-size: 20px;
`;

/**
 * 视频直播组件
 * @param
 * @returns
 */
const LiveVideo: FC<VideoProps> = ({ source, autoPlay = true }) => {
  const video: MutableRefObject<any> = useRef<HTMLVideoElement>(null);
  const [show, setShow] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  // 是否大屏播放
  const [expand, setExpand] = useState(false);

  // 播放hls协议直播流
  const playHLS = () => {
    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.attachMedia(video.current);

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log("video and hls.js are now bound together !");
        hls.loadSource(source);
        hls.on(Hls.Events.MANIFEST_PARSED, (event: any, data: any) => {
          setShow(false);

          if (autoPlay) {
            video.current.play();
          }
          console.log(
            "manifest loaded, found " + data.levels.length + " quality level"
          );
        });
      });
    }
  };

  // 播放flv协议直播流
  const playFLV = () => {
    if (flvjs.isSupported()) {
      const flvPlayer = flvjs.createPlayer({
        type: "flv",
        url: source,
      });
      flvPlayer.attachMediaElement(video.current);
      flvPlayer.load();
      flvPlayer.play();
    }
  };

  useEffect(() => {
    if (source.endsWith("flv")) {
      playFLV();
    } else {
      playHLS();
    }
  }, []);

  return (
    <VideoWrap
      {...{
        width: "500px",
        height: "277px",
        left: "250px",
        justify: "center",
        scale: expand ? 1.7 : 1,
      }}
    >
      {show ? <VideoTip>视频直播缓冲...</VideoTip> : null}

      <video
        className="full-height full-width"
        id="dplayer"
        ref={video}
        width="100%"
        muted
        style={{ visibility: showVideo ? "visible" : "hidden" }}
      />

      <VideoControl onClick={() => setShowVideo(!showVideo)} />
      <VideoExpand onClick={() => setExpand(!expand)} />
    </VideoWrap>
  );
};

export default LiveVideo;
