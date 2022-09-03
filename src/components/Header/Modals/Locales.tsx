import {FC} from "react";
import Dialog from "@/components/Dialog";
import {useDlgHooks} from "@/components/Header/Modals/hooks";
import styled from "styled-components";
import zh_CN from "@/assets/images/locales/zh-cn.png";
import en from "@/assets/images/locales/en.png";
import jp from "@/assets/images/locales/jp.png";
import th from "@/assets/images/locales/th.png";
import kr from "@/assets/images/locales/kr.png";
import Icon from "@/components/Icon";
import {Row} from "@/components/flex";
import MyButton from "@/components/MyButton";

const List = styled.ul`

`

const ListItem = styled(Row)`
  padding-left: 40px;
  padding-right: 18px;
  height: 60px;
  cursor: pointer;
  &:hover {
    background-color: #1F1D1A;
    &.label {
      color: #E5C180;
    }
  }
`
const Label = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`

// 多语言数据
const locals = [
  {
    value: 'zh-cn',
    label: '中文',
    icon: zh_CN
  },
  {
    value: 'en',
    label: 'English',
    icon: en
  },
  {
    value: 'kr',
    label: '한국인',
    icon: kr
  },
  {
    value: 'jp',
    label: 'やまと',
    icon: jp
  },
  {
    value: 'th',
    label: 'Việt Nam',
    icon: th
  },
]

interface Props {
  visible?: boolean,
  onClose?: () => void
}
const Locales:FC<Props> = ({visible,onClose}) => {
  const {isShow, setIsShow, close} = useDlgHooks({visible, onClose})
  const confirm = () => {
    // todo

  }

  return (
    <Dialog title='选择语言' visible={isShow} onClose={() => setIsShow(false)} onAnimationend={close}>
      <List>
        {
          locals.map((item, index) => (
            <ListItem key={index} ailgn="center" justify="space-between">
              <Label className="label">
                <img width={45} height={45} style={{marginRight: '20px'}} src={item.icon}/>
                {item.label}
              </Label>
              <Icon type='icon-circle-check' color="#6C935D" />
            </ListItem>
          ))
        }
      </List>
      <Row style={{width: '325px', margin: '10px auto 18px', padding: '15px 10px'}} justify="center" ailgn="center">
        <MyButton cancel name="取消" width={140} onClick={() => setIsShow(false)}/>
        <MyButton styles={{marginLeft: '25px'}} width={140} name="确认" onClick={confirm}/>
      </Row>
    </Dialog>
    )
}

export default Locales
