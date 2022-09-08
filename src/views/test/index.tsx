import React, { useRef, useEffect } from "react";
import bgtable from "@/assets/images/test/tableBg.png";
import decoration from "@/assets/images/test/decoration.png";
import styled from "styled-components";
import Card from "./components/card";
import MIDI from "midi.js";

import Zoom from "@/components/zoom";
import Cover from "./components/cover";
import { formatResultList, initCanvas } from "@/utils/tool";
import {
  drawGrid,
  drawSolidCircle,
  drawText,
} from "@/utils/dewdrop11/formatChartData";
import { Player, Banker, Tie, BankerDouble } from "./components/deskSection";

const Container: any = styled.div`
  position: relative;
  //   background-image: url(${decoration}), url(${bgtable});
  background-size: 100% 528px, 100% 639px;
  background-repeat: no-repeat, no-repeat;
  background-position: left bottom, left top;
  width: 1920px;
  height: 839px;
  margin: 0 auto;
  z-index: 1;
`;

const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const Index = () => {
  const ref = useRef<HTMLCanvasElement>();

  function playMidi(url) {
    MIDI.Player.removeListener(); // removes current listener.
    let noneTriggered = true;

    MIDI.Player.addListener((data) => {
      const now = data.now; // where we are now
      const end = data.end; //

      console.log(now, end, "dsksss0000");

      if (end - now <= 1000 && noneTriggered) {
        noneTriggered = false;

        setTimeout(() => {
          MIDI.Player.stop();
          playMidi(url);
        }, 1000);
      }
    });
    // "/bg.mp3.mid"
    MIDI.Player.loadFile(url, () => {
      MIDI.Player.start();
    });
  }
  //   const { rows, columns, lineColor, origin, lineWidth, cellWidth, cellHeight } = o;

  useEffect(() => {
    const audioCtx = new AudioContext();
    // audioCtx.resume().then(() => {
    //   playMidi("/bg.mp3.mid");
    // });

    setTimeout(() => {
      playMidi("/bg.mp3.mid");
    }, 5000);

    // MIDI.WebAudio.getContext()
    //   .resume()
    //   .then(() => {
    //     playMidi("/bg.mp3.mid");
    //   });
    // const ctx = initCanvas(ref.current, false, 800, 600);
    // const ctx = ref.current.getContext("2d");

    fetch("/qq/db.json").then((res) => console.log(res, "resres"));
    // drawGrid(ctx, {
    //   rows: 8,
    //   columns: 10,
    //   cellWidth: 50,
    //   cellHeight: 50,
    //   origin: [10, 10],
    //   lineColor: "#f5d300",
    //   lineWidth: 1,
    // });
    // const radius = ((50 - 1) / 2) | 0;

    // for (let i = 0; i < data.length; i++) {
    //   const x = 10 + ((i / 8) | 0) * 50 + 25;
    //   const y = 10 + (i % 8) * 50 + 25;
    //   drawSolidCircle(ctx, { x, y, radius, color: "#4C8CED" });
    //   drawText(ctx, { x, y, text: "新", color: "#fff", fontSize: "25px" });
    // }
  }, []);

  return (
    // <div style={{ width: "100%", height: "100vh", overflow: "auto" }}>
    // <Zoom {...{ width: 1920, height: 1000 }}>
    <Container>
      <Card
        {...{
          banker: 11,
          player: 12,
          bankerDouble: 16,
          tie: 18,
          playerDouble: 20,
        }}
        onClick={() => console.log("www")}
      />
      {/* <canvas width={800} height={600} ref={ref}></canvas> */}
    </Container>
    // </Zoom>
  );
};

export default Index;
