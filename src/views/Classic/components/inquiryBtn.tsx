import React, { FC } from "react";
import styled from "styled-components";
import { Column, Row } from "@/components/flex";

interface Props {
  bigeye: "banker" | "player";
  smallroad: "banker" | "player";
  cockroachPig: "banker" | "player";
  inquiry: (type: "banker" | "player") => void;
}

const Container = styled(Column)`
  padding: 30px 0;
  width: 75px;
  height: 296px;
  background: #faf8f4;
`;

const Hollow = styled(Row)<any>`
  width: ${({ width }: any) => `${width}px`};
  height: ${({ height }: any) => `${height}px`};
  border-radius: ${({ borderRadius, width }: any) =>
    `${borderRadius | (width / 2)}px`};
  border: ${({ borderWidth, boderColor }: any) =>
    `${borderWidth | 1}px solid ${boderColor}`};
`;

const Solid = styled(Column)<any>`
  width: ${({ width }: any) => `${width}px`};
  height: ${({ height }: any) => `${height}px`};
  border-radius: ${({ borderRadius, width }: any) =>
    `${borderRadius | (width / 2)}px`};
  background: ${({ background }: any) => background};
`;

const Line = styled.span<any>`
  width: 20px;
  height: 20px;
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

const Text = styled.div<any>`
  width: ${({ width }: any) => `${width}px`};
  height: ${({ height }: any) => `${height}px`};
  font-size: ${({ fontSize }: any) => `${fontSize || 12}px`};
  color: ${({ color }: any) => color};
`;

const InquiryBtn: FC<Props> = ({
  bigeye,
  smallroad,
  cockroachPig,
  inquiry,
}) => {
  return (
    <Container justify="space-between">
      <Solid
        {...{
          width: 34,
          height: 105,
          borderRadius: 100,
          background: "#EFEFEF",
        }}
        style={{ padding: "8px 0", cursor: "pointer" }}
        justify="flex-start"
        align="center"
        onClick={() => inquiry("banker")}
      >
        <Text
          {...{ width: 24, height: 24, fontSize: 24, color: "#CB5460" }}
          style={{ marginBottom: 13 }}
        >
          庄
        </Text>
        <Hollow
          {...{ width: 20, height: 20, boderColor: "#4C8CED", borderWidth: 2 }}
          style={{ marginBottom: 13 }}
        />
        <Line background={"#4C8CED"} />
      </Solid>
      <Solid
        {...{
          width: 34,
          height: 105,
          borderRadius: 100,
          background: "#EFEFEF",
        }}
        style={{ padding: "8px 0", cursor: "pointer" }}
        onClick={() => inquiry("player")}
      >
        <Text
          {...{ width: 24, height: 24, fontSize: 24, color: "#4C8CED" }}
          style={{ marginBottom: 13 }}
        >
          闲
        </Text>
        <Hollow
          {...{ width: 20, height: 20, boderColor: "#CB5460", borderWidth: 2 }}
          style={{ marginBottom: 13 }}
        />
        <Line background={"#CB5460"} />
      </Solid>
    </Container>
  );
};

export default InquiryBtn;
