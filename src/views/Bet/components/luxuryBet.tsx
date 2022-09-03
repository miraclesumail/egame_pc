import React, { FC, ReactNode } from "react";
import { BetType } from "@/store/slices/bet.slice";
import styled, { CSSProperties } from "styled-components";
import ChipStack from "@/views/Bet/components/chipStack";
import { Communicator } from "@/utils/tool";
import store from "@/store";

interface Props {
  fillColor: string;
  category: BetType;
  x: number;
  y: number;
  transform: CSSProperties;
  children: ReactNode;
}

const HoverG = styled.g<Pick<Props, "fillColor">>`
  .textLight {
    display: none;
  }
  &.active {
    cursor: pointer;
    fill: ${(props: any) => props.fillColor};
    .textLight {
      display: block;
    }
  }
`;

const Index: FC<Props> = ({ fillColor, category, transform, x, y, children }) => {
  const onMouseDown = (e: MouseEvent) => {
    (e.currentTarget as HTMLElement).classList.remove("active");
  };

  const onMouseUp = (e: MouseEvent) => {
    (e.currentTarget as HTMLElement).classList.add("active");
  };

  const onMouseEnter = (e: MouseEvent) => {
    (e.currentTarget as HTMLElement).classList.add("active");
  };

  const onMouseLeave = (e: MouseEvent) => {
    (e.currentTarget as HTMLElement).classList.remove("active");
  };

  const onClick = () => {
    Communicator.action("addChips", { category, store });
  };

  return (
    <HoverG
      fill="transparent"
      {...({
        fillColor,
        transform,
        onMouseDown,
        onMouseUp,
        onMouseEnter,
        onMouseLeave,
        onClick,
      } as any)}
    >
      {children}
      <ChipStack {...{ category, x, y }} />
    </HoverG>
  );
};

export default Index;
