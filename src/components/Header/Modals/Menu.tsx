/**
 *
 * @constructor
 * 菜单弹窗
 */
import {FC} from "react";
import Dialog from "@/components/Dialog";
import styled from "styled-components";
import Icon from '@/components/Icon'
import {Row} from "@/components/flex";
import MyButton from "@/components/MyButton";
import {useDlgHooks} from "@/components/Header/Modals/hooks";
import * as Modals from "../Modals"

// 菜单列表
const MenuList = styled.ul`
  width: 353px;
`
const MenuItem = styled(Row)`
  display: flex;
  justify-content: center;
  height: 53px;
  font-weight: 500;
  font-size: 16px;
  line-height: 53px;
  color: #F6E0B0;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  //transition: color 300ms ease-in-out;

  .iconMenuItem {
    margin-right: 10px;
    color: #F6E0B0;
    font-size: 24px;
    transition: color 300ms ease-in-out;
  }
  &:hover {
    background-color: rgba(204, 169, 106, .2);
    color: #fff;
    .iconMenuItem {
      color: #FFF;
    }
  }
`

interface MenuDataItem {
  icon: string,
  name: string,
  onChose?: () => void
}

const menuData: Array<MenuDataItem> = [
  {
    icon: 'icon-record-circle-line',
    name: '游戏记录',
    onChose() {
      Modals.showRecord()
    }
  },
  {
    icon: 'icon-poker_style',
    name: '筹码样式',
    onChose() {
      Modals.showChipChose()
    }
  },
  {
    icon: 'icon-tips',
    name: '好路提示',
    onChose() {
      Modals.showGoodRoad()
    }
  },
  {
    icon: 'icon-sound',
    name: '设置声音',
    onChose() {
      Modals.showVoice()
    }
  },
  {
    icon: 'icon-language',
    name: '选择语言',
    onChose() {
      Modals.showLocales()
    }
  },
  {
    icon: 'icon-key',
    name: '修改密码',
    onChose() {
      Modals.showModifyPassword()
    }
  },
  {
    icon: 'icon-edit-name',
    name: '更改昵称',
    onChose() {
      Modals.showModifyNick()
    }
  },
  {
    icon: 'icon-support-agent',
    name: '联系客服',
    onChose() {
      Modals.showSupport()
    }
  },
  {
    icon: 'icon-logout',
    name: '退出游戏',
    onChose() {
      Modals.showQuit()
    }
  },
  {
    icon: 'icon-logout',
    name: '申请专属服务',
    onChose() {
      // todo
      Modals.showExService()
    }
  },
  {
    icon: 'icon-logout',
    name: '包台密码',
    onChose() {
      // todo
      Modals.showBaotai()
    }
  },
  {
    icon: 'icon-logout',
    name: '选择您喜好的投注界面',
    onChose() {
      Modals.showSelectBetting()
    }
  }
]
interface Props {
  visible?: boolean,
  onClose?: () => void
}
const MenuDlg:FC<Props> = ({visible, onClose}) => {
  const { isShow, setIsShow, close } = useDlgHooks({visible, onClose})

  return (
    <Dialog title='选单' visible={isShow} onClose={() => setIsShow(false)} onAnimationend={close}>
      <MenuList>
        {
          menuData.map((item, index) => {
            return <MenuItem key={index} ailgn="center" onClick={item.onChose}>
              <Icon className="iconMenuItem" type={item.icon ?? ''} />
              {item.name}
            </MenuItem>
          })
        }
      </MenuList>
      <Row justify="center" style={{padding: '25px 0'}}>
        <MyButton name="关闭" width={140} onClick={() => setIsShow(false)} />
      </Row>
    </Dialog>
  )
}

export default MenuDlg
