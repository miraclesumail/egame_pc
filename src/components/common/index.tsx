import React from "react";
import styled from "styled-components";
import { Column, Row } from "../flex";

const Hollow = styled(Row)<any>`
  width: ${({ width }: any) => `${width}px`};
  height: ${({ height }: any) => `${height}px`};
  border-radius: ${({ borderRadius, height }: any) =>
    `${borderRadius | (height / 2)}px`};
  border: ${({ borderWidth, borderColor }: any) =>
    `${borderWidth | 1}px solid ${borderColor}`};
`;

const Solid = styled(Column)<any>`
  width: ${({ width }: any) => `${width}px`};
  height: ${({ height }: any) => `${height}px`};
  border-radius: ${({ borderRadius, height }: any) =>
    `${borderRadius | (height / 2)}px`};
  background: ${({ background }: any) => background};
  color: ${({ color }: any) => color};
`;

const Line = styled.span<any>`
  width: ${({ width }: any) => `${width}px`};
  height: ${({ height }: any) => `${height}px`};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: calc(50% - 1px);
    top: 0;
    width: 2px;
    height: 100%;
    background: ${(props: any) => props.background};
    transform: rotate(45deg);
    transform-origin: center center;
  }
`;

export { Solid, Hollow, Line };
