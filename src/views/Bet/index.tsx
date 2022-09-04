import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import useEventListener from "@/utils/hooks/useEventListener";
import LiveVideo from "@/components/LiveVideo";
import Dialog from "@/components/Dialog";
import { Throttle } from "@/utils";
import FlvPlayer from "@/components/flvPlayer";
import SlideModal from "@/components/slideModal";
import Cover from "./components/cover";
import {
  Banker,
  Player,
  Tie,
  PlayerDouble,
  BankerDouble,
} from "./components/deskSection";
// import PlayerDouble from "./components/playerDouble";
// import BankerDouble from "./components/bankerDouble";
import LeftSide from "./components/leftSide";
import RightSide from "./components/rightSide";
import BetTable from "./components/betTable";
// import Player from "./components/player";
// import Banker from "./components/banker";
import RoadMap from "./components/roadMap";
import TablePick from "./components/tablePick";
import CasinoPick from "./components/casinoPick";
import { roundData } from "./data";
// import Tie from "./components/tie";
import MenuBar from "./components/menu-bar";
import lockIcon from "@/assets/images/bet/bg_table.jpeg";
import QuickBet from "./components/quickBet";
import CommonPick from "./components/commonPick";

const Container: any = styled.div`
  position: relative;
  background: url(${lockIcon}) no-repeat center;
  background-size: contain;
  transform-origin: top center;
  transform: ${({ scale }: any) => `scale(${scale})`};
  width: 1366px;
  height: 528px;
  margin: 0 auto;
  right: 0;
  z-index: 1;
`;

const m3u8 =
  "https://pull-tx.cgcxs.net/live/cg01_m.m3u8?txSecret=9d34f2574174f17ab449b935a947bbeb&txTime=81C97A38";
const flv =
  "https://pull-tx.cgcxs.net/live/cg01_m.flv?txSecret=9d34f2574174f17ab449b935a947bbeb&txTime=81C97A38";

const betTypes = [
  { label: "所有服务", value: 0 },
  { label: "专属服务", value: 1 },
  { label: "快速电投", value: 2 },
];

const sort = [
  { label: "不排序", value: 0 },
  { label: "高至低", value: 1 },
  { label: "高至低", value: 2 },
];

const listMenu = {
  bet: betTypes,
  sort,
};

const headLine = [
  { text: "座位", field: "seat" },
  { text: "会员", field: "member" },
  { text: "金额", field: "amount" },
];

const Index = () => {
  const [
    { initheight, scale, visible, showQuick, showPick, showMask },
    setState,
  ] = useState<any>({
    initheight: document.body.clientHeight,
    scale: 1,
    visible: false,
    showQuick: false,
    showPick: false,
    showMask: "",
  });

  useEventListener("resize", new Throttle(changeScale, 50).run);

  function changeScale() {
    const ratio = document.body.clientHeight / initheight;
    setState({ scale: ratio });
  }

  function onClose() {
    setState({ visible: false });
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Container scale={scale}>
        <LiveVideo source={m3u8} />
        {/* <FlvPlayer/> */}
        <svg
          data-v-a9f5d69a=""
          width="1366px"
          height="526px"
          viewBox="0 0 1366 526"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <Cover />
          <Banker />
          {/* <PlayerDouble />
          <BankerDouble />
          <Player />
          <Banker />
          <Tie /> */}
        </svg>
        <MenuBar />
        <LeftSide />
        <RightSide open={() => setState({ showPick: true })} />
        <RoadMap dataSource={roundData} />
      </Container>

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
      <SlideModal
        visible={showPick}
        modalWidth={850}
        maskBackground={"rgba(255, 255, 255, 0)"}
        onClose={() => setState({ showPick: false })}
      >
        <TablePick
          showSelectMask={(category: string) =>
            setState((state) => ({ ...state, showMask: category }))
          }
        />
      </SlideModal>
      <Dialog
        title={"选择赌场"}
        visible={!!showMask}
        zIndex={1000}
        onClose={() => setState((state) => ({ ...state, showMask: "" }))}
      >
        {showMask === "casino" ? (
          <CasinoPick />
        ) : !!showMask ? (
          <CommonPick
            list={listMenu[showMask]}
            onChoose={(e) => console.log(e, "wwww--")}
          />
        ) : null}
      </Dialog>
      <QuickBet
        visible={showQuick}
        onClose={() => setState({ showQuick: false })}
      />
    </div>
  );
};

export default Index;
