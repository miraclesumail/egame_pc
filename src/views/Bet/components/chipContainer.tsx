import React, {
  useState,
  useRef,
  MutableRefObject,
  FC,
  ForwardRefExoticComponent,
  forwardRef,
  useEffect,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Row, Column } from "@/components/flex";
import { createAnimateNode } from "@/components/createAnimate";
import { Communicator, sumNumberPart } from "@/utils/tool";
import { setChipsStack } from "@/store/slices/bet.slice";
import useQueryDesk from "@/views/Bet/hooks/useQueryDesk";
import { chips, keyframes } from "../data";
import right from "@/assets/images/bet/rightIcon.svg";
import left from "@/assets/images/bet/leftIcon.svg";
import { useMemo } from "react";

const ChipWrap = styled.div`
  width: 315px;
  height: 50px;
  overflow: hidden;
`;

const Icon = styled.div<any>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  visibility: ${(props: any) => (props.visible ? "visible" : "hidden")};
`;

const ScrollBox = styled(Row)`
  width: 535px;
  height: 50px;
  transition: transform 0.5s;
  transform: ${(props: any) => `translateX(${props.translateX})`};
`;

const Chip = styled.div<any>`
  width: 40px;
  height: 33px;
  position: relative;
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  background-size: 100%;
  cursor: pointer;
`;

interface Place {
  left: number;
  top: number;
  src: string;
}

type Props = {
  title: string;
  children?: JSX.Element | JSX.Element[];
};

const Moving = styled(Chip)`
  position: absolute;
  left: ${(props: Place) => `${props.left}px`};
  top: ${(props: Place) => `${props.top}px`};
  z-index: 1000;
`;

const MovingItem: ForwardRefExoticComponent<Props> = forwardRef<
  HTMLElement,
  Props
>((props, ref) => (
  <Moving ref={ref} {...props}>
    {props.children}
  </Moving>
));

const options = {
  // timing options
  duration: 800,
  easing: "ease-in-out",
};

const ChipContainer = () => {
  const [currentIndex, setCurrent] = useState<number>(0);
  const [currentChoose, setChoose] = useState<number>(0);
  const dispatch = useDispatch();

  const { sumMap, chipsMap } = useQueryDesk();

  const ref: MutableRefObject<any> = useRef<HTMLDivElement>();

  const translateX = useMemo(() => `-${currentIndex * 55}px`, [currentIndex]);

  const showLeft = useMemo(() => !!currentIndex, [currentIndex]);

  const showRight = useMemo(
    () => currentIndex < chips.length - 6,
    [currentIndex]
  );

  const pickIndex = useMemo(
    () => currentChoose - currentIndex,
    [currentIndex, currentChoose]
  );

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

      createAnimateNode(
        {
          keyframes: keyframes[category][pickIndex],
          Cmp: MovingItem,
          options,
          children: <div style={{ background: "yellow", zIndex: 1000 }}></div>,
          styles: {
            left: 404 + 55 * pickIndex,
            top: 8,
            src: chips[currentChoose].src,
          },
          onFinish,
        },
        ref.current
      );
    },
    [pickIndex]
  );

  useEffect(() => {
    Communicator.createListener("addChips", addChips);

    return () => Communicator.removeListener("addChips", addChips);
  }, [pickIndex]);

  return (
    <>
      <Icon
        {...{ src: left, visible: showLeft }}
        onClick={() => setCurrent(currentIndex - 1)}
      />

      <ChipWrap ref={ref}>
        <ScrollBox {...{ justify: "space-between", translateX }}>
          {chips.map((item, index) => (
            <Chip
              key={index}
              onClick={() => {
                setChoose(index);
              }}
              src={index === currentChoose ? item.activeSrc : item.src}
            />
          ))}
        </ScrollBox>
      </ChipWrap>
      <Icon
        {...{ src: right, visible: showRight }}
        onClick={() => {
          setCurrent(currentIndex + 1);
        }}
      />
    </>
  );
};

export default ChipContainer;
