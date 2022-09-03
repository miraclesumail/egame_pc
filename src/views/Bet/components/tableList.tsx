import React, { useEffect } from "react";
import styled from "styled-components";
import { Row, Column } from "@/components/flex";
import CircleProgress from "@/components/circleProgress";
import { drawBigEyeWay, Options } from "@/utils/dewdrop11";
import { formatResultList, initCanvas } from "@/utils/tool";
import { roundData as dataSource } from "../data";

const ListContainer = styled(Column)`
  width: 288px;
  height: 242px;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
`;

const TableInfo = styled(Column)`
  width: 140px;
  height: 106px;
  padding: 5px 13px 15px 13px;
  background: #252822;
`;

const Top = styled(Row)`
  width: 100%;
  height: 42px;
  color: #faf8f4;
`;

const Bot = styled(Row)`
  width: 100%;
  height: 24px;
  color: #d3af6e;
`;

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

const bigEyeOptions: Options = {
  rows: 10,
  columns: 14,
  lineWidth: 1,
  lineColor: "rgba(211, 175, 110, 0.3)",
  cellWidth: 10.6,
  cellHeight: 10.6,
  skipOddLine: true,
  textMap,
  colorMap,
};

const Table = ({ index }) => {
  const initList = formatResultList(dataSource);

  useEffect(() => {
    const ctx = initCanvas(`canvas${index}`, false, 148.4, 108);
    drawBigEyeWay(ctx, initList, bigEyeOptions, [0, 0]);
  }, []);

  return (
    <Row style={{ cursor: "pointer" }}>
      <TableInfo justify="space-between">
        <Top justify="space-between">
          <div>H002</div>
          <CircleProgress
            {...{
              width: 46,
              radius: 20,
              duration: `${Date.now()}_15`,
              callback: () => {
                console.log("停止下注");
              },
            }}
          />
        </Top>
        <Bot justify="center">一房两厅</Bot>
      </TableInfo>
      <canvas id={`canvas${index}`}></canvas>
    </Row>
  );
};

const TableList = () => {
  return (
    <ListContainer>
      {[1, 2, 3].map((item) => (
        <Table key={item} index={item} />
      ))}
    </ListContainer>
  );
};

export default TableList;
