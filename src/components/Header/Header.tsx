/**
 *
 * @description
 * 顶部header头
 */
import {FC, useState} from "react";
import styled from "styled-components";
import logoPng from "@/assets/images/common/header_logo.png"
import userInfo from "@/assets/images/common/user_icon.svg"
import wife from '@/assets/images/common/header_wifi.png'
import bell from '@/assets/images/common/header_bell.png'
import bell_hover from '@/assets/images/common/header_bell_hover.png'
import list from '@/assets/images/common/header_list.png'
import list_hover from '@/assets/images/common/header_list_hover.png'
import menu from '@/assets/images/common/header_menu.png'
import menu_hover from '@/assets/images/common/header_menu_hover.png'
import logout from '@/assets/images/common/header_logout.png'
import logout_hover from '@/assets/images/common/header_logout_hover.png'
import moneyIcon from '@/assets/images/common/header_money.png'
import {Row} from "@/components/flex";
import * as Modals from "./Modals"

// header外框
const HeaderLayout = styled.div`
  display: flex;
  width: 100%;
  padding-left: 36px;
  align-items: center;
  box-sizing: content-box;
  height: 84px;
  background-color: #0D0D0D;
  border-bottom: 1px solid #D3AF6E;

  .userIcon {
    display: inline-block;
    width: 22px;
    height: 22px;
    background: url(${userInfo}) no-repeat;
    background-size: cover;
  }

  .userText {
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    margin-left: 15px;
  }
`

// logo
interface LogoStyledProps {
  logoPng: string
}

const Logo = styled.div<LogoStyledProps>`
  width: 176px;
  height: 41px;
  background: url(${props => props.logoPng});
  background-size: contain;
`

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 25px;
  width: 562px;
  height: 49px;
  margin-left: 38px;
  border-radius: 40px;
  background-color: #171717;
`

// 圆形按钮
interface CycleBtnStyledProps {
  icon?: string,
  iconHover?: string,
}
const CycleBtn = styled.button<CycleBtnStyledProps>`
  width: 49px;
  height: 49px;
  background: linear-gradient(to bottom, rgba(23,23,23,0) 0, rgba(23,23,23,0) 49px, rgba(15, 14, 12, 0), rgba(15, 14, 12, 1)) no-repeat;
  background-size: 49px 98px;
  //background-position: ;
  //background-size: cover;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-position 300ms ease-in-out;
  &:before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(${props => props.icon}) no-repeat;
    background-size: contain;
  }
  &:hover {
    //background: linear-gradient(180deg, rgba(15, 14, 12, 0) 0%, #0F0E0C 100%);
    background-position: 0 100%;
    &:before {
      background: url(${props => props.iconHover}) no-repeat;
      background-size: contain;
    }
  }
`

const Money = styled(Row)`
  margin-left: 40px;
  .money_icon {
    display: inline-block;
    width: 22px;
    height: 22px;
    background: url(${moneyIcon}) no-repeat;
    background-size: contain;
  }
  .text {
    margin-left: 12px;
    color: #fff;
    font-size: 18px;
  }
`

const Header: FC = () => {
  let menuDlg

  return (
    <HeaderLayout>
      <Logo logoPng={logoPng}/>
      <UserInfo>
        <Row ailgn="center">
          <i className="userIcon"></i>
          <span className="userText">用户姓名</span>
        </Row>
        <div>
          <CycleBtn icon={bell} iconHover={bell_hover}></CycleBtn>
          <CycleBtn icon={list} iconHover={list_hover} onClick={() => Modals.showRecord()}></CycleBtn>
          <CycleBtn icon={menu} iconHover={menu_hover} onClick={() => Modals.showMenu()}></CycleBtn>
          <CycleBtn icon={logout} iconHover={logout_hover} onClick={() => Modals.showQuit()}></CycleBtn>
        </div>
      </UserInfo>
      <Money ailgn="center">
        <i className="money_icon" />
        <span className="text">1,245,24,5545445</span>
      </Money>
      {/* <MenuDlg visible={menuVisible} onClose={() => setMenuVisible(false)} /> */}
      {/* <RecordDlg visible={recordVisible} onClose={() => setRecordVisible(false)} /> */}
    </HeaderLayout>
  )
}

export default Header
