import {
  Options,
  InitData,
  drawDishWay,
  drawBigWay,
  drawBigEyeWay,
  drawSmallWay,
  drawCockroachWay,
} from "@/utils/dewdrop";
import { formatResultList, initCanvas } from "@/utils/tool";
import React, {
  FC,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  ForwardRefExoticComponent,
  forwardRef,
  Ref,
} from "react";

interface Props {
  dataSource: Record<string, Record<string, any>>;
  width: number;
  [key: string]: any;
}

const textMap = {
  banker: "庄",
  player: "闲",
  tie: "和",
};
const colorMap = {
  banker: "#CB5460",
  player: "#4C8CED",
  tie: "#4ea950",
};

function init(initList: InitData[], width: number, canvas: HTMLCanvasElement) {
  const dishWayOptions: Options = {
    rows: 6,
    columns: 10,
    gridLineWidth: 1,
    gridLineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: width / 35,
    cellHeight: width / 35,
    pairRadius: 6,
    textMap,
    colorMap,
  };
  const bigWayOptions: Options = {
    rows: 6,
    columns: 50,
    gridLineWidth: 1,
    gridLineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: width / 70,
    cellHeight: width / 70,
    pairRadius: 4,
    textMap,
    colorMap,
  };
  const bigEyeOptions: Options = {
    rows: 6,
    columns: 100,
    gridLineWidth: 1,
    gridLineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: width / 140,
    cellHeight: width / 140,
    skipOddLine: true,
    textMap,
    colorMap,
  };
  const smallWayOptions: Options = {
    rows: 6,
    columns: 50,
    gridLineWidth: 1,
    gridLineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: width / 140,
    cellHeight: width / 140,
    skipOddLine: true,
    textMap,
    colorMap,
  };
  const cockroachWayOptions: Options = {
    rows: 6,
    columns: 50,
    gridLineWidth: 1,
    gridLineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: width / 140,
    cellHeight: width / 140,
    skipOddLine: true,
    textMap,
    colorMap,
  };

  const canvasWidth =
    dishWayOptions.cellWidth * dishWayOptions.columns +
    bigWayOptions.cellWidth * bigWayOptions.columns +
    dishWayOptions.gridLineWidth;
  const canvasHeight = dishWayOptions.cellHeight * dishWayOptions.rows + dishWayOptions.gridLineWidth;
  const ctx = initCanvas(canvas, false, canvasWidth, canvasHeight);

  const dishWayWidth = dishWayOptions.cellWidth * dishWayOptions.columns;
  const smallWayWidth = smallWayOptions.cellWidth * smallWayOptions.columns;
  const bigWayHeight = bigWayOptions.cellHeight * bigWayOptions.rows;
  const bigEyeHeight = bigEyeOptions.cellHeight * bigEyeOptions.rows;

  drawDishWay(ctx, initList, dishWayOptions);
  drawBigWay(ctx, initList, bigWayOptions, [dishWayWidth, 0]);
  drawBigEyeWay(ctx, initList, bigEyeOptions, [dishWayWidth, bigWayHeight]);
  drawSmallWay(ctx, initList, smallWayOptions, [dishWayWidth, bigWayHeight + bigEyeHeight]);
  drawCockroachWay(ctx, initList, cockroachWayOptions, [dishWayWidth + smallWayWidth, bigWayHeight + bigEyeHeight]);

  return ctx;
}

let timer;

const RoadMap: ForwardRefExoticComponent<Props> = forwardRef(({ dataSource, width }: Props, ref: Ref<any>) => {
  const [dataList, setList] = useState(formatResultList(dataSource));
  //   const [ctx, setCtx] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    inquiry
  }));

  function inquiry(winner: "banker" | "player") {
    let i = 0;
    const list: InitData[] = [...dataList, { pair: "0", winner, inquiry: true }];
    clearInterval(timer)
    init(list, width, canvasRef.current);
    // clearInterval(timer);
    timer = setInterval(() => {
      if (i % 2) {
        init(list, width, canvasRef.current);
      } else {
        init(dataList, width, canvasRef.current);
      }
      if (i === 4) clearInterval(timer);
      i++;
    }, 1000);
  }

  useEffect(() => {
    const ctx = init(dataList, width, canvasRef.current);

    return () => ctx.clearRect(0, 0, width, canvasRef.current?.height);
  }, [width]);

  return <canvas ref={canvasRef}></canvas>;
});

export default RoadMap;
