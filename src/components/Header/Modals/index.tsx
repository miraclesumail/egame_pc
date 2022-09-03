import MenuDlg from "./Menu";
import React, {createRoot} from "react-dom/client";
import type {Root} from "react-dom/client"
import {ReactElement, ReactNode} from "react";
import RecordDlg from "@/components/Header/Modals/Record";
import QuitDlg from "@/components/Header/Modals/Quit";
import ChipChose from "@/components/Header/Modals/ChipChose";
import SetVoice from "@/components/Header/Modals/SetVoice";
import Locales from "@/components/Header/Modals/Locales";
import ModifyPassword from "@/components/Header/Modals/ModifyPassword";
import ModifyNick from "@/components/Header/Modals/ModifyNick";
import Support from "@/components/Header/Modals/Support";
import RoadTips from "@/components/Header/Modals/RoadTips";
import Confirm from "@/components/Header/Modals/Confirm";
import ExcusiveService from "@/components/Header/Modals/ExcusiveService";
import BaotaiPassword from "@/components/Header/Modals/BaotaiPassword";
import SelectBetting from "@/components/Header/Modals/SelectBetting";


// 管理弹窗
interface ModalInstance {
  root: Root,
  container: HTMLDivElement
}

// 弹窗管理类
const modalMap = new Map<Symbol | number | string, ModalInstance>()

const destroyModal = (mark: Symbol) => {
  if (modalMap.has(mark)) {
    let { root, container } = modalMap.get(mark)
    console.log('摧毁弹窗~！')
    root.unmount()
    document.body.removeChild(container)
    root = undefined
    modalMap.delete(mark)
    console.log(modalMap)
  }
}
// 渲染弹窗
const renderBody = (mark:Symbol, node: ReactElement) => {
  const container = document.createElement('div');// 不能渲染
  const root = createRoot(container)
  root.render(node)
  document.body.appendChild(container)
  modalMap.set(mark, {root, container})
}

const showMenu = () => {
  const mark = Symbol('Menu') // 产生一个唯一识别弹窗标记
  const element = <MenuDlg onClose={() => destroyModal(mark)}/>
  renderBody(mark, element)
}

const showRecord = () => {
  const mark = Symbol('Menu')
  const element = <RecordDlg onClose={() => destroyModal(mark)}/>
  renderBody(mark, element)
}

const showQuit = () => {
  const mark = Symbol('Menu')
  const element = <QuitDlg onClose={() => destroyModal(mark)}/>
  renderBody(mark, element)
}

const showChipChose = () => {
  const mark = Symbol('Menu')
  const element = <ChipChose onClose={() => destroyModal(mark)}/>
  renderBody(mark, element)
}

const showVoice = () => {
  const mark = Symbol('Menu')
  const element = <SetVoice onClose={() => destroyModal(mark)}/>
  renderBody(mark, element)
}

const showLocales = () => {
  const mark = Symbol('Menu')
  const element = <Locales onClose={() => destroyModal(mark)}/>
  renderBody(mark, element)
}

const showModifyPassword = () => {
  const mark = Symbol('Menu')
  const element = <ModifyPassword onClose={() => destroyModal(mark)}/>
  renderBody(mark, element)
}

const showModifyNick = () => {
  const mark = Symbol('Menu')
  const element = <ModifyNick onClose={() => destroyModal(mark)}/>
  renderBody(mark, element)
}

const showSupport = () => {
  const mark = Symbol('Menu')
  const element = <Support onClose={() => destroyModal(mark)}/>
  renderBody(mark, element)
}

const showGoodRoad = () => {
  const mark = Symbol('Menu')
  const element = <RoadTips onClose={() => destroyModal(mark)}/>
  renderBody(mark, element)
}

interface ConfirmOptions {
  title?: string,
  content?: string,
  cancel?: boolean,
  onCancel?: () => void,
  onConfirm?: () => void,
}
const showConfirm = (options?: ConfirmOptions) => {
  const mark = Symbol('Menu')
  const element = (
    <Confirm
      title={options?.title}
      content={options?.content}
      cancel={options?.cancel}
      onCancel={options?.onCancel}
      onConfirm={options?.onConfirm}
      onClose={() => destroyModal(mark)}
    />)
  renderBody(mark, element)
}

// 专属服务弹窗
const showExService = () => {
  const mark = Symbol('Menu')
  const element = <ExcusiveService onClose={() => destroyModal(mark)}/>
  renderBody(mark, element)
}

// 保胎密码弹窗
const showBaotai = () => {
  const mark = Symbol('Menu')
  const element = <BaotaiPassword onClose={() => destroyModal(mark)}/>
  renderBody(mark, element)
}

// 选择投注界面
const showSelectBetting = () => {
  const mark = Symbol('Menu')
  const element = <SelectBetting onClose={() => destroyModal(mark)}/>
  renderBody(mark, element)
}

export {
  showMenu,
  showRecord,
  showQuit,
  showChipChose,
  showVoice,
  showLocales,
  showModifyPassword,
  showModifyNick,
  showSupport,
  showGoodRoad,
  showConfirm,
  showExService,
  showBaotai,
  showSelectBetting
}
