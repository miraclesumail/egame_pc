import CircleProgress from "@/components/circleProgress";
import { Column, Row } from "@/components/flex";
import { drawBigEyeWay, Options } from "@/utils/dewdrop";
import { formatResultList, initCanvas } from "@/utils/tool";
import classnames from "classnames";
import React, {
  FC,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { roundData as dataSource, chips } from "../data";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAnimationend?: () => void;
}

const Mask = styled(Row)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  max-width: 100%;
  margin: 0 auto;
  background: rgba(101, 90, 70, 0.7);
  animation-duration: 200ms;
  cursor: pointer;
`;

const Modal = styled(Column)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 359px;
  right: 0px;
  bottom: 0px;
  background: #fff;
  z-index: 1000;
  animation-duration: 500ms;
`;

const Top = styled(Row)``;

const TableInfo = styled(Column)`
  width: 219px;
  height: 120px;
  padding: 12px 0 10px 10px;
  background: #191919;
`;

const Type = styled.div`
  color: #d3af6e;
  font-size: 15px;
  width: 150px;
  text-align: center;
`;

const DeskNo = styled.div`
  color: #faf8f4;
  font-size: 15px;
  margin: 10px auto;
`;

const textMap = {
  banker: "庄",
  player: "闲",
  tie: "和",
};

const colorMap = {
  banker: "#CB5460",
  player: "#4C8CED",
  tie: "#4ea950",
};

// gridLineColor: string
// gridLineWidth: number

const bigEyeOptions: Options = {
  rows: 10,
  columns: 14,
  gridLineWidth: 1,
  gridLineColor: "rgba(211, 175, 110, 0.3)",
  pairRadius: 3,
  cellWidth: 20,
  cellHeight: 20,
  skipOddLine: true,
  textMap,
  colorMap,
};

const Desk = styled(Column)`
  width: 359px;
  height: 120px;
  background: #196c5f;
`;

const DeskBlock = styled.div`
  flex: 1;
  height: 60px;
  display: flex;
  padding-top: 6px;
  justify-content: center;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;

  &:nth-of-type(1) {
    color: #4c8ced;
  }

  &:nth-of-type(2) {
    color: #98c887;
  }

  &:nth-of-type(3) {
    color: #cb5460;
    border-right: none;
  }
`;

const DeskBot = styled(Row)`
  flex: 1;
  height: 60px;
  padding-top: 6px;

  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;

  div {
    width: 19px;
    height: 19px;
    border-radius: 50%;
    text-align: center;
    line-height: 19px;
    margin-right: 5px;
    color: #fff;
  }

  &:nth-of-type(1) {
    div {
      background: #4c8ced;
    }
    span {
      color: #4c8ced;
    }
  }

  &:nth-of-type(2) {
    div {
      background: #cb5460;
    }

    span {
      color: #cb5460;
    }
    border-right: none;
  }
`;

const Footer = styled(Row)``;

const topText = ["对子(闲)P.P.", "和 TIE", "对子(庄)B.P."];

const botText = [
  { en: "PLAYER", zn: "闲" },
  { en: "BANKER", zn: "庄" },
];

const BtnWrap = styled(Row)<any>`
  width: 134px;
  height: 62px;
  background: ${(props: any) => props.background};
  color: #fff;
  font-size: 18px;
  padding: 0 27px;
  cursor: pointer;

  img {
    width: 22px;
    height: 22px;
    margin-right: 7px;
  }
`;

const ChipWrap = styled(Row)`
  width: 91px;
  height: 62px;
  background: #196c5f;
  cursor: pointer;

  img {
    width: 64px;
    height: 52px;
  }
`;

const ChipListModal = styled(Row)`
  width: 359px;
  height: 240px;
  padding: 0 23px;
  background: #196c5f;
  border-bottom: 1px solid #fff;

  > div {
    width: 64px;
    height: 52px;

    margin-right: 19px;

    &:nth-of-type(4n) {
      margin-right: 0;
    }
  }
`;

const ChipUnit = styled.div<any>`
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  background-size: 100%;
`;

const QuickBet: FC<Props> = ({
  visible: visibleProps,
  onClose,
  onAnimationend,
}) => {
  const initList = formatResultList(dataSource);
  const wrapperEl = useRef<HTMLDivElement>(null);

  const [{ showChips, visible }, setState] = useState<any>({
    showChips: false,
    visible: visibleProps,
  });

  function animationend() {
    setState({ visible: false });
    console.log("animationendanimationend");
    onAnimationend && onAnimationend();
  }

  function onMaskClick(e: MouseEvent) {
    if ((e.target as HTMLDivElement).classList.contains("mask")) {
      onClose();
    }
  }

  useEffect(() => {
    if (!showChips && visible) {
      const ctx = initCanvas("quickBet", false, 140, 120);
      drawBigEyeWay(ctx, initList, bigEyeOptions, [0, 0]);
    }

    if (visibleProps) {
      setState({ visible: true });
    } else {
      console.log("visiblePropsvisiblePropsvisibleProps");
      wrapperEl.current && (wrapperEl.current.onanimationend = animationend);
    }
  }, [showChips, visible, visibleProps]);

  return visible ? (
    <Mask
      className={classnames(
        "mask",
        "animate__animated",
        visibleProps ? "animate__fadeIn" : "animate__fadeOut"
      )}
      iref={wrapperEl}
      onClick={onMaskClick as any}
    >
      <Modal
        className={classnames(
          "animate__animated",
          visibleProps ? "animate__slideInRight" : "animate__slideOutRight"
        )}
      >
        {showChips ? (
          <ChipListModal wrap="wrap">
            {chips.map((item, index) => (
              <ChipUnit src={item.src} key={index} />
            ))}
          </ChipListModal>
        ) : (
          <>
            <Top ailgn="flex-start">
              <TableInfo ailgn="flex-start">
                <Column>
                  <Row>
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
                    <Type>一房两厅</Type>
                  </Row>

                  <DeskNo>进入H003桌</DeskNo>
                </Column>
              </TableInfo>
              <canvas id="quickBet"></canvas>
            </Top>
            <Desk>
              <Row style={{ width: "100%" }}>
                {topText.map((item) => (
                  <DeskBlock key={item}>{item}</DeskBlock>
                ))}
              </Row>
              <Row style={{ width: "100%" }}>
                {botText.map(({ zn, en }) => (
                  <DeskBot key={en} justify="center" ailgn="flex-start">
                    <div>{zn}</div>
                    <span>{en}</span>
                  </DeskBot>
                ))}
              </Row>
            </Desk>
          </>
        )}

        <Footer>
          <BtnWrap
            align="center"
            {...{
              background: "#CB5460",
            }}
            onClick={onClose}
          >
            <img src={require("@/assets/images/bet/cancel.png")} alt="" />
            <span>取消</span>
          </BtnWrap>
          <ChipWrap
            justify="center"
            onClick={(e: MouseEvent) => setState({ showChips: !showChips })}
          >
            <img src={require("@/assets/images/bet/chips/chip50.png")} alt="" />
          </ChipWrap>
          <BtnWrap
            align="center"
            {...{
              background: "#3C5F30",
            }}
          >
            <img src={require("@/assets/images/bet/confirm.png")} alt="" />
            <span>确认</span>
          </BtnWrap>
        </Footer>
      </Modal>
    </Mask>
  ) : null;
};

export default QuickBet;
