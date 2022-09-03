import React, { FC, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import MyInput from "@/components/MyInput"
import lockIcon from '@/assets/images/auth/lock_icon.svg'
import userIcon from '@/assets/images/auth/user_icon.svg'
import { devLogin, loginSlice, validTypeSelector } from "@/store/slices/auth.slice"
import {Column, Row} from "@/components/flex"
import MyButton from "@/components/MyButton"
import { delay } from "@/utils/tool"
import logoImg from "@/assets/images/auth/logo.png"
import VideoBg from "@/views/Auth/VideoBg";
import SelectLocales, {ListItem} from "@/views/Auth/SelectLocales";
import Dialog from "@/components/Dialog";
import OInput from "@/components/OInput";

import zh_CN from "@/assets/images/locales/zh-cn.png";
import en from "@/assets/images/locales/en.png";
import jp from "@/assets/images/locales/jp.png";
import th from "@/assets/images/locales/th.png";
import kr from "@/assets/images/locales/kr.png";
import vCodeOk from "@/assets/images/common/ok_1.png"

interface Props { }
const AuthContent = styled(Column)`
  display: block;
  width: 100%;
  overflow-y: auto;
  div.btn-wrap {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const LoginBox = styled.div`
  position: relative;
  z-index: 100;
  padding: 40px 62px;
  width: 388px;
  text-align: center;
  &:after {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    content: '';
    display: block;
    background-color: rgba(0,0,0, 0.3);
    backdrop-filter: blur(100px);
    z-index: -1;
  }
`;

const Img = styled.img`
  width: 120px;
  height: 134px;
`;


const VCode = styled.div`
  display: flex;
  width: 100%;
  height: 64px;

  div {
    width: 100%;
    background-color: #E5CFA8;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    img {

    }
  }

  button {
    display: block;
    width: 64px;
    height: 100%;
    flex-shrink: 0;
    background-color: #D3AF6E;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-style: none;
  }
`

const DisclaimerText = styled.p`
  text-align: left;
  width: 595px;
  height: 600px;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  overflow: auto;
  color: #fff;
  &::-webkit-scrollbar{background: transparent;}
`

// 多语言数据
const locals: ListItem[] = [
  {
    value: 'zh-cn',
    label: '中文-CN',
    icon: zh_CN
  },
  {
    value: 'en',
    label: '英语-EN',
    icon: en
  },
  {
    value: 'kr',
    label: '韩国人-KR',
    icon: kr
  },
  {
    value: 'jp',
    label: '日本-JP ',
    icon: jp
  },
  {
    value: 'th',
    label: '泰国人-th',
    icon: th
  },
]

const DlgLogErr = styled.p`
  font-size: 18px;
  color: #fff;
`;

const Auth: FC<Props> = () => {
  const validType = useSelector(validTypeSelector)
  const isLogin: boolean = useSelector(loginSlice)
  const dispatch = useDispatch()
  const nav = useNavigate()
  useEffect(() => {
    if (isLogin) nav('/')
  }, [isLogin])

  const handleEye = (eye: boolean) => {
    setPasswordData({
      ...passwordData,
      eye: eye,
      inputType: eye ? 'text' : 'password'
    })
  }
  const setValue = (key: 'username' | 'password' | 'validCode') => {
    if (key === 'username') return (value: string) => {
      setUsernameData(state => ({ ...state, value }))
    }
    if (key === 'validCode') return (value: string) => {
      setValidCodeData(state => ({ ...state, value }))
    }
    return (value: string) => {
      setPasswordData(state => ({ ...state, value }))
    }
  }
  const setErr = (key: 'username' | 'password' | 'validCode') => {
    if (key === 'username') return (err: boolean) => {
      setUsernameData(state => ({ ...state, err }))
    }
    if (key === 'validCode') return (err: boolean) => {
      setValidCodeData(state => ({ ...state, err }))
    }
    return (err: boolean) => {
      setPasswordData(state => ({ ...state, err }))
    }
  }
  const [passwordData, setPasswordData] = useState({
    key: 'password',
    inputType: 'password',
    eye: false,
    // 开发环境 value: '123456',
    value: window.isDev ? '123456' : '',
    placeholder: '请输入密码',
    icon: lockIcon,
    err: false,
    rules: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
      },
      {
        pattern: /^[a-zA-Z0-9]{6,20}$/,
        message: '密码只能包含字母、数字和下划线,长度为6-20位',
        trigger: 'blur',
      },
    ],
  })
  const [usernameData, setUsernameData] = useState({
    key: 'username',
    inputType: 'text',
    value: window.isDev ? 'ark' : '',
    placeholder: '请输入账号名称',
    icon: userIcon,
    err: false,
    rules: [
      {
        required: true,
        message: '请输入账号名称',
        trigger: 'blur',
      },
      {
        pattern: /^[a-zA-Z]\w{2,16}$/,
        message: '账号名称只能字母开头,包含字母、数字,且长度为3-16位',
        trigger: 'blur',
      },
    ]
  })
  const [validCodeData, setValidCodeData] = useState({
    key: 'validCode',
    inputType: 'text',
    value: '',
    placeholder: '请输入验证码',
    icon: lockIcon,
    err: false,
    rules: [
      {
        required: true,
        message: '请输入验证码',
        trigger: 'blur',
      },
      {
        pattern: /^[0-9]{6}$/,
        message: '验证码只能包含数字,且长度为6位',
        trigger: 'blur',
      },
    ],
  })
  const { inputList, btnSatatus } = useMemo(() => {
    const list = [usernameData, passwordData, validCodeData]
    if (validType === 0) list.splice(2, 1)
    return {
      inputList: list,
      btnSatatus: list.every(item => !item.err && item.value !== ''),
    }
  }, [usernameData, passwordData, validCodeData, validType])
  const formData = useMemo(() => {
    const password = passwordData.value
    if (validType === 0) {
      return {
        account: usernameData.value,
        password,
      }
    }
    return {
      account: usernameData.value,
      password,
      validCode: validCodeData.value,
    }
  }, [usernameData.value, passwordData.value, validCodeData.value, validType])
  const [dlgVisible, setDlgVisible] = useState(false)
  const [dlgDisclaimer, setDlgDisclaimer] = useState(false)
  const [dlgLogErr, setDlgLogErr] = useState(true)
  // 下拉框选择改变
  function localesChange (value, item) {
    console.log(value)
    console.log(item)
  }


  return (
    <VideoBg>
      <LoginBox>
        <Img src={logoImg} />
        <AuthContent>
          {
            inputList.map((item, index) => {
              let data: {
                handleEye?: (err: boolean) => void;
                setValue: (value: string) => void;
                setErr: (err: boolean) => void;
              } = {
                setValue: setValue(item.key as 'username' | 'password' | 'validCode'),
                setErr: setErr(item.key as 'username' | 'password' | 'validCode'),
              }
              if (item.key === 'password') {
                data = {
                  ...data,
                  handleEye
                }
              }
              return <React.Fragment key={item.key}>
                <MyInput {...data} {...item} inputKey={item.key} isLast={item.key === 'validCode'} borderType="underline" />
              </React.Fragment>
            })
          }
          <div className='btn-wrap'>
            <MyButton
                name="登录"
                styles={{
                  width: '100%',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
                onClick={async () => {
                  if (!btnSatatus) return
                  await delay(2000)
                  console.log('formData', formData)
                  await dispatch(devLogin({ usename: 'ark', password: '123456' }))
                }} />
            <MyButton
                cancel
                height={48}
                name="访客登录"
                styles={{
                  width: '100%',
                  marginTop: '20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#D3AF6E'
                }}
                onClick={ () => { setDlgDisclaimer(true) }}
                />
            <SelectLocales list={locals} onChange={localesChange} style={{width: '160px', marginTop: '22px'}} />
          </div>
        </AuthContent>
        {/* 弹窗 */}
        <Dialog title="访客登录" visible={dlgVisible} onClose={() => setDlgVisible(false)}>
          <div style={{padding: '0 46px 25px', width: '398px'}}>
            <OInput label="请输入验证码" suffixIcon={vCodeOk} />
            <VCode style={{marginTop: '12px'}}>
              <div>
                <img src="" alt=""/>
              </div>
              <button>
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.07692 7.08284H33.9231V32.929H8.07692V7.08284Z" fill="white"/>
                  <path d="M21 0C9.42072 0 0 9.42173 0 21C0 32.5964 9.40356 42 21 42C32.5793 42 42 32.5793 42 21C42 9.40255 32.5975 0 21 0ZM21 31.601C18.483 31.601 16.0691 30.6011 14.2893 28.8213C12.5095 27.0415 11.5096 24.6276 11.5096 22.1106C11.5096 19.5936 12.5095 17.1797 14.2893 15.3999C16.0691 13.6201 18.483 12.6202 21 12.6202H21.425L20.0005 11.1966C19.7354 10.9315 19.5865 10.572 19.5865 10.1971C19.5865 9.82222 19.7354 9.46268 20.0005 9.1976C20.2656 8.93251 20.6251 8.78358 21 8.78358C21.3749 8.78358 21.7344 8.93251 21.9995 9.1976L26.038 13.2361C26.1692 13.3673 26.2734 13.5231 26.3444 13.6946C26.4155 13.8661 26.452 14.0499 26.452 14.2356C26.452 14.4212 26.4155 14.605 26.3444 14.7765C26.2734 14.948 26.1692 15.1038 26.038 15.2351L21.9995 19.2736C21.7344 19.5386 21.3749 19.6876 21 19.6876C20.6251 19.6876 20.2656 19.5386 20.0005 19.2736C19.7354 19.0085 19.5865 18.6489 19.5865 18.274C19.5865 17.8991 19.7354 17.5396 20.0005 17.2745L21.8178 15.4572C21.5775 15.4471 21.3029 15.4471 21 15.4471C19.6821 15.4471 18.3938 15.8379 17.298 16.5701C16.2022 17.3023 15.3481 18.343 14.8438 19.5606C14.3394 20.7782 14.2075 22.118 14.4646 23.4105C14.7217 24.7031 15.3563 25.8904 16.2882 26.8224C17.2201 27.7543 18.4074 28.3889 19.7 28.646C20.9926 28.9031 22.3324 28.7712 23.55 28.2668C24.7676 27.7625 25.8083 26.9084 26.5405 25.8126C27.2727 24.7168 27.6635 23.4285 27.6635 22.1106C27.6635 21.7357 27.8124 21.3762 28.0775 21.1111C28.3425 20.846 28.702 20.6971 29.0769 20.6971C29.4518 20.6971 29.8113 20.846 30.0764 21.1111C30.3415 21.3762 30.4904 21.7357 30.4904 22.1106C30.4874 24.6267 29.4866 27.0389 27.7075 28.818C25.9283 30.5972 23.5161 31.598 21 31.601Z" fill="#D3AF6E"/>
                </svg>
              </button>
            </VCode>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <MyButton
                cancel
                width={140}
                name="取消"
                styles={{
                  marginTop: '20px',
                  cursor: 'pointer',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#D3AF6E'
                }}
                onClick={() => setDlgVisible(false)}
              />
              <MyButton
                width={140}
                name="确认"
                onClick={() => setDlgVisible(false)}
                styles={{
                  marginTop: '20px',
                  cursor: 'pointer',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#D3AF6E'
                }}
              />
            </div>
          </div>
        </Dialog>
        <Dialog title="免责声明" visible={dlgDisclaimer} onClose={() => setDlgDisclaimer(false)}>
          <Column style={{padding: '0 86px 25px'}}>
            <DisclaimerText>
              本公司提供的服务是经由会员本人意愿而进行使用，其风险应由会员本人承担。
              使用本服务的同时就说明会员同认同本公司提供的服务是正常、合理、公正的。
              并且会员应当注意使用本服务地区的相关法律规定。<br />
              <br />
              1. 会员在使用网站之前，需要确认是否符合该国家的法律及使用条款。
              根据有关国家的法律规定，游戏是违法行为，公司不鼓励您使用本公司服务。
              对于会员违反有关国家法律法规，导致使用网站造成的所有不利的后果，公司不承担
              任何责任。<br />
              <br />
              2. 法律上只对符合成人年龄的会员提供服务，对于会员不符合实际年龄产生的任何不利
              影响，公司概不承担责任。本软件安装或使用方均视为符合成人年龄。<br />
              <br />
              3. 会员需完全理解本合同所有内容，视为同意。与会员相关的所有个人信息及隐私都会
              3得到彻底的保护。为了游戏的顺利进行，部分信息提供给负责人和代理人。<br />
              <br />
              4. 会员在游戏过程中当公司察觉会员非法登录或恶意使用游戏漏洞、利用自动投注程序
              进行游戏等情况时，公司可以拒绝或阻止，对由此造成的损失公司概不负责。公司有权
              根据情况采取法律措施。<br />
              <br />
              5. 不可抗拒的自然灾害、停电、战争、其他非人类因素或无法事前预防的灾害导致游戏
              记录数据丢失，本公司将不做损失赔偿。除此之外，如果察觉到D-DOS或其他非法
              程式，公司有权会立即中断服务，拥有进行紧急检查及修复的绝对权力，不会对由此
              造成的损失负责。<br />
              <br />
              6. 会员使用本公司网站服务时，因自身原因泄露个人使用账号和密码所产生的一切结果
              由会员自负。因疏忽管理而产生损失或因第三者使不当用等责任由使用者承担，本公
              司概不承担其责任。<br />
              <br />
              7. 会员通过电话进行游戏时，代理人将对投注位置和投注金额向会员进行最终确认。
              开牌之前会员可以修改或取消投注，开牌后不能更改投注。<br />
              <br />
              8. 会员有义务告知代理人在游戏进行过程中发现任何错误。<br />
              <br />
              9. 由于人为或系统错误的原因导致系统和现场桌台的游戏结果不一致时，以现场桌台结
              果处理或取消当局。<br />
              <br />
              我已详细阅读使用条款并同意条款。
            </DisclaimerText>
            <Row justify="space-around" style={{width: '325px'}}>
              <MyButton
                cancel
                width={140}
                name="取消"
                styles={{
                  marginTop: '20px',
                  cursor: 'pointer',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#D3AF6E'
                }}
                onClick={() => setDlgDisclaimer(false)}
              />
              <MyButton
                width={140}
                name="确认"
                onClick={() => { setDlgDisclaimer(false); setDlgVisible(true) }}
                styles={{
                  marginTop: '20px',
                  cursor: 'pointer',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#D3AF6E'
                }}
              />
            </Row>
          </Column>
        </Dialog>
        <Dialog title="" visible={dlgLogErr} onClose={() => { setDlgLogErr(false) }}>
          <Column style={{paddingBottom: '25px'}}>
            <DlgLogErr>请输入有效账号</DlgLogErr>
            <MyButton name="确认" width={140} styles={{ marginTop: '84px' }}></MyButton>
          </Column>
        </Dialog>
      </LoginBox>
    </VideoBg>
  )
}
export default Auth
