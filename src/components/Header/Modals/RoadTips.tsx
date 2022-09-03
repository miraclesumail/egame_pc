import {FC, useState} from "react";
import {useDlgHooks} from "@/components/Header/Modals/hooks";
import Dialog from "@/components/Dialog";
import MyButton from "@/components/MyButton";
import {Column, Row} from "@/components/flex";
import styled from "styled-components";
import {Checkbox, Switch, SxProps} from "@mui/material";
import Icon from "@/components/Icon";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Container} from "@mui/material";
import OSwitch from "@/components/OSwitch";

const checkedSx: SxProps = {
  color: '#D2AF6E',
  '&': {
    padding: 0,
    marginLeft: '-2px'
  },
  '& .MuiSvgIcon-root': {fontSize: 24},
  '&.Mui-checked': {
    color: '#D2AF6E',
  }
}
const Item = styled.div`
  position: relative;
  box-sizing: content-box;
  width: 120px;
  padding: 12px 13px;
  background-color: #201E1B;
  border-radius: 4px;
`
const Img = styled.img`
  width: 100%;
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
const TipsBox = styled(Column)`
  position: absolute;
  left: 0;
  top: 0;

  i {
    display: block;
    width: 44px;
    height: 35px;
    background: #211F1C;
    border-top-right-radius: 4px;
  }
`
const Content = styled.div`
  display: block;
  background: #211F1C;
  width: 146px;
  height: 109px;
  padding: 15px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  font-size: 14px;
  line-height: 18px;
  color: #fff;
  word-break: break-all;
`

interface ItemProps {
  title?: string,
  src?: string,
  checked?: boolean,
  tips?: string
}

const RoadItem: FC<ItemProps> = (
  {
    title = '',
    src = '',
    checked = false,
    tips = ''
  }) => {
  const [hover, setHover] = useState(false)
  return (
    <Item>
      <Row ailgn="center" justify="space-between" style={{width: '100%', paddingBottom: '2px'}}>
        <Checkbox defaultChecked={checked} sx={checkedSx}></Checkbox>
        <p style={{fontWeight: '400', fontSize: '15px', color: '#fff'}}>{title}</p>
        <Icon onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              type="icon-alert-circle-rect" color="#D2AF6E"
              style={{cursor: "pointer", marginRight: '-3px', position: 'relative', zIndex: '100'}}
        />
      </Row>
      <Img src={src}/>
      {hover &&
        <TipsBox ailgn="flex-end">
          <i></i>
          <Content>
            {tips}
          </Content>
        </TipsBox>}
    </Item>
  )
}

const roadMap = [
  {
    imgSrc: require('@/assets/images/road/road_changxian.png'),
    title: '长庄',
    checked: false,
    tips: '在大路中，连续有4个或以上的庄'
  },
  {
    imgSrc: require('@/assets/images/road/road_changxian.png'),
    title: '长闲',
    checked: false,
    tips: '在大路中，连续有4个或以上的闲'
  },
  {
    imgSrc: require('@/assets/images/road/road_dantiao.png'),
    title: '单跳',
    checked: false,
    tips: '在大路中，庄闲连环追逐地出现，连续4个或4个以上'
  },
  {
    imgSrc: require('@/assets/images/road/road_shuangtiao.png'),
    title: '双跳',
    checked: false,
    tips: '在大路中，两个庄闲连环追逐地出现，连续4次或4次以上'
  },
  {
    imgSrc: require('@/assets/images/road/road_yitingliangfang.png'),
    title: '一厅两房',
    checked: false,
    tips: '在大路中，「庄闲闲」或是「闲庄庄」连续出现两次或以上'
  },
  {
    imgSrc: require('@/assets/images/road/road_fengzhuangtiao.png'),
    title: '逢庄跳',
    checked: false,
    tips: '在大路中，每逢出现庄，下把就一定闲，连续3次或3次以上'
  },
  {
    imgSrc: require('@/assets/images/road/road_fengxiantiao.png'),
    title: '逢闲跳',
    checked: false,
    tips: '在大路中，庄闲连环追逐地出现，连续4个或4个以上'
  },
  {
    imgSrc: require('@/assets/images/road/road_fengzhuangchi.png'),
    title: '逢庄黐',
    checked: false,
    tips: '在大路中，前两列开庄时皆有黐庄两次或以上，闲的个数任意，再次开庄'
  },
  {
    imgSrc: require('@/assets/images/road/road_fengxianchi.png'),
    title: '逢闲黐',
    checked: false,
    tips: '在大路中，前两列开闲时皆有黐闲两次或以上，庄的个数任意，再次开闲'
  },
  {
    imgSrc: require('@/assets/images/road/road_paipaichi.png'),
    title: '拍拍黐',
    checked: false,
    tips: '在大路中，相邻两列的庄闲都有两个或以上'
  },
  {
    imgSrc: require('@/assets/images/road/road_gechihzhuang.png'),
    title: '隔黐庄',
    checked: false,
    tips: '在大路中，1庄转2个或以上庄，至少两次，闲的个数任意'
  },
  {
    imgSrc: require('@/assets/images/road/road_gechixian.png'),
    title: '隔黐闲',
    checked: false,
    tips: '在大路中，1闲转2个或以上闲，至少两次，庄的个数任意'
  },
]

interface Props {
  visible?: boolean,
  onClose?: () => void
}

const RoadTips: FC<Props> = ({visible, onClose}) => {
  const {isShow, setIsShow, close} = useDlgHooks({visible, onClose})

  const confirm = () => {
    // todo
  }

  return (
    <Dialog title='好路提示设置' visible={isShow} onClose={() => setIsShow(false)} onAnimationend={close}>
      <Row style={{paddingLeft: '33px', height: '40px', marginBottom: '5px '}}>
        <Label>
          好路提示
          <OSwitch style={{marginLeft: '22px'}}/>
        </Label>
      </Row>
      <Container style={{height: '490px'}} fixed>
        <Grid2 container width='656px' rowSpacing={'24px'}>
          {
            roadMap.map((item, index) => (
              <Grid2 display="flex" justifyContent="center" xs={3} key={index}>
                <RoadItem src={item.imgSrc} title={item.title} tips={item.tips}></RoadItem>
              </Grid2>
            ))
          }
        </Grid2>
      </Container>
      <Row style={{width: '325px', margin: '10px auto 18px', padding: '15px 10px'}} justify="center" ailgn="center">
        <MyButton cancel name="取消" width={140} onClick={() => setIsShow(false)}/>
        <MyButton styles={{marginLeft: '25px'}} width={140} name="确认" onClick={confirm}/>
      </Row>
    </Dialog>
  )
}

export default RoadTips
