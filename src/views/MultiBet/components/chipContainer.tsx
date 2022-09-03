import React, { FC } from "react";
import classnames from "classnames";
import styled from "styled-components";
import { chips } from "@/views/Bet/data";
import { Row } from "@/components/flex";

type Coins = {
  id: number;
  text: string;
  amount: number;
};

export const coins: Coins[] = [
  {
    id: 0,
    text: "100",
    amount: 100,
  },
  {
    id: 1,
    text: "500",
    amount: 500,
  },
  {
    id: 2,
    text: "1千",
    amount: 1000,
  },
  {
    id: 3,
    text: "2千",
    amount: 2000,
  },
  {
    id: 4,
    text: "5千",
    amount: 5000,
  },
  {
    id: 5,
    text: "1万",
    amount: 10000,
  },
  {
    id: 6,
    text: "2万",
    amount: 20000,
  },
  {
    id: 7,
    text: "5万",
    amount: 50000,
  },
  {
    id: 8,
    text: "10万",
    amount: 100000,
  },
  {
    id: 8,
    text: "10万",
    amount: 100000,
  },
];

const ChipWrap = styled(Row)`
  width: 340px;
  padding: 0 15px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Chip = styled.div<any>`
  width: ${(props: any) => `${props.width}px`};
  height: ${(props: any) => `${props.height}px`};
  position: relative;
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  background-size: 100%;
  margin-right: ${(props: any) => `${props.noRight ? "0" : "18px"}`};
  margin-bottom: 20px;
  cursor: pointer;
`;

const ChipContainer: FC<any> = ({ tempCurrent, addToTempcurrent }) => {
  return (
    <ChipWrap>
      {coins.map(({ id, text, amount }, index) => (
        <Chip
          key={id}
          {...{
            width: 64,
            height: 52,
            src: tempCurrent.includes(index)
              ? chips[index].activeSrc
              : chips[index].src,
            noRight: !((index + 1) % 4),
          }}
          onClick={() => {
            if (!tempCurrent.includes(index)) {
              addToTempcurrent(index);
            }
          }}
        ></Chip>
      ))}
    </ChipWrap>
  );
};

export default ChipContainer;
