import {FC, useState} from "react";
import Dialog from "@/components/Dialog";
import {useDlgHooks} from "@/components/Header/Modals/hooks"
import {Row} from "@/components/flex";
import styled from "styled-components";
import MyButton from "@/components/MyButton";

interface BettingItemStyledProps {
  isSelected: boolean
}
const BettingItem = styled.div<BettingItemStyledProps>`
  h3 {
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
    color: #fff;
    text-align: center;
    padding-bottom: 20px;
  }
  img {
    width: 345px;
    border: 4px solid ${props => props.isSelected ? '#E5C180' : 'transparent'};
    cursor: pointer;
  }
`

const SelectBox = styled(Row)`

`

const betts = [
  {
    value: '0',
    title: '豪华界面',
    imgSrc: require('@/assets/images/common/choseBetting_best.png')
  },
  {
    value: '1',
    title: '经典界面',
    imgSrc: require('@/assets/images/common/choseBetting_classic.png')
  }
]

interface Props {
  visible?: boolean,
  onClose?: () => void
}

const SelectBetting: FC<Props> = ({visible, onClose}) => {
  const {isShow, setIsShow, close} = useDlgHooks({visible, onClose})
  const [selected,setSelected] = useState('0')

  return (
    <Dialog title='选择投注界面' visible={isShow} onClose={() => setIsShow(false)} onAnimationend={close}>
      <SelectBox justify="space-between" style={{width: '822px', padding: '0 42px'}}>
        { betts.map((item, index) => (
          <BettingItem key={index} isSelected={item.value === selected} onClick={() => setSelected(item.value)}>
            <h3>豪华界面</h3>
            <img src={item.imgSrc} alt=""/>
          </BettingItem>
        ))}
      </SelectBox>
      <Row style={{width: '330px', margin: '10px auto 18px', padding: '15px 10px'}} justify="center" ailgn="center">
        <MyButton cancel name="取消" width={140} onClick={() => setIsShow(false)}/>
        <MyButton styles={{marginLeft: '25px'}} width={140} name="确认" onClick={confirm}/>
      </Row>
    </Dialog>
  )
}

export default SelectBetting
