import React, {
  forwardRef,
  ForwardRefExoticComponent,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";
import styled from "styled-components";
import classnames from "classnames";
import { Column, Row } from "@/components/flex";
import RoadMap from "@/components/roadMap";
import { Solid } from "@/components/common";
import CircleProgress from "@/components/circleProgress";
import { createAnimateNode } from "@/components/createAnimate";
import setting from "@/assets/images/bet/setting.svg";
import right from "@/assets/images/bet/rightIcon.svg";
import left from "@/assets/images/bet/leftIcon.svg";
import { roundData } from "@/views/Bet/data";
import { formatResultList, initCanvas } from "@/utils/tool";
import { drawBigEyeWay, Options } from "@/utils/dewdrop11";
import { useSetState } from "ahooks";
import useEventListener from "@/utils/hooks/useEventListener";
import { animateEle } from "@/utils/tool";
import { Throttle } from "@/utils";
import useNatws from "@/utils/hooks/natWs";

const Container = styled(Row)`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 1030px;
  height: 180px;
  background: #0d0d0d;
  transition: transform 0.3s;
  transition-timing-function: ease-in;

  &.hide {
    transform: translate(-980px);
  }

  img {
    width: 20px;
  }
`;

const RoadWrap = styled(Row)`
  /* display: flex; */
  width: 930px;
  height: 180px;
  background: #333;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Side = styled(Column)`
  width: 50px;
  height: 180px;
`;

const Right = styled(Column)`
  width: 50px;
  height: 180px;
  border-left: 1px solid #fff;
  background: #171717;
  cursor: pointer;

  img {
    width: 24px;
  }

  &.hide {
    background: linear-gradient(#eeab47, #b99454);
  }
`;

const Table = styled.div`
  width: 280px;
  height: 160px;
  margin-right: 5px;
  background: #191919;
`;

const Top = styled(Row)`
  width: 100%;
  height: 106px;

  > div {
    height: 106px;
    width: 140px;
    color: #fff;

    &.type {
      padding: 0 25px 0 13px;
    }
  }
`;

const Bot = styled(Row)`
  width: 100%;
  flex: 1;
  color: #d3af6e;
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

const bigEyeOptions: Options = {
  rows: 12,
  columns: 16,
  lineWidth: 1,
  lineColor: "rgba(211, 175, 110, 0.3)",
  cellWidth: 8.75,
  cellHeight: 8.75,
  skipOddLine: true,
  textMap,
  colorMap,
};

const MovingItem: ForwardRefExoticComponent<any> = forwardRef<HTMLElement, any>(
  (props, ref) => (
    <Table ref={ref} {...props}>
      {props.children}
    </Table>
  )
);

const defaultOptions = {
  // timing options
  duration: 300,
  easing: "ease-in-out",
};

const Road = ({ onFinish }) => {
  const initList = formatResultList(roundData);
  const ref: MutableRefObject<any> = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = initCanvas(ref.current, false, 140, 105);
    drawBigEyeWay(ctx, initList, bigEyeOptions, [0, 0]);
  }, []);

  return (
    <Table>
      <Top>
        <Row className="type" justify="space-between">
          <CircleProgress
            {...{
              width: 48,
              radius: 20,
              duration: `${Date.now()}_15`,
              callback: onFinish,
            }}
          />
          <div>双跳</div>
        </Row>
        <canvas ref={ref} />
      </Top>
      <Bot justify="center">进入H003桌</Bot>
    </Table>
  );
};

const RoadTip = () => {
  const [{ hide, count }, setState] = useSetState({ hide: false, count: 0 });
  const { conn, subscribe } = useNatws("ws://localhost:9222");

  const countRef = useRef(0);
  const ref: MutableRefObject<any> = useRef<HTMLDivElement>();

  useEventListener("wheel", new Throttle(changeScroll, 15).run, ref.current);

  function changeScroll(e) {
    ref.current.scrollLeft = ref.current.scrollLeft + e.deltaY;
  }

  const toggleHide = () => setState((state) => ({ ...state, hide: !hide }));

  const createMany = (num: number) => {
    const umountFns = [];
    for (let i = 0; i < num; i++) {
      if (countRef.current <= 3) {
        const x = 930 - countRef.current * 280;
        const unmount = createAnimateNode(
          {
            keyframes: [
              { transform: `translate(${x}px)` },
              { transform: "translate(0,  0)" },
            ],
            Cmp: MovingItem,
            options: defaultOptions,
            children: (
              <Road
                onFinish={() => {
                  countRef.current--;
                  setState({ count: countRef.current });

                  if (i === num - 1) {
                    animateEle(
                      ref.current,
                      {
                        keyframes: [
                          { transform: `translate(0px)` },
                          { transform: `translate(${-290 * num}px,  0)` },
                        ],
                        options: defaultOptions,
                      },
                      () => {
                        umountFns.forEach((unmount) => unmount());
                      }
                    );
                  }
                }}
              />
            ),
            executeFinish: false,
          },
          ref.current
        );
        umountFns.push(unmount);
      } else {
        const unmount = createAnimateNode(
          {
            Cmp: MovingItem,
            children: (
              <Road
                onFinish={() => {
                  countRef.current--;
                  setState({ count: countRef.current });

                  if (i === num - 1) {
                    animateEle(
                      ref.current,
                      {
                        keyframes: [
                          { transform: `translate(0px)` },
                          { transform: `translate(${-290 * num}px,  0)` },
                        ],
                        options: defaultOptions,
                      },
                      () => {
                        umountFns.forEach((unmount) => unmount());
                      }
                    );
                  }
                }}
              />
            ),
            executeFinish: false,
          },
          ref.current
        );
        umountFns.push(unmount);
      }
      countRef.current++;
      setState({ count: countRef.current });
    }
  };

  useEffect(() => {
    if (conn) {
      subscribe("chat", (data) => {
        console.log("multi---", data);
        createMany(Number(data.m) || 1);
      });
    }
  }, [conn]);

  return (
    <Container
      className={classnames({
        hide,
      })}
    >
      <Side justify="center" onClick={toggleHide}>
       
        <img src={setting} alt="" />
      </Side>
      <RoadWrap iref={ref}></RoadWrap>
      <Right
        justify="center"
        onClick={toggleHide}
        className={classnames({
          hide,
        })}
      >
         {count && hide ? (
          <Solid
            {...{ width: 20, height: 20, background: "#de182c", color: '#fff' }}
            justify="center"
          >
            {count}
          </Solid>
        ) : null}

        <img src={hide ? right : left} alt="" />
      </Right>
    </Container>
  );
};

export default RoadTip;
