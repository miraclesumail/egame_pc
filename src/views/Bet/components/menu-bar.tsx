import React from "react";
import styled from "styled-components";
import { Row, Column } from "@/components/flex";
import CircleProgress from '@/components/circleProgress'
import { useSelector, useDispatch } from "react-redux";
import { resetChipsStack, setIsLottery } from "@/store/slices/bet.slice";
import ChipContainer from "./chipContainer";

const MenuWrap = styled(Row)`
  width: 743px;
  height: 50px;
  background: rgba(18, 19, 13, 0.95);
  border: 1px solid #ffffff;
  border-right: none;
  border-radius: 12px 0px 0px 0px;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const DeskDetail = styled(Column)`
  color: #ffffff;
  height: 40px;

  span {
    &:nth-of-type(1) {
      font-size: 12px;
    }

    &:nth-of-type(2) {
      font-size: 15px;
    }
  }
`;

const DeskInfo = styled(Row)`
  width: 130px;
  height: 50px;
  border-right: 1px solid #ffffff;
  padding: 0 20px;
`;

const Circle = styled.div`
  width: 38px;
  height: 38px;
  background: #3c5f30;
  border-radius: 50%;
  text-align: center;
  line-height: 38px;
  font-size: 18px;
  color: #ffffff;
`;

const Operation = styled.div`
  width: 60px;
  height: 50px;
  border-right: 1px solid #ffffff;
  text-align: center;
  line-height: 50px;
  font-size: 15px;
  color: #ffffff;
  cursor: pointer;
`;

const MenuBar = () => {
  const dispatch = useDispatch();

  return (
    <MenuWrap>
      <DeskInfo {...{ justify: "space-between" }}>
        {/* <Circle>10</Circle> */}
        <CircleProgress
          {...{
            width: 46,
            radius: 20,
            duration: `${Date.now()}_15`,
            callback: () => {
              console.log('停止下注')
            }
          }}
        />
        <DeskDetail {...{ justify: "space-between" }}>
          <span>桌号</span>
          <span>H001</span>
        </DeskDetail>
      </DeskInfo>
      <Operation>重复</Operation>
      <Operation onClick={() => dispatch(setIsLottery(true))}>确定</Operation>
      <Operation onClick={() => dispatch(resetChipsStack())}>取消</Operation>
      <Operation>飞牌</Operation>
      <ChipContainer />
    </MenuWrap>
  );
};

export default MenuBar;
