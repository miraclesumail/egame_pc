import React, { MutableRefObject, useRef, useState } from "react";
import styled from "styled-components";
import { Row, Column } from "@/components/flex";
import { useDispatch } from "react-redux";
import CircleProgress from "@/components/circleProgress";
import FlvPlayer from "@/components/flvPlayer";
import FlipModal from "@/components/flipModal/test";
import RoadMap from "@/components/roadMap/test1";
import { roundData } from "@/views/Bet/data";
import { Solid, Hollow } from "@/components/common";
import BetTable from "@/components/common/betTable";
import betBg from "@/assets/images/bet/betBg.png";
import casino from "@/assets/images/bet/casino.svg";
import warning from "@/assets/images/bet/warning.svg";
import add from "@/assets/images/common/add.svg";
import { message } from "@/components/Message";
import MenuBar from "./menuBar";
import Dialog from "@/components/Dialog";
import ChipContainer from "./chipContainer";
import { useSetState } from "ahooks";
import { selectCurrentDesk, setCurrentDesk } from "@/store/slices/multi.slice";
import { useSelector } from "react-redux";
import InquiryBtn from "./inquiryBtn";
import { BetTop, BetBottom } from "./deskArea";

const Container = styled(Row)`
  width: 954px;
  height: 457px;
  position: relative;
  background-image: ${(props: any) => `url(${betBg})`};
  background-size: 100%;
  background-color: #004841;
  margin-bottom: 13px;
`;

const RoadWrap = styled(Row)`
  width: 481px;
  height: 231px;
`;

const DeskTop = styled(Row)`
  width: 473px;
  height: 90px;
  padding: 0 15px;
  color: #fff;
`;

const DeskContent = styled(Column)`
  width: 473px;
  height: 297px;
`;

const DeskBot = styled(Row)`
  width: 473px;
  height: 70px;
  padding: 0 14px;
`;

const TableIcon = styled.div<any>`
  width: 78px;
  height: 60px;
  margin: 0 26px;
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  background-size: 100%;
`;

const MainDesk = styled(Column)`
  height: 252px;
  width: 473px;
`;

const headLine = [
  { text: "座位", field: "seat" },
  { text: "会员", field: "member" },
  { text: "金额", field: "amount" },
];

const topText = [
  { en: "playerDouble", zn: "对子(闲)P.P." },
  { en: "tie", zn: "和 TIE" },
  { en: "bankerDouble", zn: "对子(庄)B.P." },
];

const botText = [
  { en: "PLAYER", zn: "闲" },
  { en: "BANKER", zn: "庄" },
];

const GameDesk = ({ index, deskId, openDeskPicker }) => {
  const [
    { current, tempCurrent, showPickModal, choose, showBetTable },
    setState,
  ] = useSetState<any>({
    showPickModal: false,
    showBetTable: false,
    tempCurrent: [0, 1],
    current: [0, 1],
    choose: 0,
  });
  const roadMapRef: MutableRefObject<any> = useRef(null);

  const currentDesk = useSelector(selectCurrentDesk);

  const dispatch = useDispatch();
  const [duration, setDuration] = useState(`${Date.now()}_20`);

  /** 设置当前选中的筹码 */
  const addToTempcurrent = (index: number) =>
    setState({
      tempCurrent: [tempCurrent[1], index],
    });

  const showTable = () => setState({ showBetTable: true });

  function inquiry(type: "banker" | "player") {
    roadMapRef.current.inquiry(type);
  }

  return (
    <Container justify={!deskId ? "center" : "flex-start"}>
      {deskId ? (
        <>
          <FlipModal/>
          <Column>
            <FlvPlayer
              {...{ width: 481, height: 226, id: `player_${index}` }}
            />
            <Row>
              <RoadMap
                ref={roadMapRef}
                dataSource={roundData}
                width={442}
                gridNumber={[[5, 6], 13]}
              />
              <InquiryBtn
                {...{
                  bigeye: "banker",
                  smallroad: "player",
                  cockroachPig: "player",
                  inquiry,
                }}
              />
            </Row>
          </Column>

          <Column>
            <DeskTop>
              <CircleProgress
                {...{
                  width: 64,
                  radius: 28,
                  duration,
                  callback: () => {
                    console.log("停止下注");
                    message.error("停止下注");
                  },
                }}
              />
              <TableIcon
                src={casino}
                onClick={() => {
                  const temp = [...currentDesk];
                  temp[index] = 0;
                  dispatch(setCurrentDesk(temp));
                }}
              />
              <Solid
                {...{
                  width: 62,
                  height: 30,
                  background: "#3C5F30",
                  color: "#fff",
                }}
                justify="center"
              >
                传统
              </Solid>
              <Row>
                <img src={warning} alt="" style={{ margin: "0 8px" }} />
                <span>无可用限红</span>
              </Row>
            </DeskTop>
            <DeskContent>
              <MainDesk>
                <Row style={{ width: "100%" }}>
                  {topText.map(({ en, zn }) => (
                    <BetTop
                      {...{
                        en,
                        zn,
                        showTable,
                        desk: index,
                      }}
                      key={en}
                    />
                  ))}
                </Row>
                <Row style={{ width: "100%" }}>
                  {botText.map(({ en, zn }, _) => (
                    <BetBottom
                      {...{ en, zn, showTable, desk: index }}
                      key={en}
                    />
                  ))}
                </Row>
              </MainDesk>
              <MenuBar
                {...{
                  current,
                  choose,
                  openDesk: () => openDeskPicker(index),
                  setChoose: (choose: number) => setState({ choose }),
                  chooseChip: () =>
                    setState((state) => ({ ...state, showPickModal: true })),
                }}
              />
            </DeskContent>
            <DeskBot>
              <Row>
                <Solid
                  {...{
                    width: 32,
                    height: 32,
                    background: "#717171",
                    color: "#fff",
                  }}
                  justify="center"
                >
                  局
                </Solid>
                <span style={{ margin: "0 12px 0 8px" }}>3</span>
              </Row>
              <Row>
                <Solid
                  {...{
                    width: 32,
                    height: 32,
                    background: "#CB5460",
                    color: "#fff",
                  }}
                  justify="center"
                >
                  庄
                </Solid>
                <span style={{ margin: "0 12px 0 8px" }}>3</span>
              </Row>
              <Row>
                <Solid
                  {...{
                    width: 32,
                    height: 32,
                    background: "#4C8CED",
                    color: "#fff",
                  }}
                  justify="center"
                >
                  闲
                </Solid>
                <span style={{ margin: "0 12px 0 8px" }}>3</span>
              </Row>
              <Row>
                <Solid
                  {...{
                    width: 32,
                    height: 32,
                    background: "#4E8D37",
                    color: "#fff",
                  }}
                  justify="center"
                >
                  和
                </Solid>
                <span style={{ margin: "0 12px 0 8px" }}>3</span>
              </Row>
              <Row>
                <Solid
                  {...{
                    width: 56,
                    height: 32,
                    background: "#CB5460",
                    color: "#fff",
                  }}
                  justify="center"
                >
                  庄对
                </Solid>
                <span style={{ margin: "0 12px 0 8px" }}>3</span>
              </Row>
              <Row>
                <Solid
                  {...{
                    width: 56,
                    height: 32,
                    background: "#4C8CED",
                    color: "#fff",
                  }}
                  justify="center"
                >
                  闲对
                </Solid>
                <span style={{ margin: "0 12px 0 8px" }}>3</span>
              </Row>
            </DeskBot>
          </Column>

          <Dialog
            visible={showPickModal}
            title={"请选择两个筹码"}
            small
            buttons={[
              {
                action: () =>
                  setState({ showPickModal: false, tempCurrent: current }),
              },
              {
                action: () =>
                  setState({
                    showPickModal: false,
                    current: tempCurrent,
                    choose: !tempCurrent.includes(choose)
                      ? tempCurrent[0]
                      : choose,
                  }),
              },
            ]}
            onClose={() => setState({ showPickModal: false })}
          >
            <ChipContainer {...{ tempCurrent, addToTempcurrent }} />
          </Dialog>

          <Dialog
            visible={showBetTable}
            title="投注列表"
            small
            buttons={[
              {
                type: "solid",
                text: "确定",
                action: () => setState({ showBetTable: false }),
              },
            ]}
          >
            <div style={{ padding: "0 60px" }}>
              <BetTable head={headLine} />
            </div>
          </Dialog>
        </>
      ) : (
        <Hollow
          {...{
            width: 140,
            height: 48,
            borderColor: "#fff",
            borderRadius: 100,
          }}
          style={{ color: "#fff", padding: "0 30px", cursor: "pointer" }}
          justify="space-between"
          onClick={() => {
            openDeskPicker(index);
          }}
        >
          <img src={add} alt="" width={20} />
          <span>新增桌台</span>
        </Hollow>
      )}
    </Container>
  );
};

export default GameDesk;
