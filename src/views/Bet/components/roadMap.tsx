import React, { FC, useEffect } from "react";
import {
  Options,
  InitData,
  drawDishWay,
  drawBigWay,
  drawBigEyeWay,
  drawSmallWay,
  drawCockroachWay,
} from "@/utils/dewdrop";
import styled from "styled-components";
import { Row, Column } from "@/components/flex";
import { formatResultList, initCanvas } from "@/utils/tool";
import InquiryButton from './inquiryButton'
import TableList from './tableList'

const ColumnInfo = [
  { title: "局", text: 3, background: "#717171", width: 26 },
  { title: "庄", text: 2, background: "#CB5460", width: 26 },
  { title: "闲", text: 1, background: "#4C8CED", width: 26 },
  { title: "和", text: 3, background: "#486F3A", width: 26 },
  { title: "庄对", text: 3, background: "#CB5460", width: 45 },
  { title: "闲对", text: 2, background: "#4C8CED", width: 45 },
];

const Container = styled(Row)``;

const TableInfo = styled(Column)`
  width: 100px;
  height: 242px;
  padding: 15px 0;
  font-size: 16px;
  color: #fff;
  background: #FAF8F4;
  border-right: 2px solid #f0f0f0; ;
`;

const TableUnit = styled(Row)`
  width: 80px;
  div {
    width: ${(props: any) => `${props.width}px`};
    background: ${(props: any) => props.background};
    border-radius: 13px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    font-size: 16px;
  }

  span {
    color: ${(props: any) => props.background};
    font-size: 15px;
  }
`;
interface Props {
  dataSource: Record<string, Record<string, any>>;
}

function init(initList: InitData[]) {
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

  // gridLineColor: string
  // gridLineWidth: number
  const dishWayOptions: Options = {
    rows: 6,
    columns: 10,
    gridLineWidth: 1,
    gridLineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: 40,
    cellHeight: 40,
    pairRadius: 6,
    textMap,
    colorMap,
  };
  const bigWayOptions: Options = {
    rows: 6,
    columns: 24,
    gridLineWidth: 1,
    gridLineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: 20,
    cellHeight: 20,
    pairRadius: 4,
    textMap,
    colorMap,
  };
  const bigEyeOptions: Options = {
    rows: 6,
    columns: 48,
    gridLineWidth: 1,
    gridLineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: 10,
    cellHeight: 10,
    skipOddLine: true,
    textMap,
    colorMap,
  };
  const smallWayOptions: Options = {
    rows: 6,
    columns: 24,
    gridLineWidth: 1,
    gridLineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: 10,
    cellHeight: 10,
    skipOddLine: true,
    textMap,
    colorMap,
  };
  const cockroachWayOptions: Options = {
    rows: 6,
    columns: 24,
    gridLineWidth: 1,
    gridLineColor: "rgba(211, 175, 110, 0.3)",
    cellWidth: 10,
    cellHeight: 10,
    skipOddLine: true,
    textMap,
    colorMap,
  };

  const canvasWidth =
    dishWayOptions.cellWidth * dishWayOptions.columns +
    bigWayOptions.cellWidth * bigWayOptions.columns +
    dishWayOptions.gridLineWidth;
  const canvasHeight =
    dishWayOptions.cellHeight * dishWayOptions.rows + dishWayOptions.gridLineWidth;
  const ctx = initCanvas("canvas", false, canvasWidth, canvasHeight);

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
}

const RoadMap: FC<Props> = ({ dataSource }) => {
  let timer: NodeJS.Timer;
  const initList = formatResultList(dataSource);

  useEffect(() => {
    init(initList);
  }, []);

  function inquiry(winner: "banker" | "player") {
    let i = 0;
    const list: InitData[] = [
      ...initList,
      { pair: "0", winner, inquiry: true },
    ];
    init(list);
    clearInterval(timer);
    timer = setInterval(() => {
      if (i % 2) {
        init(list);
      } else {
        init(initList);
      }
      if (i === 4) clearInterval(timer);
      i++;
    }, 1000);
  }

  return (
    <Container>
      <canvas id={"canvas"}></canvas>
      <TableInfo justify="space-between" ailgn="center">
        {ColumnInfo.map(({ title, text, background, width }: any) => (
          <TableUnit
            key={title}
            justify="space-between"
            {...{ width, background }}
          >
            <div>{title}</div>
            <span>{text}</span>
          </TableUnit>
        ))}
      </TableInfo>
      <InquiryButton inquiry={inquiry}/>
      <TableList/>
    </Container>
  );
};

export default RoadMap;
