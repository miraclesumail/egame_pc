import React, {
  FC,
  useState,
  useMemo,
  MutableRefObject,
  useRef,
  useCallback,
  ForwardRefExoticComponent,
  forwardRef,
} from "react";
import styled from "styled-components";
import { EventEmitter } from "ahooks/lib/useEventEmitter";
import { Row } from "../flex";
import right from "@/assets/images/bet/rightIcon.svg";
import left from "@/assets/images/bet/leftIcon.svg";
import { useDispatch } from "react-redux";
import { ContainerProps, Place, Props } from "./types";
import { createAnimateNode } from "../createAnimate";
import { setChipsStack } from "@/store/slices/bet.slice";

const Container = styled.div<any>`
  width: ${(props: any) => `${props.width}px`};
  height: ${(props: any) => `${props.height}px`};
  overflow: hidden;
`;

const ChipWrap = styled(Row)<any>`
  width: ${(props: any) => `${props.width}px`};
  height: ${(props: any) => `${props.height}px`};
  transition: transform 0.5s;
  transform: ${(props: any) => `translateX(${props.translateX}px)`};
`;

const Chip = styled.div<any>`
  width: ${(props: any) => `${props.width}px`};
  height: ${(props: any) => `${props.height}px`};
  position: relative;
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  background-size: 100%;
  cursor: pointer;
`;

const Icon = styled.div<any>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  visibility: ${(props: any) => (props.visible ? "visible" : "hidden")};
  transform: ${(props: any) => `translateX(${props.translateX}px)`};
`;

const Moving = styled(Chip)`
  position: absolute;
  left: ${(props: Place) => `${props.left}px`};
  top: ${(props: Place) => `${props.top}px`};
  z-index: 1000;
`;

const MovingItem: ForwardRefExoticComponent<Props> = forwardRef<HTMLElement, Props>((props, ref) => (
  <Moving ref={ref} {...props}>
    {props.children}
  </Moving>
));

const defaultOptions = {
  // timing options
  duration: 600,
  easing: "ease-in-out",
};

const Index: FC<ContainerProps> = ({
  chips,
  displayNum,
  chipHeight,
  chipWidth,
  gap,
  event$,
  keyframes,
  options = defaultOptions,
}) => {
  const [{ currentChoose, currentIndex }, setState] = useState<any>({
    currentChoose: 0,
    currentIndex: 0,
  });
  const ref: MutableRefObject<any> = useRef<HTMLDivElement>();
  const rowRef: MutableRefObject<any> = useRef<HTMLDivElement>();
  const dispatch = useDispatch();

  event$.useSubscription((data) => {
    console.log(data, currentChoose, "useSubscription");
    addChips(data);
  });

  const showLeft = useMemo(() => !!currentIndex, [currentIndex]);

  const showRight = useMemo(() => currentIndex < chips.length - displayNum, [currentIndex]);

  const pickIndex = useMemo(() => currentChoose - currentIndex, [currentIndex, currentChoose]);

  const addChips = useCallback(
    ({ category, store }: any) => {
      const onFinish = () => {
        const chipStack: any = {
          ...store.getState().bet.chipsStack,
        };
        const newChipStack = {
          ...chipStack,
          [category]: [...chipStack[category], currentChoose],
        };
        dispatch(setChipsStack(newChipStack));
      };

      const outWidth = (rowRef.current as HTMLElement).clientWidth;
      const innerWidth = (ref.current as HTMLElement).clientWidth;
      console.log(pickIndex, "---000www");
      createAnimateNode(
        {
          keyframes: keyframes[category][pickIndex],
          Cmp: MovingItem,
          options,
          children: <div style={{ background: "yellow", zIndex: 1000 }}></div>,
          styles: {
            width: chipWidth,
            height: chipHeight,
            left: (outWidth - innerWidth) / 2 + (chipWidth + gap) * pickIndex,
            top: 0,
            src: chips[currentChoose].src,
          },
          onFinish,
        },
        ref.current
      );
    },
    [pickIndex]
  );

  return (
    <Row style={{ position: "relative" }} iref={rowRef}>
      <Icon
        {...{ src: left, visible: showLeft, translateX: -8 }}
        onClick={() => setState((state) => ({ ...state, currentIndex: currentIndex - 1 }))}
      />
      <Container
        {...{
          width: chipWidth * displayNum + (displayNum - 1) * gap,
          height: chipHeight,
        }}
        ref={ref}
      >
        <ChipWrap
          {...{
            width: chips.length * chipWidth + (chips.length - 1) * gap,
            height: chipHeight,
            translateX: -currentIndex * (chipWidth + gap),
            justify: "space-between",
          }}
        >
          {chips.map(({ activeSrc, src }: any, index) => (
            <Chip
              key={index}
              onClick={() => {
                setState((state) => ({ ...state, currentChoose: index }));
              }}
              {...{
                width: chipWidth,
                height: chipHeight,
                src: index === currentChoose ? activeSrc : src,
              }}
            />
          ))}
        </ChipWrap>
      </Container>
      <Icon
        {...{ src: right, visible: showRight, translateX: 8 }}
        onClick={() => setState((state) => ({ ...state, currentIndex: currentIndex + 1 }))}
      />
    </Row>
  );
};

export default Index;
