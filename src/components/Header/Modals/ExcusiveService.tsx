import {FC, useState} from "react";
import Dialog from "@/components/Dialog";
import {useDlgHooks} from "@/components/Header/Modals/hooks";
import styled from "styled-components";
import {Column, Row} from "@/components/flex";
import MyButton from "@/components/MyButton";
import OInput from "@/components/OInput";
import * as Modals from "@/components/Header/Modals/index";
import Icon from "@/components/Icon";

interface Props {
  visible?: boolean,
  onClose?: () => void
}

const Input = styled(OInput)`
  margin-top: 24px;
`
const Notice = styled(Row)`
  padding-top: 24px;
  font-weight: 400;
  font-size: 12px;
  color: #CB5460;
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
      title: '申请专属服务',
      content: '您已申请专属服务，请保持您的电话畅通。\n' +
        '我们的工作人员会尽快与您取得联系。',
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
    <Dialog title='申请专属服务' visible={isShow} onClose={() => setIsShow(false)} onAnimationend={close}>
      <Column style={{width: '320px', padding: '0 20px', margin: '0 auto'}}>
        <Input label="区码" type='password' rules={rules} onValidate={() => console.log('奥错')}/>
        <Input label="电话号码" type='password'/>
        <Input label="出码额" type='password' rules={customRules} onValidate={() => console.log('自定义报错')}/>
        <Notice>
          <Icon type="icon-alert-circle" color="#CB5460"></Icon>
          <span>
        请先确认您的联系电话<br/>
        我们将在您申请专属服务后，尽快与您联系。
        </span>
        </Notice>
      </Column>
      <Row style={{width:'310px',padding: '0 10px', margin: '23px auto 18px'}} justify="space-between" ailgn="center">
        <MyButton cancel name="取消" width={140} onClick={() => setIsShow(false)}/>
        <MyButton width={140} name="确认" onClick={confirm}/>
      </Row>
    </Dialog>
  )
}

export default ModifyPassword
