import React, { FC } from "react";
import styled from "styled-components";
import { Column, Row } from "@/components/flex";

type CircleProps = {
  width: number;
  height: number;
  borderRadius: number;
  background: string;
  marginRight?: number;
};

const Container = styled(Column)`
  width: 430px;
  height: 90px;
  background: #004841;
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px 0;
  color: #fff;
`;

const TopSection = styled(Row)`
  width: 400px;
  height: 51px;
`;

const BotSection = styled(Row)`
  width: 400px;
  height: 28px;
  background: rgba(23, 23, 23, 0.25);
  border-radius: 100px;
`;

const Circle = styled.div<CircleProps>`
  width: ${(props: CircleProps) => `${props.width}px`};
  height: ${(props: CircleProps) => `${props.height}px`};
  border-radius: ${(props: CircleProps) => `${props.borderRadius}px`};
  background: ${(props: CircleProps) => `${props.background}`};
  text-align: center;
  line-height: ${(props: CircleProps) => `${props.height}px`};
  margin-right: ${(props: CircleProps) => `${props.marginRight || 0}px`};
`;

const RightSide:FC<any> = ({open}) => {
  return (
    <Container justify="space-between" ailgn="center">
      <TopSection justify="space-between" ailgn="center">
        <Column justify="space-between">
          <Row
            style={{
              marginBottom: "5px",
              cursor: "pointer",
              position: "relative",
              width: '60px'
            }}
            onClick={open}
          >
            <Circle
              {...{
                width: 22,
                height: 22,
                borderRadius: 11,
                background: "#CB5460",
                marginRight: 18,
              }}
            >
              庄
            </Circle>
            <div>0/0</div>
          </Row>
          <Row style={{ cursor: "pointer" }}>
            <Circle
              {...{
                width: 22,
                height: 22,
                borderRadius: 11,
                background: "#4C8CED",
                marginRight: 18,
              }}
            >
              闲
            </Circle>
            <div>0/0</div>
          </Row>
        </Column>

        <Column justify="space-between">
          <Row style={{ marginBottom: "5px", cursor: "pointer" }}>
            <Circle
              {...{
                width: 45,
                height: 22,
                borderRadius: 11,
                background: "#CB5460",
                marginRight: 18,
              }}
            >
              庄对
            </Circle>
            <div>0/0</div>
          </Row>
          <Row style={{ cursor: "pointer" }}>
            <Circle
              {...{
                width: 45,
                height: 22,
                borderRadius: 11,
                background: "#4C8CED",
                marginRight: 18,
              }}
            >
              闲对
            </Circle>
            <div>0/0</div>
          </Row>
        </Column>
        <Row style={{ cursor: "pointer" }}>
          <Circle
            {...{
              width: 22,
              height: 22,
              borderRadius: 11,
              background: "#569F3B",
              marginRight: 18,
            }}
          >
            和
          </Circle>
          <div>0/0</div>
        </Row>
      </TopSection>

      <BotSection justify="center">总下注 0/0</BotSection>
    </Container>
  );
};

export default RightSide;
