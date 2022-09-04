import React from "react";
import bgtable from "@/assets/images/test/tableBg.png";
import decoration from "@/assets/images/test/decoration.png";
import styled from "styled-components";
import Zoom from "@/components/zoom";
import Cover from "./components/cover";
import { Player, Banker, Tie, BankerDouble } from "./components/deskSection";

const Container: any = styled.div`
  position: relative;
  background-image: url(${decoration}), url(${bgtable});
  background-size: 100% 528px, 100% 639px;
  background-repeat: no-repeat, no-repeat;
  background-position: left bottom, left top;
  width: 1920px;
  height: 639px;
  margin: 0 auto;
  z-index: 1;
`;

const Index = () => {
  return (
    // <div style={{ width: "100%", height: "100vh", overflow: "auto" }}>
    <Zoom {...{ width: 1920, height: 1000 }}>
      <Container>
        <svg
          data-v-a9f5d69a=""
          width="1920px"
          height="639px"
          viewBox="0 0 1920 639"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <Cover />
          <Player />
          <Banker />
          <Tie />
          {/* <BankerDouble /> */}

          {/* <Player /> */}
          {/* <Banker /> */}
        </svg>
      </Container>
      <div style={{ width: "100%", height: "900px" }}></div>
    </Zoom>
  );
};

export default Index;
