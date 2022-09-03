import { Row, Column } from "@/components/flex";
import { Throttle } from "@/utils";
import useEventListener from "@/utils/hooks/useEventListener";
import React, { useState } from "react";
import styled from "styled-components";
import Table, { DeskStatus } from "./components/Table";
import RoadTip from "./components/roadTip";

const Container = styled(Row)<any>`
  width: 100%;
  height: 100vh;
  align-items: flex-start;
  overflow-y: auto;
  /* padding: 31px 136px; */
  background: #0d0d0d;
`;

const data = [
  { type: DeskStatus.MULTIPLE },
  { type: DeskStatus.OPEN },
  { type: DeskStatus.CHANGE },
  { type: DeskStatus.OCCUPY },
  { type: DeskStatus.OPEN },
  { type: DeskStatus.MAINTAIN },
  //   { type: DeskStatus.OPEN },
  //   { type: DeskStatus.MAINTAIN },
];

function getArr(data: any[], group: number) {
  const total = Math.ceil(data.length / group);
  return Array.from({ length: total }, (_, index) => index).reduce(
    (prev: any, next) => {
      // ([...prev, data.slice(next * group, (next + 1) * group)])
      prev.push(data.slice(next * group, (next + 1) * group));
      return prev;
    },
    []
  );
}

console.log(getArr(data, 3));

const ScaleColumn = styled(Column)<any>`
  transform: ${({ scale }: any) => `scale(${scale})`};
`;

const TablePick = () => {
  const [{ scale, isSmall }, setState] = useState({
    scale: document.body.clientWidth / 1920,
    isSmall: false,
  });

  useEventListener("resize", new Throttle(changeScale, 50).run);

  function changeScale() {
    const ratio = document.body.clientWidth / 1920;
    setState((state) => ({ ...state, scale: ratio }));
  }

  function change() {
    console.log("change");
    setState((state) => ({ ...state, isSmall: !isSmall }));
  }

  return (
    <>
      <button onClick={change}>change</button>
      <Container justify="center">
        <ScaleColumn style={{ width: "1648px" }} scale={scale}>
          {getArr(data, isSmall ? 4 : 3).map(
            (item: number[], index: number) => {
              return (
                <Row
                  justify={
                    item.length === (isSmall ? 4 : 3)
                      ? "space-between"
                      : "flex-start"
                  }
                  style={{ width: "100%" }}
                  key={index}
                >
                  {item.map((ele: any, index) => (
                    <Table status={ele.type} key={index} type={isSmall}></Table>
                  ))}
                </Row>
              );
            }
          )}
        </ScaleColumn>
        <RoadTip />
      </Container>
    </>
  );
};

export default TablePick;
