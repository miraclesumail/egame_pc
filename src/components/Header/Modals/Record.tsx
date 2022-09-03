import styled from "styled-components";
import {Row} from "@/components/flex";
import {FC, useEffect, useState} from "react";
import Dialog from "@/components/Dialog";
import OTable from "@/components/OTable";
import Icon from "@/components/Icon";
import MyButton from "@/components/MyButton";
import {useDlgHooks} from "@/components/Header/Modals/hooks";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('时间', 159, 6.0, 24, 4.0),
  createData('局号', 237, 9.0, 37, 4.3),
  createData('游戏类型', 262, 16.0, 24, 6.0),
  createData('桌号', 305, 3.7, 67, 4.3),
  createData('结果', 356, 16.0, 49, 3.9),
]
const cols = [
  {
    dataIndex: 'name',
    title: '时间'
  },
  {
    dataIndex: 'calories',
    title: '局号'
  },
  {
    dataIndex: 'fat',
    title: '游戏类型'
  },
  {
    dataIndex: 'carbs',
    title: '桌台'
  },
  {
    dataIndex: 'protein',
    title: '结果'
  },
  {
    dataIndex: 'total',
    title: '下注总额'
  },
  {
    dataIndex: 'time',
    title: '时间'
  }
]

const RecordBottom = styled(Row)`
  box-sizing: content-box;
  height: 68px;
  border-top: 1px solid rgba(229, 193, 128, 1);
  .notice {
    display: flex;
    align-items: center;
    //width: 100%;
    height: 100%;
    flex-grow: 2;
    padding: 0 10px;
    font-weight: 500;
    font-size: 15px;
    color: #CB5460;
    background-color: #3F1F1F;
    .notice-icon {
      font-size: 24px;
      color: #CB5460;
      margin-right: 10px;
    }
  }
  .line {
    width: 1px;
    height: 100%;
  }
  .totalInfo {
    width: 168px;
    height: 100%;
    padding: 10px 10px 0;
    color: #D1AD6D;
    font-size: 15px;
    background-color: #222;
    .top {
      text-align: left;
      padding-bottom: 10px;
      line-height: 20px;
    }
    .bottom {
      font-size: 18px;
      text-align: right;
      color: #fff;
      line-height: 20px;
    }
  }
`
interface Props {
  visible?: boolean,
  onClose?: () => void
}
const RecordDlg: FC<Props> = ({visible, onClose}) => {
  const { isShow, setIsShow, close } = useDlgHooks({visible, onClose})

  return (
    <Dialog title='游戏记录' visible={isShow} onClose={() => setIsShow(false)} onAnimationend={close}>
      <div style={{padding: '0 63px'}}>
        <OTable rows={rows} columns={cols}></OTable>
        <RecordBottom justify="space-around">
          <div className="notice">
            <Icon className="notice-icon" type="icon-alert-circle"></Icon>
            <span>仅显示最新24小时内的游戏记录</span>
          </div>
          <div className="totalInfo">
            <p className="top">总投注</p>
            <p className="bottom">2314325345</p>
          </div>
          <div className="line"></div>
          <div className="totalInfo">
            <p className="top">总派彩</p>
            <p className="bottom">2314325345</p>
          </div>
        </RecordBottom>
        <Row justify="center" style={{padding: '25px 0'}}>
          <MyButton name="关闭" width={140} onClick={() => setIsShow(false)}/>
        </Row>
      </div>
    </Dialog>
  )
}

export default RecordDlg
