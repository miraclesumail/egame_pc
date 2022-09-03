import {Row} from "@/components/flex";
import MyButton from "@/components/MyButton";
import Dialog from "@/components/Dialog";
import {useDlgHooks} from "@/components/Header/Modals/hooks";
import {FC} from "react";
import Icon from "@/components/Icon";
import styled from "styled-components";
import React from "react";

const Wrap = styled(Row)`
  width: 343px;
  height: 64px;
  margin: 0 42px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 8px;
  color: #D3AF6E;
  background-color: #1D1D1D;
`

const NoticeText = styled.p`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  margin-top: 12px;
  color: #CB5460;
`

interface Props {
  visible?: boolean,
  onClose?: () => void
}
const Support:FC<Props> = ({visible, onClose}) => {
  const {isShow, setIsShow, close} = useDlgHooks({visible, onClose})

  return (
    <Dialog title='联系电话' visible={isShow} onClose={() => setIsShow(false)} onAnimationend={close}>
      <Wrap justify='center'>
        <Icon type='icon-support-agent' color='#D3AF6E'/>
        <p style={{paddingLeft: '12px'}}>+63 969 356 0000</p>
      </Wrap>
      <NoticeText>有任何问题请与客服联系.</NoticeText>
      <Row style={{width: '325px', margin: '10px auto 18px', padding: '15px 10px'}} justify="center" ailgn="center">
        <MyButton styles={{marginLeft: '25px'}} width={140} name="确认" onClick={confirm}/>
      </Row>
    </Dialog>
  )
}

export default Support
