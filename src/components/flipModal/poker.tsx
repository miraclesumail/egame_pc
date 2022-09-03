import React, {
  FC,
  useEffect,
  useState,
  forwardRef,
  ForwardRefExoticComponent,
  Ref,
} from "react";
import styled from "styled-components";
import classnames from "classnames";
import Frame1 from "@/assets/images/bet/pokers/Frame1.svg";
import Frame2 from "@/assets/images/bet/pokers/Frame2.svg";
import Frame3 from "@/assets/images/bet/pokers/Frame3.svg";
import Frame4 from "@/assets/images/bet/pokers/Frame4.svg";

interface Props {
  direction?: "horizon" | "vertical";
  active: boolean;
  [key: string]: any;
}

const Container = styled.div`
  position: relative;
  width: 80px;
  height: 120px;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  &.active {
    transform: rotateY(180deg);
  }
`;

const Poker = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;

  img {
    width: 80px;
    height: 120px;
  }

  &.flipCardFront {
    color: black;
  }

  &.flipCardBack {
    color: white;
    transform: rotateY(180deg);
  }
`;

const HorizonContainer = styled.div`
  position: relative;
  width: 120px;
  height: 80px;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  align-self: flex-start;

  &.active {
    transform: rotateX(180deg);
  }

  img {
    width: 120px;
    height: 80px;
  }

  &.flipCardFront {
    color: black;
  }

  &.flipCardBack {
    color: white;
    transform: rotateX(180deg);
  }
`;

const RotatePoker: ForwardRefExoticComponent<Props> = forwardRef(
  ({ direction = "vertical", active }, ref: Ref<any>) => {
    // const [active, setActive] = useState(false);

    useEffect(() => {

        console.log(direction, '------', active)
    }, [active]);

    return direction === "vertical" ? (
      <Container
        ref={ref}
        className={classnames({
          active,
        })}
      >
        <Poker className="flipCardFront">
          <img src={Frame1} alt="Avatar" />
        </Poker>
        <Poker className="flipCardBack">
          <img src={Frame2} alt="Avatar" />
        </Poker>
      </Container>
    ) : (
      <HorizonContainer
        ref={ref}
        className={classnames({
          active,
        })}
      >
        <Poker className="flipCardFront">
          <img src={Frame3} alt="Avatar" />
        </Poker>
        <Poker className="flipCardBack">
          <img src={Frame4} alt="Avatar" />
        </Poker>
      </HorizonContainer>
    );
  }
);

export default RotatePoker;
