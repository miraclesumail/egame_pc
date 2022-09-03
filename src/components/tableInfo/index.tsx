import React, { FC } from "react";
import styled from "styled-components";
import { Column, Row } from "../flex";

interface Props {
  width: number;
  height: number;
}

const TableInfo = styled(Column)<any>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  padding: 15px 0;
  font-size: 16px;
  color: #fff;
  background: #faf8f4;
  border-right: 2px solid #f0f0f0;

  .tableUnit {

    &:nth-of-type(1) {

      div {
        background: #717171;
        width: 26px;
      }

      span {
        color: #717171;
      }
    }

    &:nth-of-type(2) {

      div {
        width: 26px;
        background: #cb5460;
      }

      span {
        color: #cb5460;
      }
    }

    &:nth-of-type(3) {
      
      div {
        width: 26px;
        background: #4c8ced;
      }

      span {
        color: #4c8ced;
      }
    }

    &:nth-of-type(4) {
      
      div {
        width: 26px;
        background: #486f3a;
      }

      span {
        color: #486f3a;
      }
    }

    &:nth-of-type(5) {
      
      div {
        width: 45px;
        background: #cb5460;
      }

      span {
        color: #cb5460;
      }
    }

    &:nth-of-type(6) {
      
      div {
        width: 45px;
        background: #4c8ced;
      }

      span {
        color: #4c8ced;
      }
    }
  }
`;

const TableUnit = styled(Row)`
  width: 80px;
  div {
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

const ColumnInfo = [
  { title: "局", text: 3 },
  { title: "庄", text: 2 },
  { title: "闲", text: 1 },
  { title: "和", text: 3 },
  { title: "庄对", text: 3 },
  { title: "闲对", text: 2 },
];

const Index: FC<Props> = ({ width, height }) => {
  return (
    <TableInfo justify="space-between" ailgn="center" {...{ width, height }}>
      {ColumnInfo.map(({ title, text }: any) => (
        <TableUnit key={title} justify="space-between" className="tableUnit">
          <div>{title}</div>
          <span>{text}</span>
        </TableUnit>
      ))}
    </TableInfo>
  );
};

export default Index;
