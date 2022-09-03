import React, {
  FC,
  useRef,
  MutableRefObject,
  useEffect,
  CSSProperties,
  ReactNode,
  ForwardRefExoticComponent,
  forwardRef,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { createAnimateNode } from "@/components/createAnimate";
import { ContainerProps, Place } from "@/components/chipSlider/types";
//   import { setChipsStack as setSingleChipsStack } from '@/store/slice/bet/action'
//   import { setChipsStack } from '@/store/slice/multiBet/action'
import classnames from "classnames";
import { chips } from "@/views/Bet/data";
import { keyframes } from "@/views/Classic/data";

import styled from "styled-components";
import { Row } from "@/components/flex";
import { Communicator } from "@/utils/tool";
import { setChipsStack } from "@/store/slices/multi.slice";

interface State {
  deskNo?: number;
  current: number[];
  choose: number;
  tempCurrent: number[];
  setChoose: (index: number) => void;
  addChipsToDesk?: (title: string) => void;
  chooseChip?: () => void;
  [key: string]: any;
}

export type Props = {
  title: string;
  children?: JSX.Element | JSX.Element[];
};

const SliceWrap = styled(Row)`
  width: 125px;
  height: 45px;
  background: rgba(18, 19, 13, 0.95);
  border: 1px solid #faf8f4;
  padding: 0 6px;
`;

const Chip = styled.div<any>`
  width: ${(props: any) => `${props.width}px`};
  height: ${(props: any) => `${props.height}px`};
  position: relative;
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  background-size: 100%;
  cursor: pointer;
`;

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

const defaultOptions = {
  // timing options
  duration: 600,
  easing: "ease-in-out",
};

const DicePicker: FC<Partial<State>> = ({
  current,
  choose,
  chooseChip,
  setChoose,
}) => {
  const ref: MutableRefObject<any> = useRef<HTMLDivElement>();
  const dispatch = useDispatch()

  useEffect(() => {
    Communicator.createListener("multi_addChips", addChips);

    return () => Communicator.removeListener("multi_addChips", addChips);
  }, [current, choose]);

  const addChips = ({ category, store, desk }: any) => {

    console.log(category, desk, 'DicePickerDicePickerDicePickerDicePicker')
    const onFinish = () => {
      const chipStack: any = {
        ...store.getState().multi.chipsStack[desk]
      }
      const newChipStack = {
        ...chipStack,
        [category]: [...chipStack[category], choose]
      }
      dispatch(setChipsStack({ desk, chipStack: newChipStack }))
      console.log('onFinishonFinish')
    }

    createAnimateNode(
      {
        keyframes: keyframes[category][current.indexOf(choose)],
        Cmp: MovingItem,
        options: defaultOptions,
        children: <div style={{ background: "yellow", zIndex: 1000 }}></div>,
        styles: {
          width: 44,
          height: 36,
          left: 0,
          top: 0,
          src: chips[0].src,
        },
        onFinish,
      },
      ref.current
    );
  };


  return (
    <SliceWrap justify="space-between">
      {current.map((item, _) => (
        <Chip
          key={item}
          {...{ width: 44, height: 36 }}
          ref={item === choose ? ref : null}
          src={item === choose ? chips[item].activeSrc : chips[item].src}
          onClick={() => setChoose(item)}
        />
      ))}
      <img
        // onClick={chooseChip}
        onClick={() => addChips({category: 'banker'})}
        src={require("@/assets/images/common/drop.png")}
        alt=""
        width={12}
      />
    </SliceWrap>
  );
};

export default DicePicker;
