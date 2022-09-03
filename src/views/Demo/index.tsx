import OSwitch from "@/components/OSwitch";
import OTable from "@/components/OTable";
import OInput from "@/components/OInput";
import vCodeOk from "@/assets/images/common/ok_1.png";
import React from "react";
import MyButton from "@/components/MyButton";

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
const Demo = () => {
  return (
    <>
      <div>
        <OSwitch></OSwitch>
      </div>
      <div>
        <OTable rows={rows} columns={cols}></OTable>
      </div>
      <div>
        <OInput label="请输入验证码" suffixIcon={vCodeOk} />
      </div>
      <div>
        <MyButton name="确认" />
      </div>
    </>
  )
}
export default Demo
