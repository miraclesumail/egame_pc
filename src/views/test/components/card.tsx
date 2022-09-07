import React, { FC } from "react";
import styled from "styled-components";
import { Column, Row } from "@/components/flex";

type Keys = "banker" | "player" | "tie" | "bankerDouble" | "playerDouble";

type Props = Record<Keys, number>;

enum Themes {
  SPRING = "spring",
  SUMMER = "summer",
  WINTER = "winter",
}

type CssProps =
  | "background"
  | "headBackground"
  | "bankerBackground"
  | "tieBackground"
  | "playerBackground"
  | "evenBackground"
  | "oddBackground"
  | "headerColor"
  | "contentColor";

const themes: Record<Themes, Record<CssProps, string>> = {
  spring: {
    background: "#20262D",
    headBackground: "#38424E",
    bankerBackground: "#603942",
    tieBackground: "#2B4A38",
    playerBackground: "#2F5376",
    evenBackground: "#242A32",
    oddBackground: "#20262D",
    headerColor: "#F8F8F8",
    contentColor: "#FFF",
  },
  winter: {
    background: "#20262D",
    headBackground: "#38424E",
    bankerBackground: "#603942",
    tieBackground: "#2B4A38",
    playerBackground: "#2F5376",
    evenBackground: "#242A32",
    oddBackground: "#20262D",
    headerColor: "#829EFC",
    contentColor: "#fff",
  },
  summer: {
    background: "#20262D",
    headBackground: "#38424E",
    bankerBackground: "#603942",
    tieBackground: "#2B4A38",
    playerBackground: "#2F5376",
    evenBackground: "#242A32",
    oddBackground: "#20262D",
    headerColor: "#829EFC",
    contentColor: "#fff",
  },
};

const Container = styled(Column)<Record<CssProps, string>>`
  width: 288px;
  height: 236px;
  padding-top: 15px;
  background: ${({ background }) => background || "#fff"};
`;

const Line = styled(Row)`
  width: 100%;
  height: 36px;
`;

const Left = styled(Row)<Record<CssProps, string>>`
  width: 90px;
  height: 36px;

  &.banker {
    background: ${({ bankerBackground }) => bankerBackground};
  }

  &.player {
    background: ${({ playerBackground }) => playerBackground};
  }

  &.tie {
    background: ${({ tieBackground }) => tieBackground};
  }
`;

const Header = styled(Row)<Record<CssProps, string>>`
  width: 82px;
  height: 25px;
  color: ${({ headerColor }) => headerColor};
  border-radius: 100px;
  font-size: 14px;
  margin-bottom: 15px;
  background: ${({ headBackground }) => headBackground};
`;

const Right = styled(Row)<any>`
  width: 198px;
  height: 36px;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
`;

const card: FC<Props> = ({
  banker,
  player,
  tie,
  bankerDouble,
  playerDouble,
}) => {
  return (
    <Container {...themes.spring}>
      <Header {...themes.spring} justify="center">
        桌台总计
      </Header>
      {[
        { key: "banker", val: banker },
        { key: "player", val: player },
        { key: "tie", val: tie },
        { key: "banker", val: bankerDouble },
        { key: "player", val: playerDouble },
      ].map(({ key, val }, index) => (
        <Line>
          <Left {...themes.spring} className={key} justify="center">
            {key}
          </Left>
          <Right
            justify="center"
            background={
              index % 2
                ? themes.spring.oddBackground
                : themes.spring.evenBackground
            }
            color={themes.spring.contentColor}
          >
            {val}
          </Right>
        </Line>
      ))}
    </Container>
  );
};

export default card;
