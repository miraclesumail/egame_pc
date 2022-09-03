import React, { FC } from "react";
import { Column, Row } from "@/components/flex";
import styled from "styled-components";
import SingleTable from "./singleTable";

interface Props {
  showSelectMask: (category: string) => void;
  onChoose?: (data: any) => void;
}

const Container = styled(Column)``;

const Header = styled(Row)`
  width: 850px;
  height: 85px;
  background: #171717;
  color: #e5c180;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Selector = styled(Row)`
  width: 374px;
  align-self: flex-start;
  margin-bottom: 12px;
  > div {
    width: 108px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    color: #fff;
    background: #171717;
    border-radius: 8px;

    &:hover {
      background: linear-gradient(37.21deg, #eeab47 -24.69%, #b99454 56.84%);
    }
  }
`;

const Content = styled(Column)`
  width: 786px;
`;

const TableRow = styled(Row)`
  > div {
    &:nth-of-type(odd) {
      margin-right: 20px !important;
    }
  }
`;

const TablePick: FC<Props> = ({ showSelectMask, onChoose }) => {
  return (
    <Container>
      <Header justify="center">桌台选择</Header>
      <Content>
        <Selector justify="space-between">
          <div onClick={() => showSelectMask("casino")}>选择赌场</div>
          <div onClick={() => showSelectMask("bet")}>投注类型</div>
          <div onClick={() => showSelectMask("sort")}>限红排序</div>
        </Selector>
      </Content>
      <Content ailgn="flex-start">
        <TableRow justify="space-between" wrap="wrap">
          <SingleTable onClick={onChoose} deskId={1} />
          <SingleTable onClick={onChoose} deskId={2} />
          <SingleTable onClick={onChoose} deskId={3} />
          <SingleTable onClick={onChoose} deskId={4} />
        </TableRow>
      </Content>
    </Container>
  );
};

export default TablePick;
