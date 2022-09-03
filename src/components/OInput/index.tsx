import React, {FC, useMemo, useState} from 'react'
import styled from 'styled-components'
import closeEye from '@/assets/images/auth/closeEye.svg'
import openEye from '@/assets/images/auth/showEye.svg'
import {CustomRule, ValidateInput} from '@/utils'
import {Column, Row} from '../flex'
import QueueAnim from 'rc-queue-anim'
import Icon from "@/components/Icon";

const ContentView = styled(Column)`
  position: relative;
  width: 100%;

  .errView {
    width: 100%;
    margin-top: 4px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #F36060;
    text-align: left;
    //opacity: 0;
    z-index: 1;
  }
`

interface InputProps {
  borderColor: string | null;
  height?: number,
  width?: number
}

const InputView = styled(Row) <InputProps>`
  position: relative;
  width: ${({width}) => width ? width : '100%'};
  height: ${({height}) => height ? height : '64px'};
  padding: 20px 16px;
  z-index: 10;
  border-width: 1px;
  border-style: solid;
  /* 过渡boder颜色 */
  ${(props) => `border-color: ${props.borderColor}`};
  border-radius: 8px;
  transition: border-color 0.3s ease-in-out;
  background-color: #1d1d1d;
  overflow: hidden;
`

interface IconProps {
  img?: string,
  isEye?: boolean,
}

const ImgIcon = styled.img<IconProps>`
  width: 24px;
  height: 24px;
  margin: 0 auto;
  ${props => props.isEye && 'cursor: pointer'};
`

// 输入框的标题
interface LabelStyledProps {
  isFocus: boolean
}

const Label = styled.span<LabelStyledProps>`
  display: inline-block;
  position: absolute;
  left: 16px;
  top: 22px;
  color: #717171;
  height: 18px;
  line-height: 18px;
  font-size: 18px;
  transform-origin: left top;
  transform: ${props => props.isFocus ? 'translate(0px, -13px) scale(0.66)' : 'translate(0, 0px) scale(1)'};
  transition: transform 300ms ease-in-out;
  z-index: 9;
`

// 输入框
const Input = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  padding: 0 1.5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  transform: translate(0, 4px);
  z-index: 10;

  &::placeholder {
    color: #d7d7d7;
    opacity: 0.5;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
  }
`

interface ValidateIcon {
  isSuccess: boolean
}

const VIcon: FC<ValidateIcon> = ({isSuccess}) => {
  return (
    <Icon
      type={isSuccess ? 'icon-circle-check' : 'icon-alert-circle'}
      color={isSuccess ? '#6C935D' : '#CB5460'}/>
  )
}

interface Props {
  type?: 'text' | 'password' | 'number',
  eye?: boolean,
  handleEye?: (eye: boolean) => void,
  value?: string,
  icon?: string,
  suffixIcon?: string,
  label?: string,
  placeholder?: string,
  onChange?: (value: string) => void,
  onValidate?: (err: boolean) => void, // 当校验有错误时候触发
  rules?: any[] | CustomRule,
  className?: string
}
const OInput: FC<Props> = (
  {
    value,
    label,
    placeholder,
    onChange,
    type = 'text',
    onValidate,
    eye,
    handleEye,
    icon,
    suffixIcon,
    rules,
    className,
  }
) => {
  const [inputValue, setInputValue] = useState('')
  const [isEye, setIsEye] = useState(eye)
  const [inputType, setInputType] = useState(type)
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    onChange && onChange(value)
  }
  const [isFocus, setIsFocus] = useState(false)
  const [isErr,setIsErr]= useState(false) // 内部判断是否验证报错
  const [errMsg, setErrMsg] = useState('')
  // 如果rules 为失焦时验证 则验证
  const blur = (v?: string) => {
    if (rules) {
      const errMsg = ValidateInput.validate(rules, v || inputValue)
      if (errMsg) {
        setIsErr(true)
        setErrMsg(errMsg)
        onValidate && onValidate(false)
      } else {
        setIsErr(false)
        onValidate && onValidate(true)
      }
    }
    setIsFocus(false)
  }
  const inputData = {
    onBlur: () => blur(),
    onFocus: () => {
      setIsFocus(true)
    },
    onChange: inputChange,
    value: value,
    placeholder: isFocus ? placeholder : ''
  }
  const borderColor = useMemo(() => {
    if (isErr) {
      return '#CB5460'
    }
    if (isFocus) {
      return '#D3AF6E'
    }
    return '#1D1D1D'
  }, [isErr, isFocus])

  const isLabelFocus = useMemo(() => {
    if (isFocus || (inputValue && inputValue.length > 0)) {
      return true
    } else {
      return false
    }
  }, [isFocus, inputValue])

  const toggleEye = () => {
    if (inputType === 'password') {
      setInputType('text')
    } else {
      setInputType('password')
    }
    setIsEye(!isEye)
    handleEye && handleEye(!isEye)
  }

  return (
    <ContentView className={className} justify="flex-start" ailgn="flex-start">
      <InputView borderColor={borderColor} justify="space-between">
        {
          icon && <ImgIcon src={icon}/>
        }
        <Label isFocus={isLabelFocus}>{label}</Label>
        <Input type={inputType} {...inputData} />
        {
          isFocus && type === 'password' ?
            <ImgIcon onClick={toggleEye} isEye src={isEye ? openEye : closeEye}/> :
            suffixIcon ? <ImgIcon src={suffixIcon}></ImgIcon> : <VIcon isSuccess={!isErr}/>
        }
      </InputView>
      <QueueAnim type={["top", "alpha"]}>
        {isErr ?
          [<div className="errView" key="a">
            {errMsg}
          </div>] : null
        }
      </QueueAnim>
    </ContentView>
  )
}

export default OInput
