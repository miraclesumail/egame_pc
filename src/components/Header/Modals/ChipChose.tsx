/**
 * 筹码选择
 */
import {FC, useState} from "react";
import {useDlgHooks} from "@/components/Header/Modals/hooks";
import Dialog from "@/components/Dialog";
import MyButton from "@/components/MyButton";
import {Row} from "@/components/flex";
import styled from "styled-components";
import {Chip} from "@/components/Icon";
import chipBg from "@/assets/images/common/chipsBg.png"

interface ChipsGroupStyledProps {
  isSelected: boolean
}
const ChipsGroup = styled(Row)<ChipsGroupStyledProps>`
  width: 434px;
  height: 124px;
  padding: 25px 28px;
  margin-top: 14px;
  ${props => props.isSelected ? `background: url(${chipBg})` : `background-color: #1d1d1d`};
  border-radius: 10px;
  cursor: pointer;
`

const chipList = [0,1,2]

interface Props {
  visible?: boolean,
  onClose?: () => void
}
const ChipChose:FC<Props> = ({visible, onClose}) => {
  const { isShow, setIsShow, close } = useDlgHooks({visible, onClose})
  const [chipState, setChipState] = useState(0)
  const confirm = () => {
    // todo
  }

  return (
    <Dialog title='选择筹码样式' visible={isShow} onClose={() => setIsShow(false)} onAnimationend={close}>
      <div style={{padding: '0 60px'}}>
        {
          chipList.map((item, index) => (
            <ChipsGroup isSelected={chipState === item} key={index} justify='space-between' ailgn='center' onClick={() => setChipState(item)}>
              {chipState === item ? <Chip text="1,000" color='purple' /> : <Chip text="1,000" />}
              {chipState === item ? <Chip text="10,000" color='green' /> : <Chip text="10,000" />}
              {chipState === item ? <Chip text="50,000" color='red' /> : <Chip text="50,000" />}
              {chipState === item ? <Chip text="500,000" color='black' /> : <Chip text="500,000" />}
            </ChipsGroup>
          ))
        }
      </div>
      <Row style={{width: '325px', margin: '10px auto 18px', padding: '15px 10px'}} justify="center" ailgn="center">
        <MyButton cancel name="取消" width={140} onClick={() => setIsShow(false)}/>
        <MyButton styles={{marginLeft: '25px'}} width={140} name="确认" onClick={confirm}/>
      </Row>
    </Dialog>
  )
}

export default ChipChose
