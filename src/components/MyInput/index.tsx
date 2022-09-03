import React, {useMemo} from 'react'
import styled from 'styled-components'
import closeEye from '@/assets/images/auth/closeEye.svg'
import openEye from '@/assets/images/auth/showEye.svg'
import {ValidateInput} from '@/utils'
import {Row} from '../flex'

const ContentView = styled(Row)`
  position: relative;
  width: 100%;

  .errView {
    width: 100%;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #F36060;
    position: absolute;
    text-align: left;
    left: 0;
    top: 70px;
    opacity: 0;
    z-index: 1;
  }
`

interface InputProps {
  borderColor: string | null;
  isLast: boolean;
  borderType: 'primary' | 'underline'
}

const InputView = styled(Row) <InputProps>`
  position: relative;
  width: ${({isLast}) => !isLast ? '100%' : '185px'};
  height: 64px;
  padding: 20px 0;
  z-index: 10;
  //border-width: 1px;
  //border-style: solid;
  ${(props) => {
    return props.borderType === 'primary' ?
      `border: 1px solid rgba(10, 8, 8, 0.5);` :
      `border-bottom: 1px solid ${props.borderColor || '#D3AF6E'};`
  }}
  /* 过渡boder颜色 */
  transition: border-color 0.3s ease-in-out;

  input::placeholder {
    color: #D7D7D7
  }
`

interface IconProps {
  img?: string,
  right?: boolean,
}

const Icon = styled.img<IconProps>`
  ${({right}) => right ? `
    width:22px;
    height:22px;
    ` : `
    width:20px;
    height:20px;
    `
  }
  margin: 0 auto;
  margin-right: ${({right}) => right ? '0' : '14px'};
`
const Input = styled.input`
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

  &::placeholder {
    color: #d7d7d7;
    opacity: 0.5;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
  }
`

interface Props {
  key: string,
  inputKey: string,
  inputType: string,
  eye?: boolean,
  handleEye?: (eye: boolean) => void,
  value: string,
  icon: string,
  placeholder: string,
  isLast: boolean,
  setValue: (value: string) => void,
  setErr: (err: boolean) => void,
  err: boolean,
  rules: any[],
  borderType?: 'primary' | 'underline'
}

function MyInput(props: Props) {
  const {inputKey, borderType, err, value, placeholder, isLast, setValue, inputType, setErr, eye, handleEye, icon, rules} = props
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(value)
    blur(value)
  }
  const [isFocus, setIsFocus] = React.useState(false)
  const [errMsg, setErrMsg] = React.useState('')
  // 如果rules 为失焦时验证 则验证
  const blur = (v?: string) => {
    if (rules.length) {
      const errMsg = ValidateInput.validate(rules, v || value)
      if (errMsg) {
        setErr(true)
        setErrMsg(errMsg)
      } else {
        setErr(false)
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
    placeholder
  }
  const borderColor = useMemo(() => {
    if (err) {
      return '#CB5460'
    }
    if (isFocus) {
      return '#F6E0B0'
    }
    return '#5F5F5F'

  }, [err, isFocus])
  return (
    <ContentView style={{
      marginBottom: isLast ? '0' : '30px',
    }} justify="space-between">
      <InputView borderType={props.borderType ?? 'primary'} borderColor={borderColor} justify="space-between" isLast={isLast}>
        {
          !isLast && <Icon src={icon}/>
        }
        <Input type={inputType} {...inputData} />
        {inputKey === 'password' &&
          <Icon onClick={() => handleEye && handleEye(!eye)} src={eye ? openEye : closeEye} right/>}

      </InputView>
      <div className={`errView animate__animated ${err && 'animate__fadeInDown'}`}>
        {errMsg}
      </div>
    </ContentView>
  )
}

export default MyInput
