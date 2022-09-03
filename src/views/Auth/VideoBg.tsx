/**
 * 视频背景
 */

import React, { FC } from "react"
import styled from "styled-components"
import {Column} from "@/components/flex";
const loginVideo = require("../../assets/video/loginVideo.mp4")

const VideoView = styled(Column)`
  height: 100%;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
  }
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
`;

interface Props {
}

const VideoBg = ({children}) => {
    return (
        <VideoView ailgn="center" justify="center">
            <div className="bg"></div>
            <video src={loginVideo} muted loop></video>
            {children}
        </VideoView>
    )
}
export default VideoBg
