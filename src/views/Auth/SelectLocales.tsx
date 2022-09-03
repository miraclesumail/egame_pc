/**
 * 多语言下拉框（通用）
 * @constructor
 */
import styled from "styled-components";
import {CSSProperties, FC, useEffect, useMemo, useRef, useState} from "react";
import arrowIcon from '@/assets/images/auth/down-arrow.png'
import useEventListener from "@/utils/hooks/useEventListener";
import {flushSync} from "react-dom";

interface SelectStyledProps {
  bgOp: number,
}
const Select = styled.div<SelectStyledProps>`
  padding: 8px 10px 0 10px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: rgba(13, 13, 13, ${props => props.bgOp});
  transition: background-color 300ms ease-in-out;
  div.selected {
    display: flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;
    font-weight: 400;
    color: #E5C180;
    font-size: 16px;
    cursor: pointer;
    span {
      margin-left: 12px;
    }
    div.wrap {
      display: flex;
    }
  }
  i.arrow {
    display: block;
    width: 10px;
    height: 10px;
    background: url(${arrowIcon}) no-repeat;
    background-size: contain;
    transform: rotateZ(${props => props.bgOp === 1 ? '180deg' : '0'});
    transition: transform 300ms ease-in-out;
  }
`

interface UlStyledProps {
  display: string,
  isOpen: boolean,
  opacity: number,
  width: string
  left: string,
  top: string
}

const Ul = styled.ul<UlStyledProps>`
  position: fixed;
  width: ${props => props.width};
  padding-bottom: 8px;
  left: ${props => props.left};
  top: ${props => props.top};
  display: ${props => props.display};
  opacity: ${props => props.opacity};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background-color: ${props => props.isOpen ? '#0D0D0D' : 'transparent'};
  transition: opacity 300ms ease-in-out;
  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 30px;
    margin-top: 4px;
    font-weight: 400;
    color: #E5C180;
    font-size: 16px;
    cursor: pointer;
    span {
      margin-left: 12px;
    }
    &:hover {
      background-color: rgba(217, 217, 217, .1);
    }
  }
`

interface IconStyledProps {
  url: string
}

const Icon = styled.i<IconStyledProps>`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: ${props => `url(${props.url})`};
  background-size: contain;
`

export interface ListItem {
  value: string,
  label?: string,
  icon?: string,
  [key: string]: any
}

export interface Props {
  value?: string,
  list?: ListItem[],
  style?: CSSProperties,
  onChange?: (value: string, item: ListItem) => void
}

const SelectLocales: FC<Props> = ({onChange, style, value, list = []}) => {
  const refSelect = useRef<HTMLDivElement>(null)
  const opts = useRef<HTMLUListElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState({
    value: value ? value : list[0].value,
    item: value ? list.find(item => item.value === value) : list[0]
  })
  const [display, setDisplay] = useState('none')
  const [op, setOp] = useState(0)

  const options = useMemo(() => {
    return list.filter(item => item.value !== selected.value)
  }, [selected])

  const optionsPos = useMemo(() => {
    if (refSelect.current) {
      const dom = refSelect.current
      const left = dom.getBoundingClientRect().left
      const top = dom.getBoundingClientRect().top + dom.offsetHeight
      const width = dom.getBoundingClientRect().width
      return {
        top,
        left,
        width
      }
    }
    return {
      top: 0,
      left: 0,
      width: 0
    }

  }, [isOpen])

  useEffect(() => {
    onChange(selected.value, selected.item)
    setIsOpen(false)
  }, [selected])

  useEffect(() => {
    if (isOpen) {
      setDisplay('block')
      setTimeout(() => {
        setOp(1)
      }, 100)
    } else {
      setOp(0)
    }
  }, [isOpen])

  // 事件监听
  useEventListener('transitionend', () => {
    if (!isOpen && display === 'block') {
      setDisplay('none')
    }
  }, opts.current)

  return (
    <Select ref={refSelect} style={style} bgOp={op}>
      <div className="selected" onClick={() => setIsOpen(!isOpen)}>
        <div className="wrap">
          <Icon url={selected.item.icon}></Icon>
          <span>{selected.item.label}</span>
        </div>
        <i className="arrow"></i>
      </div>
      <Ul ref={opts} display={display} opacity={op} isOpen={isOpen} width={`${optionsPos.width}px`} left={`${optionsPos.left}px`} top={`${optionsPos.top}px`}>
        {
          options.map((item, index) => (
            <li key={index} onClick={() => setSelected({value: item.value, item})}>
              <Icon url={item.icon}/>
              <span>{item.label}</span>
            </li>
          ))
        }
      </Ul>
    </Select>
  )
}


export default SelectLocales
