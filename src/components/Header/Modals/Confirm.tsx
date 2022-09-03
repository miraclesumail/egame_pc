import {FC, useState} from "react";
import {Row} from "@/components/flex";
import MyButton from "@/components/MyButton";
import Dialog from "@/components/Dialog";
import styled from "styled-components";
import {useDlgHooks} from "@/components/Header/Modals/hooks";


const DlgTitle = styled.h3`
  padding: 45px 30px;
  width: 368px;
  font-weight: 400;
  font-size: 18px;
  color: #fff;
  text-align: center;
`

export interface Props {
  title?: string,
  content?: string,
  cancel?: boolean,
  onCancel?: () => void,
  onConfirm?: () => void,
  visible?: boolean,
  onClose?: () => void
}

const Confirm: FC<Props> = (props) => {
  const {isShow, setIsShow, close} = useDlgHooks({visible: props.visible, onClose: props.onClose})
  const cancel = () => {
    setIsShow(false)
    props.onCancel && props.onCancel()
  }
  const confirm = () => {
    props.onConfirm && props.onConfirm()
  }

  return (
    <Dialog title={props.title ?? ''} visible={isShow} onClose={() => setIsShow(false)} onAnimationend={close}>
      <DlgTitle>{props.content}</DlgTitle>
      <Row style={{width: '325px', margin: '10px auto 18px', padding: '15px 10px'}} justify="center" ailgn="center">
        { props.cancel && <MyButton cancel name="取消" width={140} onClick={cancel}/>}
        <MyButton styles={{marginLeft: props.cancel ? '25px':'0'}} width={140} name="确认" onClick={confirm}/>
      </Row>
    </Dialog>
  )
}

export default Confirm
