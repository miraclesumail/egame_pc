import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChipsStack,
  selectCurrentDesk,
  setCurrentDesk,
} from "@/store/slices/multi.slice";
import Zoom from "@/components/zoom";
import SlideModal from "@/components/slideModal";
import TablePick from "@/views/Bet/components/tablePick";
import GameDesk from "./components/gameDesk";
import { Row } from "@/components/flex";
import useNatws from "@/utils/hooks/natWs";
import { useSetState } from "ahooks";
import Dialog from "@/components/Dialog";
import CasinoPick from "@/components/common/casinoPick";
import CommonPick from "@/components/common/commonPick";

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

const Index = () => {
  const [{ showPick, currentPick, showMask }, setState] = useSetState<any>({
    showPick: false,
    showMask: "",
    currentPick: 0,
  });
  const dispatch = useDispatch();
  const currentDesk = useSelector(selectCurrentDesk);

  const onClose = () => setState({ showPick: false });

  const onChoose = (data) => {
    console.log(data, "currentPick", currentPick);
    const temp = [...currentDesk];
    temp[currentPick] = data;
    dispatch(setCurrentDesk(temp));
    dispatch(resetChipsStack(currentPick));
    onClose();
  };

  // useEffect(() => {
  //   if (conn) {
  //     // subscribe("chris_ws", (data) => console.log("oowowowowo", data));
  //     subscribe("chat", (data) => console.log("multi---", data));
  //   }
  // }, [conn]);

  return (
    <Zoom {...{ width: 1920, height: 1000 }}>
      <Row justify="space-between" wrap="wrap">
        {currentDesk.map((deskId, index) => (
          <GameDesk
            index={index}
            key={index}
            deskId={deskId}
            openDeskPicker={(currentPick) =>
              setState({ showPick: true, currentPick })
            }
          />
        ))}
      </Row>

      <SlideModal
        visible={showPick}
        modalWidth={850}
        maskBackground={"rgba(255, 255, 255, 0)"}
        onClose={onClose}
      >
        <TablePick
          showSelectMask={(category: string) =>
            setState((state) => ({ ...state, showMask: category }))
          }
          onChoose={onChoose}
        />
      </SlideModal>

      <Dialog
        title={"选择赌场"}
        zIndex={1000}
        visible={!!showMask}
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
    </Zoom>
  );
};

export default Index;
