import {FC, useState} from "react";
import Dialog from "@/components/Dialog";
import {useDlgHooks} from "@/components/Header/Modals/hooks";
import styled from "styled-components";
import {Column, Row} from "@/components/flex";
import MyButton from "@/components/MyButton";
import OInput from "@/components/OInput";
import * as Modals from "@/components/Header/Modals"


const Input = styled(OInput)`
  margin: 40px 0;
`

interface Props {
  visible?: boolean,
  onClose?: () => void
}

const ModifyPassword: FC<Props> = ({visible, onClose}) => {
  const {isShow, setIsShow, close} = useDlgHooks({visible, onClose})
  const confirm = () => {
    // todo
    Modals.showConfirm({
      title: '更改昵称',
      content: '更改昵称成功',
      cancel: true,
      onConfirm() {
        console.log('确认')
      },
      onCancel() {
        console.log('取消')
      }
    })
  }

  return (
    <Dialog title='修改昵称' visible={isShow} onClose={() => setIsShow(false)} onAnimationend={close}>
      <Column style={{width: '427px', padding: '0 42px'}}>
        <Input label="请输入新昵称"/>
      </Column>
      <Row style={{width: '325px', margin: '10px auto 18px', padding: '15px 10px'}} justify="center" ailgn="center">
        <MyButton cancel name="取消" width={140} onClick={() => setIsShow(false)}/>
        <MyButton styles={{marginLeft: '25px'}} width={140} name="确认" onClick={confirm}/>
      </Row>
    </Dialog>
  )
}

export default ModifyPassword
