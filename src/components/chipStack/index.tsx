import React, { FC } from "react";
import styled from "styled-components";
import useQueryDesk from "@/views/Bet/hooks/useQueryDesk";
import { smallChips } from "@/views/Bet/data";
import { formatAmount, sumNumberPart } from "@/utils/tool";
import { BetType } from "@/store/slices/bet.slice";

interface Props {
  chipWidth: number;
  chipHeight: number;
  category: BetType;
  initPosition: Record<string, number>;
}

const Container = styled.div<any>`
  position: absolute;
  width: ${(props: any) => `${props.width}px`};
  height: ${(props: any) => `${props.height}px`};
  left: ${(props: any) => `${props.left}px`};
  bottom: ${(props: any) => `${props.bottom}px`};

  img,
  span {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ChipStack: FC<Props> = ({ chipWidth, chipHeight, initPosition: { left, bottom }, category }) => {
  const { sumMap, chipsMap } = useQueryDesk();
  const resultArr = sumNumberPart(chipsMap[category]);

  return (
    <Container {...{ width: chipWidth, height: chipHeight, left, bottom }}>
      {resultArr.map((item, index) => (
        <img
          key={index}
          src={smallChips[item]}
          width={chipWidth}
          style={{ transform: `translateY(-${index * 4}px)` }}
        />
      ))}
      {sumMap[category] ? (
        <span style={{ transform: `translateY(-${resultArr.length * 4 + 20}px)` }}>
          {formatAmount(sumMap[category])}
        </span>
      ) : null}
    </Container>
  );
};

export default ChipStack;
