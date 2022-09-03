import React from "react";
import styled from "styled-components";
import { Row, Column } from "@/components/flex";
import logo from "@/assets/images/bet/logo.png";
import warning from "@/assets/images/bet/warning.svg";

const Container = styled(Row)`
  /* width: 300px; */
  position: absolute;
  left: 0;
  top: 0;
  height: 90px;
  padding-left: 43px;

  marquee {
    width: 200px;
    height: 30px;
    background: rgba(23, 23, 23, 0.35);
    border-radius: 100px;
    line-height: 30px;
  }
`;

const Top = styled(Row)`
  width: 320px;
  height: 30px;
  color: #fff;
`;

const Round = styled.div`
  width: 62px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 100px;
  color: #000;
  background: #fbfbfb;
  font-size: 14px;
  margin-right: 20px;
`;

const Warning = styled.div`
  width: 20px;
  height: 20px;
  background: url(${warning}) no-repeat center;
  background-size: cover;
  margin-right: 12px;
`;

// const Container = styled(Row)`
//   width: 300px;
//   height: 90px;
// `;

const Logo = styled.div<any>`
  width: 79px;
  height: 60px;
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  background-size: cover;
`;

const LeftSide = () => {
  return (
    <Container {...{ ailgn: "center" }}>
      <Logo src={logo} />
      <Column justify="space-between" style={{height: 70}}>
        <Top>
          <Round>局号</Round>
          <span>H00122529002005</span>
          <Warning />
          <span>无可用限红</span>
        </Top>
        <Top>
          <Round>传统</Round>

          {/*
 // @ts-ignore */}
          <marquee scrollamount={5}>
            1.Dear valued customers, kindly be informed that the game server
            will have scheduled maintenance between 06:00AM to 08:00AM (GMT + 8)
            on August 22nd 2022 (Monday). We sincerely appologize for any
            inconvenience that may cause. We will assure to provide better
            service from time to time. Thank you for your understanding and
            support.
            2.尊敬的客戶您好，為了提供更優質的遊戲服務，本公司將於2022年8月22日（星期一）06：00AM～08：00AM
            (GMT+8)進行遊戲例行維護，遊戲將會暫停，造成不便之處敬請見諒，謝謝。
            {/*
 // @ts-ignore */}
          </marquee>
        </Top>
      </Column>
    </Container>
  );
};

export default LeftSide;
