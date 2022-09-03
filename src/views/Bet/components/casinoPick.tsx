import React from "react";
import styled from "styled-components";
import { Row, Column } from "@/components/flex";
import casino1 from "@/assets/images/bet/casino1.png";
import casino2 from "@/assets/images/bet/casino2.png";
import casino3 from "@/assets/images/bet/casino3.png";

const Container = styled(Column)`
  padding: 0 50px;
`

const Header = styled(Row)`
  color: #e5c180;
  font-size: 18px;
`;

const Img = styled(Row)<any>`
  width: 671px;
  height: 144px;
  background-size: 100%;
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  margin-bottom: 26px;
`;

const CasinoPick = () => {
  return (
    <Container>
      <Img src={casino1}/>
      <Img src={casino2}/>
      <Img src={casino3}/>
    </Container>
  );
};

export default CasinoPick;
