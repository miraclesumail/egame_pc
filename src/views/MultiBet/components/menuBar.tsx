import React, { useState } from "react";
import styled from "styled-components";
import { Row } from "@/components/flex";
import DicePicker from "./dicePicker";

export type Dice = {
  text: number;
  id: number;
  color: string;
  active?: boolean;
};

const dices: Dice[] = [
  { text: 5, color: "#f5d300", id: 0 },
  { text: 10, color: "#f5d300", id: 1 },
  { text: 15, color: "#f5d300", id: 2 },
  { text: 20, color: "#f5d300", id: 3 },
  { text: 25, color: "#f5d300", id: 4 },
  { text: 30, color: "#f5d300", id: 5 },
  { text: 35, color: "#f5d300", id: 6 },
  { text: 40, color: "#f5d300", id: 7 },
  { text: 45, color: "#f5d300", id: 8 },
  { text: 50, color: "#f5d300", id: 9 },
];

interface State {
  dices: Dice[];
  current: number[];
  tempCurrent: number[];
  /** 桌台号码 多台投注时使用 */
  deskNo?: number;
  [key: string]: any;
}

const Menu = styled(Row)`
  width: 348px;
  height: 45px;
  background: rgba(18, 19, 13, 0.95);
`;

const Button = styled(Row)`
  flex: 1;
  height: 45px;
  border: 1px solid #faf8f4;
  color: #fff;
  cursor: pointer;
`;

const MenuBar = ({
  chooseChip,
  current,
  choose,
  setChoose,
  openDesk,
}) => {

  return (
    <Row>
      <Menu>
        <Button justify="center" onClick={openDesk}>
          换桌台
        </Button>
        <Button justify="center">重复下注</Button>
        <Button justify="center">取消</Button>
        <Button justify="center">确定</Button>
      </Menu>
      <DicePicker {...{ current, choose, chooseChip, setChoose }} />
    </Row>
  );
};

export default MenuBar;
