import React, { FC, MutableRefObject, useEffect, useMemo, useRef } from "react";
import classnames from "classnames";
import ChipStack from "@/components/chipStack";
import { Row } from "@/components/flex";
import store from "@/store";
import { BetType } from "@/store/slices/bet.slice";
import styled from "styled-components";
import iconChip from "@/assets/images/bet/iconChip.svg";
import iconPerson from "@/assets/images/bet/iconPerson.svg";

interface Props {
  en: string;
  zn: string;
  active: string;
  addChipsTodDesk: ({ category: BetType, store: any }) => void;
  onAnimationend?: () => void;
  [key: string]: any;
}

type CircleProps = {
  width: number;
  height: number;
  borderRadius: number;
  background: string;
  marginRight?: number;
};

const DeskBlock = styled.div`
  position: relative;
  flex: 1;
  height: 192px;
  display: flex;
  padding-top: 10px;
  justify-content: center;
  border-right: 1px solid #3c5f30;
  border-bottom: 1px solid #3c5f30;
  cursor: pointer;

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

  &.active {
    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }

    &.bankerDouble,
    &.banker {
      &::after {
        animation: flashBanker 1s 3;
      }
    }

    &.tie {
      &::after {
        animation: flashTie 1s 3;
      }
    }

    &.playerDouble,
    &.player {
      &::after {
        animation: flashPlayer 1s 3;
      }
    }
  }

  @keyframes flashPlayer {
    0% {
      background: none;
    }

    100% {
      background: linear-gradient(
        180deg,
        rgba(81, 166, 244, 0.5) 0%,
        rgba(44, 138, 224, 0.5) 100%
      );
    }
  }

  @keyframes flashTie {
    0% {
      background: none;
    }

    100% {
      background: linear-gradient(
        180deg,
        rgba(69, 151, 56, 0.5) 0%,
        rgba(53, 119, 87, 0.5) 100%
      );
    }
  }

  @keyframes flashBanker {
    0% {
      background: none;
    }

    100% {
      background: linear-gradient(
        180deg,
        rgba(181, 133, 62, 0.5) 0%,
        rgb(152, 96, 45, 0.5) 100%
      );
    }
  }
`;

const DeskBot = styled(Row)`
  position: relative;
  cursor: pointer;
  flex: 1;
  height: 194px;
  padding-top: 10px;
  border-right: 1px solid #3c5f30;

  &:nth-of-type(1) {
    color: #4c8ced;
  }

  &:nth-of-type(2) {
    color: #cb5460;
  }

  &.active {
    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }

    &.bankerDouble,
    &.banker {
      &::after {
        animation: flashBanker 1s 3;
      }
    }

    &.tie {
      &::after {
        animation: flashTie 1s 3;
      }
    }

    &.playerDouble,
    &.player {
      &::after {
        animation: flashPlayer 1s 3;
      }
    }
  }

  @keyframes flashPlayer {
    0% {
      background: none;
    }

    100% {
      background: linear-gradient(
        180deg,
        rgba(81, 166, 244, 0.5) 0%,
        rgba(44, 138, 224, 0.5) 100%
      );
    }
  }

  @keyframes flashTie {
    0% {
      background: none;
    }

    100% {
      background: linear-gradient(
        180deg,
        rgba(69, 151, 56, 0.5) 0%,
        rgba(53, 119, 87, 0.5) 100%
      );
    }
  }

  @keyframes flashBanker {
    0% {
      background: none;
    }

    100% {
      background: linear-gradient(
        180deg,
        rgba(181, 133, 62, 0.5) 0%,
        rgb(152, 96, 45, 0.5) 100%
      );
    }
  }
`;

const TopRow = styled(Row)<any>`
  span {
    margin-left: 8px;
    color: ${(props) => props.color || "#fff"};
  }
`;

const Detail = styled(Row)`
  position: absolute;
  padding-left: 14px;
  left: 0;
  bottom: 10px;
  color: #fff;
  cursor: pointer;

  img {
    width: 15px;
    margin-right: 8px;
  }

  span {
    margin-right: 8px;
  }
`;

const Circle = styled.div<CircleProps>`
  width: ${(props: CircleProps) => `${props.width}px`};
  height: ${(props: CircleProps) => `${props.height}px`};
  border-radius: ${(props: CircleProps) => `${props.borderRadius}px`};
  background: ${(props: CircleProps) => `${props.background}`};
  text-align: center;
  line-height: ${(props: CircleProps) => `${props.height}px`};
  color: #fff;
`;

export const BetTop: FC<Props> = ({
  en,
  zn,
  active,
  addChipsTodDesk,
  onAnimationend,
  showTable,
}) => {
  const ref: MutableRefObject<any> = useRef<HTMLElement>(null);

  const isActive = useMemo(() => en === active, [en, active]);

  function animationend() {
    ref.current && ref.current.classList.remove("active");
    onAnimationend && onAnimationend();
  }

  useEffect(() => {
    if (isActive) {
      ref.current.addEventListener("animationend", animationend);
      ref.current.classList.add("active");
    }

    return () => ref.current?.removeEventListener("animationend", animationend);
  }, [isActive]);

  return (
    <DeskBlock
      key={en}
      onClick={() => addChipsTodDesk({ category: en, store })}
      className={en}
      ref={isActive ? ref : null}
    >
      {zn}
      <Detail onClick={showTable}>
        <img src={iconPerson} alt="" />
        <span>3</span>
        <img src={iconChip} alt="" />
        <span>8</span>
      </Detail>
      <ChipStack
        category={en as BetType}
        {...{
          chipWidth: 40,
          chipHeight: 32,
          initPosition: {
            left: 81,
            bottom: 40,
          },
        }}
      />
    </DeskBlock>
  );
};

export const BetBottom: FC<Props> = ({
  en,
  zn,
  active,
  addChipsTodDesk,
  onAnimationend,
  showTable,
  index,
}) => {
  const ref: MutableRefObject<any> = useRef<HTMLElement>(null);

  const isActive = useMemo(() => en.toLocaleLowerCase() === active, [en, active]);

  function animationend() {
    ref.current && ref.current.classList.remove("active");
    onAnimationend && onAnimationend();
  }

  useEffect(() => {
    if (isActive) {
      ref.current.addEventListener("animationend", animationend);
      ref.current.classList.add("active");
    }

    return () => ref.current?.removeEventListener("animationend", animationend);
  }, [isActive]);

  return (
    <DeskBot
      key={en}
      className={en.toLocaleLowerCase()}
      iref={isActive ? ref : null}
      justify="center"
      ailgn="flex-start"
      onClick={() =>
        addChipsTodDesk({ category: en.toLocaleLowerCase(), store })
      }
    >
      <TopRow color={index ? "#CB5460" : "#4C8CED"}>
        <Circle
          {...{
            background: index ? "#CB5460" : "#4C8CED",
            borderRadius: 13,
            width: 26,
            height: 26,
          }}
        >
          {zn}
        </Circle>
        <span>{en}</span>
      </TopRow>
      <ChipStack
        category={en.toLocaleLowerCase() as BetType}
        {...{
          chipWidth: 40,
          chipHeight: 32,
          initPosition: {
            left: 102,
            bottom: 40,
          },
        }}
      />

      <Detail onClick={showTable}>
        <img src={iconPerson} alt="" />
        <span>3</span>
        <img src={iconChip} alt="" />
        <span>8</span>
      </Detail>
    </DeskBot>
  );
};
