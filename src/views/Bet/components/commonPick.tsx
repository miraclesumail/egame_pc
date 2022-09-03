import { Row } from "@/components/flex";
import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  list: { label: string; value: number }[];
  onChoose: (params: { label: string; value: number }) => void;
}

const Line = styled(Row)`
  width: 320px;
  height: 64px;
  background: #1d1d1d;
  color: #d3af6e;
  cursor: pointer;

  &:hover {
    color: #ffffff;
    background: linear-gradient(37.21deg, #eeab47 -24.69%, #b99454 56.84%);
  }

  &:nth-last-of-type(1) {
    margin-bottom: 30px;
  }
`;

const CommonPick: FC<Props> = ({ list, onChoose }) => {
  return (
    <>
      {list.map((item) => (
        <Line justify="center" key={item.value} onClick={onChoose as any}>
          {item.label}
        </Line>
      ))}

      {/* <Line justify="center">专属服务</Line>
      <Line justify="center">快速电投</Line> */}
    </>
  );
};

export default CommonPick;
