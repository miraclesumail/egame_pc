import { Column } from "@/components/flex";
import React, { FC } from "react";
import styled from "styled-components";

const InquiryWrap = styled(Column)`
  width: 75px;
  height: 242px;
  padding: 20px 0;
  background: #faf8f4;
`;

const Container = styled(Column)`
  width: 75px;
  cursor: pointer;
`;

const Hollow = styled.div<any>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: ${(props: any) => `2px solid ${props.boderColor}`};
`;

const Solid = styled.div<any>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(props: any) => props.background};
`;

const Line = styled.span<any>`
  width: 20px;
  height: 20px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: calc(50% - 1px);
    top: 0;
    width: 2px;
    height: 100%;
    background: ${(props: any) => props.background};
    transform: rotate(45deg);
    transform-origin: center center;
  }
`;

const Text = styled.div<any>`
  width: 24px;
  height: 24px;
  font-size: 24px;
  line-height: 24px;
  color: ${(props: any) => props.color};
`;

const ButtonWrap = styled(Column)`
  height: 70px;

  > div {
    &:nth-of-type(1),
    &:nth-of-type(2) {
      margin-bottom: 5px;
    }
  }
`;

const InquiryButton: FC<any> = ({ inquiry }) => {
  return (
    <InquiryWrap justify="space-between">
      <Container onClick={() => inquiry('banker')}>
        <Text color={"#CB5460"}>庄</Text>
        <div></div>
        <ButtonWrap>
          <Hollow boderColor={"#4C8CED"} />
          <Solid background={"#4C8CED"} />
          <Line background={"#CB5460"} />
        </ButtonWrap>
      </Container>
      <Container onClick={() => inquiry('player')}>
        <Text color={"#4C8CED"}>闲</Text>
        <ButtonWrap>
          <Hollow boderColor={"#CB5460"} />
          <Solid background={"#CB5460"} />
          <Line background={"#4C8CED"} />
        </ButtonWrap>
      </Container>
    </InquiryWrap>
  );
};

export default InquiryButton;
