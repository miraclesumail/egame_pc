import React, { FC, ReactNode, useEffect, useState } from "react";
import useEventListener from "@/utils/hooks/useEventListener";
import { Throttle } from "@/utils";
import styled from "styled-components";

interface Props {
  width: number;
  height: number;
  align?: "top" | "center";
  children: ReactNode;
}

const Container = styled.div<any>`
  width: ${(props: any) => `${props.width}px`};
  height: ${(props: any) => `${props.height}px`};
  overflow-y: auto;
  transform: ${({ scale, translateX, translateY }: any) =>
    `translate(${translateX}px,${translateY}px) scale(${scale})`};
  margin: 0 auto;
  transform-origin: ${({ align }) =>
    `${align === "center" ? "center center" : "center top"}`}; ;
`;

/**
 * 通用缩放的容器
 * width/height 原始宽高
 * align 对齐方式
 * @param param0 
 * @returns 
 */
const Wrap: FC<Props> = ({ width, height, align = "top", children }) => {
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  useEventListener("resize", new Throttle(onResize, 30).run);

  function onResize() {
    console.log("onResize");
    const nowWidth = document.body.clientWidth;
    const nowHeight = document.body.clientHeight;

    if (align === "center") {
      setTranslateY((nowHeight - height) / 2);
    }

    const x_ratio = nowWidth / width;
    const y_ratio = nowHeight / height;

    setTranslateX(width > nowWidth ? (nowWidth - width) / 2 : 0);
    setScale(Math.min(x_ratio, y_ratio, 1));
  }
  useEffect(onResize, []);

  return (
    <Container
      className="wrap"
      {...{ width, height, scale, translateX, translateY, align }}
    >
      {children}
    </Container>
  );
};

export default Wrap;