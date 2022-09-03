import { createFromIconfontCN } from '@ant-design/icons';
import type { IconFontProps } from '@ant-design/icons/lib/components/IconFont'
import {FC} from "react";
import type {CSSProperties} from 'react'
import styled from "styled-components";

const Icon = createFromIconfontCN({
  // scriptUrl: '/iconfonts/iconfont.js',
  scriptUrl: 'https://at.alicdn.com/t/c/font_3617349_j7j6if0e6m.js'
})

interface Props {
  className?: string
  type?: string,
  color?: string,
  style?: CSSProperties
}

const DefaultIcon:FC<IconFontProps> = (props) => {
  return (
    <Icon {...props} style={{fontSize: '24px', color: props.color, ...props.style}} ></Icon>
  )
}

interface  ChipIconStyledProps {
  content?: string
}
const ChipIcon = styled.span<ChipIconStyledProps>`
  position: relative;
  display: inline-flex;
  width: 75px;
  height: 75px;
  .chip-icon {
    font-size: 75px;
  }
  .chip-text {
    font-family: D-DIN;
    display: block;
    position: absolute;
    left: 0;
    top: 28px;
    width: 100%;
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    text-align: center;
    text-shadow:-1px 0 #d9d9d9,0 1px #d9d9d9,1px 0 #d9d9d9,0 -1px #d9d9d9;
  }
`
// 筹码icon
/**
 * @param text=筹码上的文字
 * @param color=颜色
 */
interface ChipProps {
  text: string
  color?: 'normal' | 'purple' | 'green' | 'red' | 'black'
}
export const Chip: FC<ChipProps> = ({color= 'normal', text}) => {
  return (
    <ChipIcon>
      <Icon className="chip-icon" type={`icon-chips-${color}`} />
      <span className="chip-text">{text}</span>
    </ChipIcon>
  )
}

export default DefaultIcon
