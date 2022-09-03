import React, {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEventEmitter } from "ahooks";
import { EventEmitter } from "ahooks/lib/useEventEmitter";
import CircleProgress from "@/components/circleProgress";
import { Column, Row } from "@/components/flex";
import { message } from "@/components/Message";
import MyButton from "@/components/MyButton";
import FlvPlayer from "@/components/flvPlayer";
import InquiryBtn from "./components/inquiryBtn";
import FlipModal from "@/components/flipModal";
import { resetChipsStack, setIsLottery } from "@/store/slices/bet.slice";
import { BetBottom, BetTop } from "./components/deskArea";
import ChipSlider from "@/components/chipSlider";
import BetTable from "@/views/Bet/components/betTable";
import casino from "@/assets/images/bet/casino.svg";
import warning from "@/assets/images/bet/warning.svg";
import Dialog from "@/components/Dialog";
import TableInfo from "@/components/tableInfo";
import ServiceModal from './components/serviceModal'
import { keyframes } from "./data";
import { chips, roundData } from "../../views/Bet/data";
import RoadMap from "@/components/roadMap/test";
import Zoom from "@/components/zoom";

interface Props {
  showTable: () => void;
  active: string;
  setActive: (type: string) => void;
}

const GameContainer = styled(Column)`
  width: 603px;
  height: 618px;
`;

const GameHeader = styled(Row)`
  width: 100%;
  height: 90px;
  padding-left: 15px;
  background: #004841;
`;

const TableIcon = styled.div<any>`
  width: 78px;
  height: 60px;
  margin: 0 26px;
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  background-size: 100%;
`;

const Round = styled.div`
  width: 62px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 100px;
  color: #fff;
  background: #3c5f30;
  font-size: 14px;
  margin-right: 8px;

  ~ span {
    font-size: 16px;
    margin-right: 30px;
  }
`;

const RightColumn = styled(Column)`
  height: 70px;
  color: #fff;
`;

const Desk = styled(Column)`
  width: 100%;
  height: 386px;
  background: #196c5f;
`;

const ColumnBot = styled(Column)`
  width: 100%;
  height: 163px;
  background: #004841;
  padding: 20px 0;
`;

const BtnWrap = styled(Row)`
  width: 100%;
  height: 50px;
  padding: 0 18px;
`;

const topText = [
  { en: "playerDouble", zn: "对子(闲)P.P." },
  { en: "tie", zn: "和 TIE" },
  { en: "bankerDouble", zn: "对子(庄)B.P." },
];

const botText = [
  { en: "PLAYER", zn: "闲" },
  { en: "BANKER", zn: "庄" },
];

const headLine = [
  { text: "座位", field: "seat" },
  { text: "会员", field: "member" },
  { text: "金额", field: "amount" },
];

const commonProps = {
  width: 130,
  height: 46,
  textColor: "#fff",
};

const BtnGroups = () => {
  const dispatch = useDispatch();

  return (
    <BtnWrap justify="space-between">
      <MyButton
        {...{
          ...commonProps,
          bgColor: "linear-gradient(180deg, #3786E1 0%, #1D66BB 100%);",
          hoverBgColor: "linear-gradient(180deg, #1D66BB 0%, #37E1CD 100%)",
          name: "重复",
          styles: { cursor: "pointer", fontSize: "18px" },
        }}
      />
      <MyButton
        {...{
          ...commonProps,
          bgColor: "linear-gradient(180deg, #3786E1 0%, #1D66BB 100%);",
          hoverBgColor: "linear-gradient(180deg, #1D66BB 0%, #37E1CD 100%)",
          name: "确定",
          onClick: () => dispatch(setIsLottery(true)),
          styles: { cursor: "pointer", fontSize: "18px" },
        }}
      />
      <MyButton
        {...{
          ...commonProps,
          hoverBgColor: " linear-gradient(180deg, #FFBBA9 0%, #E74C4A 100%);",
          bgColor: "linear-gradient(180deg, #A41D1D 0%, #FF8170 100%)",
          name: "取消",
          onClick: () => dispatch(resetChipsStack()),
          styles: { cursor: "pointer", fontSize: "18px" },
        }}
      />
      <MyButton
        {...{
          ...commonProps,
          hoverBgColor: "linear-gradient(180deg, #ACFC7A 0%, #44BD70 100%);",
          bgColor: "linear-gradient(180deg, #186741 0%, #72E949 100%)",
          name: "飞牌",
          styles: { cursor: "pointer", fontSize: "18px" },
        }}
      />
    </BtnWrap>
  );
};

const GameDesk: FC<Props> = ({ showTable, active, setActive }) => {
  const [duration, setDuration] = useState(`${Date.now()}_20`);
  const event$: EventEmitter<any> = useEventEmitter();

  useEffect(() => {
    setTimeout(() => setActive("player"), 3000);
  }, []);

  const addChipsTodDesk = (data) => {
    event$.emit(data);
  };

  const onAnimationend = () => setActive("");

  const gameContent = () => (
    <Desk>
      <Row style={{ width: "100%" }}>
        {topText.map(({ en, zn }) => (
          <BetTop
            {...{ en, zn, active, addChipsTodDesk, showTable, onAnimationend }}
            key={en}
          />
        ))}
      </Row>
      <Row style={{ width: "100%" }}>
        {botText.map(({ en, zn }, index) => (
          <BetBottom
            {...{ en, zn, active, addChipsTodDesk, index, showTable }}
            key={en}
          />
        ))}
      </Row>
    </Desk>
  );

  return (
    <GameContainer>
      <GameHeader justify="flex-start" ailgn="center">
        <CircleProgress
          {...{
            width: 64,
            radius: 28,
            duration,
            callback: () => {
              console.log("停止下注");
              message.error("停止下注");
              // setTimeout(() => {
              //   setDuration(`${Date.now()}_26`);
              // }, 2000);
            },
          }}
        />
        <TableIcon src={casino} />

        <RightColumn justify="space-between" ailgn="flex-start">
          <Row>
            <Round>传统</Round>
            <span>H001</span>
          </Row>
          <Row>
            <Round>局号</Round>
            <span>H00122529002005</span>

            <Row>
              <img src={warning} alt="" style={{ marginRight: 8 }} />
              <span>无可用限红</span>
            </Row>
          </Row>
        </RightColumn>
      </GameHeader>
      {gameContent()}
      <ColumnBot justify="space-between">
        <ChipSlider
          {...{
            chipWidth: 64,
            chipHeight: 52,
            chips,
            displayNum: 6,
            gap: 25,
            event$,
            keyframes,
          }}
        />
        <BtnGroups />
      </ColumnBot>
    </GameContainer>
  );
};

// 经典投注ui
const Index = () => {
  const [{ visible, active }, setState] = useState<any>({
    visible: false,
    active: "",
  });

  const { isNowLottery } = useSelector((state: any) => state.bet);

  const roadMapRef: MutableRefObject<any> = useRef(null);

  function inquiry(type: "banker" | "player") {
    roadMapRef.current.inquiry(type);
  }

  const onClose = () => setState({ visible: false });

  const showTable = () => setState({ visible: true });

  return (
    /** 整体等比缩放的容器 */
    <Zoom {...{ width: 1920, height: 914 }}>
      {isNowLottery ? <FlipModal /> : null}

      <Row>
        {/* 视频直播区域 */}
        <FlvPlayer {...{ width: 1317, height: 618, id: 'classic' }} />
        {/* 赌桌功能区 */}
        <GameDesk
          showTable={showTable}
          active={active}
          setActive={(active) => setState({ active })}
        />
      </Row>
      <Row justify="flex-start" style={{ width: "100%" }}>
        {/* 露珠图绘制区 */}
        <RoadMap dataSource={roundData} width={1720} ref={roadMapRef} />
        {/* 台桌基本信息列表 */}
        <TableInfo {...{ width: 125, height: 296 }} />
        {/* 问路功能按钮 */}
        <InquiryBtn
          {...{
            bigeye: "banker",
            smallroad: "player",
            cockroachPig: "player",
            inquiry,
          }}
        />
      </Row>
      {/* <ServiceModal/> */}
      {/* 桌台下注信息弹窗 */}
      <Dialog
        visible={visible}
        title="投注列表"
        buttons={[
          {
            type: "solid",
            text: "确定",
            action: onClose,
          },
        ]}
      >
        <div style={{ padding: "0 60px" }}>
          <BetTable head={headLine} />
        </div>
      </Dialog>
    </Zoom>
  );
};

export default Index;
