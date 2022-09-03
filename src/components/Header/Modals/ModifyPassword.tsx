import {FC, useState} from "react";
import Dialog from "@/components/Dialog";
import {useDlgHooks} from "@/components/Header/Modals/hooks";
import styled from "styled-components";
import {Column, Row} from "@/components/flex";
import MyButton from "@/components/MyButton";
import OInput from "@/components/OInput";
import * as Modals from "@/components/Header/Modals/index";
import {log} from "util";

interface Props {
  visible?: boolean,
  onClose?: () => void
}

const Input = styled(OInput)`
  margin-top: 24px;
`

const rules = [
  {
    required: true,
    message: '请输入密码',
    trigger: 'blur',
  },
  {
    pattern: /^[a-zA-Z0-9]{6,20}$/,
    message: '密码只能包含字母、数字和下划线,长度为6-20位',
    trigger: 'blur',
  },
]

const ModifyPassword: FC<Props> = ({visible, onClose}) => {
  const {isShow, setIsShow, close} = useDlgHooks({visible, onClose})
  const confirm = () => {
    // todo
    Modals.showConfirm({
      title: '修改密码',
      content: '密码修改成功',
      onConfirm() {
        console.log('确认')
      },
      onCancel() {
        console.log('取消')
      }
    })
  }

  // 自定义验证
  const customRules = {
    message: '确认密码错误?',
    validator(value) {
      return value === '123'
    }
  }

  return (
    <Dialog title='修改密码' visible={isShow} onClose={() => setIsShow(false)} onAnimationend={close}>
      <Column style={{width: '427px', padding: '0 42px'}}>
        <Input label="请输入旧密码" type='password' rules={rules} onValidate={(b) => console.log('验证:', b)}/>
        <Input label="请输入新密码" type='password'/>
        <Input label="请确认新密码" type='password' rules={customRules} onValidate={(b) => console.log('自定义验证:', b)}/>
      </Column>
      <Row style={{width: '325px', margin: '10px auto 18px', padding: '15px 10px'}} justify="center" ailgn="center">
        <MyButton cancel name="取消" width={140} onClick={() => setIsShow(false)}/>
        <MyButton styles={{marginLeft: '25px'}} width={140} name="确认" onClick={confirm}/>
      </Row>
    </Dialog>
  )
}

export default ModifyPassword
