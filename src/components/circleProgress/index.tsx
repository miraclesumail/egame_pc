import React, {
  MutableRefObject,
  useEffect,
  useRef,
  FC,
  useState,
  useMemo,
} from "react";
  import { Row } from "@/components/flex";
import styled from "styled-components";

const Container = styled(Row)<any>`
  position: relative;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3c5f30;
  width: ${(props: any) => `${props.width}px`};
  height: ${(props: any) => `${props.width}px`};
`;

const Canvas = styled.canvas<any>`
  position: absolute;
  /* width: ${(props: any) => `${props.width}px`};
   height: ${(props: any) => `${props.width}px`}; */
  top: 0;
  left: 0;
`;

const Text = styled.div`
  color: #fff;
  font-size: 15px;
  &.warning {
    color: #ab2b20;
  }
`;

interface Props {
  // valuesArr: number[];
  width: number;
  radius: number;
  duration: string;
  callback: () => void;
}

// canvas参数
type DrawParams = {
  ctx: CanvasRenderingContext2D;
  /** 坐标x */
  x: number;
  /** 坐标y */
  y: number;
  /** 半径 */
  r: number;
  /** 起始角度 */
  sRadian: number;
  /** 结束角度 */
  eRadian: number;
  color: string;
};

type DrawFunc = (params: DrawParams) => void;

const drawCircle: DrawFunc = ({ ctx, x, y, r, sRadian, eRadian, color }) => {
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, sRadian, eRadian, false);
  ctx.stroke();
};

function useIntervalFunc(
  interval: number,
  count: number,
  callback: () => void
) {
  const timer = useRef<any>();
  const func: MutableRefObject<any> = useRef<Function>();
  const countRef = useRef<number>(0);

  const start = () => {
    if (countRef.current > count) {
      callback && callback();
      countRef.current = 0;
      stop();
      return;
    }
    func.current();
    countRef.current++;
    timer.current = setTimeout(start, interval);
  };

  const stop = () => {
    clearTimeout(timer.current as any);
    timer.current = null;
  };

  const startCall = (fn: Function) => {
    func.current = fn;
    start();
  };

  return {
    start: startCall,
    stop,
  };
}

const CircleProgress: FC<Props> = ({ width, duration, radius, callback }) => {
  const ref: MutableRefObject<
    HTMLCanvasElement | undefined
  > = useRef<HTMLCanvasElement>();
  let [index, setIndex] = useState(0);

  const { start, stop } = useIntervalFunc(
    1000,
    Number(duration.match(/^\d+_(\d+)$/)[1]),
    callback
  );

  const valuesArr = useMemo(
    () =>
      Array.from(
        { length: Number(duration.match(/^\d+_(\d+)$/)[1]) },
        (_, index) => Number(duration.match(/^\d+_(\d+)$/)[1]) - index
      ),
    [duration]
  );

  function startPaint(duration, index) {
    (ref.current as HTMLCanvasElement).width = width;
    (ref.current as HTMLCanvasElement).height = width;
    let tempIndex = index;
    const ctx = (ref.current as HTMLCanvasElement).getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    const generateFunc = () => {
      const oneTurn = (Math.PI * 2) / duration;

      return () => {
        ctx.clearRect(0, 0, width, width);
        ctx.fillStyle = "yellow";
        ctx.font = "24px serif";
        setIndex(tempIndex);

        drawCircle({
          ctx,
          x: 0.5 * width,
          y: 0.5 * width,
          r: radius,
          sRadian: -Math.PI / 2,
          eRadian: Math.PI * 1.5 - tempIndex * oneTurn,
          color: index <= duration / 2 ? "green" : "orange",
        });
        tempIndex++;
      };
    };

    start(generateFunc());
  }

  useEffect(() => {
    startPaint(Number(duration.match(/^\d+_(\d+)$/)[1]), 0);
    return stop;
  }, [width, duration]);

  return (
    <Container {...{ width, height: width }}>
      <Canvas ref={ref as any} />
      <Text className={index <= valuesArr.length / 2 ? "" : "warning"}>
        {valuesArr[index] || 0}
      </Text>
    </Container>
  );
};

export default CircleProgress;