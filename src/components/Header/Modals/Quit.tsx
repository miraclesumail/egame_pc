import {FC} from "react";
import {useDlgHooks} from "@/components/Header/Modals/hooks";
import Dialog from "@/components/Dialog";
import MyButton from "@/components/MyButton";
import {Row} from "@/components/flex";
import styled from "styled-components";

const Text = styled.p`
  font-size: 18px;
  color: #fff;
  text-align: center;
  padding-top: 54px;
  padding-bottom: 60px;
`

interface Props {
  visible?: boolean,
  onClose?: () => void
}
const QuitDlg:FC<Props> = ({visible, onClose}) => {
  const { isShow, setIsShow, close } = useDlgHooks({visible, onClose})

  const confirm = () => {
    // todo
  }

  return (
    <Dialog title='退出游戏' visible={isShow} onClose={() => setIsShow(false)} onAnimationend={close}>
      <Text>是否退出游戏!</Text>
      <Row style={{padding: '0 30px 25px'}} justify="center" ailgn="center">
        <MyButton cancel name="取消" onClick={() => setIsShow(false)}/>
        <MyButton styles={{marginLeft: '25px'}} name="确认" onClick={confirm}/>
      </Row>
    </Dialog>
    )
}

export default QuitDlg
