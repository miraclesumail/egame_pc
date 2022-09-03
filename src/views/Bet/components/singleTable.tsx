import { Column, Row } from "@/components/flex";
import React, { FC } from "react";
import styled from "styled-components";
import CircleProgress from "@/components/circleProgress";
import RoadMap from "@/components/roadMap";
import { roundData } from "../data";
import casino from "@/assets/images/bet/casino.svg";
import table from "@/assets/images/bet/table.svg";
import user from "@/assets/images/bet/user.svg";

type CircleProps = {
  width: number;
  height: number;
  borderRadius: number;
  background: string;
  marginRight?: number;
};

const Container = styled(Column)`
  width: 382px;
  height: 194px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background: #000;
  margin-bottom: 15px;
`;

const TableInfo = styled(Row)`
  padding: 0 12px;
  width: 100%;
  height: 66px;
  color: #fff;
`;

const TableIcon = styled.div<any>`
  width: 56px;
  height: 42px;
  margin: 0 10px;
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  background-size: 100%;
`;

const TopSpan = styled.span`
  background: #2c2323;
  border-radius: 100px;
  padding: 2px 7px;
  color: #faf8f4;
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

const IconRow = styled(Row)`
  margin-right: 7px;

  img {
    width: 18px;
    margin-right: 7px;
  }
`;

interface Props {
  onClick?: (data: any) => void;
  deskId: number;
}

const SingleTable: FC<Props> = ({ onClick: onTableChoose, deskId }) => {
  return (
    <Container onClick={() => onTableChoose(deskId)}>
      <TableInfo ailgn="center">
        <CircleProgress
          {...{
            width: 46,
            radius: 20,
            duration: `${Date.now()}_15`,
            callback: () => {
              console.log("停止下注");
            },
          }}
        />
        <TableIcon src={casino} />
        <Column
          style={{ height: "45px" }}
          justify="space-between"
          ailgn="flex-start"
        >
          <Row style={{ width: "150px" }} justify="space-between">
            <TopSpan>快速</TopSpan>
            <TopSpan>5K-1M</TopSpan>
          </Row>

          <Row justify="flex-start">
            <IconRow>
              <img src={table} alt="" width={18} />
              <span>H002</span>
            </IconRow>

            <IconRow>
              <img src={user} alt="" width={18} />
              <span>1</span>
            </IconRow>

            <Row>
              <Row>
                <Circle
                  {...{
                    width: 20,
                    height: 20,
                    background: "#CB5460",
                    borderRadius: 10,
                    marginRight: 6,
                  }}
                >
                  庄
                </Circle>
                <span style={{ marginRight: "6px" }}>12</span>
              </Row>

              <Row>
                <Circle
                  {...{
                    width: 20,
                    height: 20,
                    background: "#4C8CED",
                    borderRadius: 10,
                    marginRight: 6,
                  }}
                >
                  闲
                </Circle>
                <span style={{ marginRight: "6px" }}>12</span>
              </Row>

              <Row>
                <Circle
                  {...{
                    width: 20,
                    height: 20,
                    background: "#4C8CED",
                    borderRadius: 10,
                    marginRight: 6,
                  }}
                >
                  闲
                </Circle>
                <span style={{ marginRight: "6px" }}>12</span>
              </Row>
            </Row>
          </Row>
        </Column>
      </TableInfo>
      <RoadMap dataSource={roundData} width={382} />
    </Container>
  );
};

export default SingleTable;
