import {
  Options,
  InitData,
  drawDishWay,
  drawBigWay,
  drawBigEyeWay,
  drawSmallWay,
  drawCockroachWay,
} from "@/utils/dewdrop11";
import { formatResultList, initCanvas } from "@/utils/tool";
import React, { FC, useEffect, useRef, useState } from "react";

interface Props {
  dataSource: Record<string, Record<string, any>>;
  width: number;
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
    columns: 8,
    lineWidth: 1,
    lineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: width / 18,
    cellHeight: width / 18,
    textMap,
    colorMap,
  };
  const bigWayOptions: Options = {
    rows: 6,
    columns: 20,
    lineWidth: 1,
    lineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: width / 36,
    cellHeight: width / 36,
    textMap,
    colorMap,
  };
  const bigEyeOptions: Options = {
    rows: 6,
    columns: 40,
    lineWidth: 1,
    lineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: width / 72,
    cellHeight: width / 72,
    skipOddLine: true,
    textMap,
    colorMap,
  };
  const smallWayOptions: Options = {
    rows: 6,
    columns: 20,
    lineWidth: 1,
    lineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: width / 72,
    cellHeight: width / 72,
    skipOddLine: true,
    textMap,
    colorMap,
  };
  const cockroachWayOptions: Options = {
    rows: 6,
    columns: 20,
    lineWidth: 1,
    lineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: width / 72,
    cellHeight: width / 72,
    skipOddLine: true,
    textMap,
    colorMap,
  };

  const canvasWidth =
    dishWayOptions.cellWidth * dishWayOptions.columns +
    bigWayOptions.cellWidth * bigWayOptions.columns +
    dishWayOptions.lineWidth;
  const canvasHeight =
    dishWayOptions.cellHeight * dishWayOptions.rows + dishWayOptions.lineWidth;
  const ctx = initCanvas(canvas, false, canvasWidth, canvasHeight);

  const dishWayWidth = dishWayOptions.cellWidth * dishWayOptions.columns;
  const smallWayWidth = smallWayOptions.cellWidth * smallWayOptions.columns;
  const bigWayHeight = bigWayOptions.cellHeight * bigWayOptions.rows;
  const bigEyeHeight = bigEyeOptions.cellHeight * bigEyeOptions.rows;

  drawDishWay(ctx, initList, dishWayOptions);
  drawBigWay(ctx, initList, bigWayOptions, [dishWayWidth, 0]);
  drawBigEyeWay(ctx, initList, bigEyeOptions, [dishWayWidth, bigWayHeight]);
  drawSmallWay(ctx, initList, smallWayOptions, [
    dishWayWidth,
    bigWayHeight + bigEyeHeight,
  ]);
  drawCockroachWay(ctx, initList, cockroachWayOptions, [
    dishWayWidth + smallWayWidth,
    bigWayHeight + bigEyeHeight,
  ]);

  return ctx;
}

const RoadMap: FC<Props> = ({ dataSource, width }) => {
  const [dataList, setList] = useState(formatResultList(dataSource));
//   const [ctx, setCtx] = useState<any>(null);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = init(dataList, width, ref.current);

    return () => ctx.clearRect(0, 0, width, ref.current?.height);
  }, [width]);

  return <canvas ref={ref}></canvas>;
};

export default RoadMap;
