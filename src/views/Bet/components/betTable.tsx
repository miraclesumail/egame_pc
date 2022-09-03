import React, { FC } from "react";
import { Row } from "@/components/flex";
import styled from "styled-components";

const dataSource = [
  { seat: 1, member: "昵称A", amount: 666 },
  { seat: 2, member: "昵称B", amount: 777 },
];

const Table = styled.div`
  width: 670px;
  background: #212122;
`;

interface TableColumn {
  color: string;
  background: string;
}

interface TableProps {
  head: { text: string; field: string }[];
}

const TableContent = styled(Row)<TableColumn>`
  height: 36px;

  div {
    height: 36px;
    line-height: 36px;
    font-size: 15px;
    text-align: center;
    color: ${({ color }) => color};
    background: ${({ background }) => background};
    &:nth-of-type(1) {
      width: 135px;
    }

    &:nth-of-type(2),
    &:nth-of-type(3) {
      width: 267px;
    }
  }
`;

const BetTable: FC<TableProps> = ({ head }) => {
  return (
    <Table>
      <TableContent {...{ color: "#E5C180", background: "#212122" }}>
        {head.map((item, index) => (
          <div key={item.field}>{item.text}</div>
        ))}
      </TableContent>

      <div>
        {dataSource.map((item, index) => (
          <TableContent
            key={item.seat}
            {...{ color: "#fff", background: "#1B1B1C" }}
          >
            <div>{item.seat}</div>
            <div>{item.member}</div>
            <div>{item.amount}</div>
          </TableContent>
        ))}
      </div>
    </Table>
  );
};

export default BetTable;
