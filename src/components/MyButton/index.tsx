import {CSSProperties, useMemo, useState} from 'react'
import styled from 'styled-components'
import { Row } from '../flex'
import LoadingView from '../LoadingView'
import {hover} from "@testing-library/user-event/dist/hover";
interface MyButtonViewProps {
  w?: number,
  h?: number,
  c?: string,
  hoverC?: string,
  bgC?: string,
  hoverBgC?: string,
  loading?: boolean,
}
const MyButtonView = styled(Row) <MyButtonViewProps>`
  width: ${({ w }) => w ? `${w}px` : '100%'};
  height: ${({ h }) => h ? `${h}px` : '48px'};
  background: ${({ bgC }) => bgC ? bgC : 'linear-gradient(37.21deg, #EEAB47 -24.69%, #B99454 56.84%)'};
  border-radius:${({ h }) => h ? h / 2 : 24}px;
  color:${({ c }) => c ? c : '#fff'};
  position: relative;
  font-size: 16px;
  opacity: ${({ loading }) => loading ? 0.5 : 1};
  transition: opacity .5s ease-in-out;
  cursor: pointer;
  .loadingIcon{
  ${({ loading }) => {
    if (loading) return 'display:block;'
    return 'display:none;'
  }}
    width: ${({ h }) => h ? h / 2 : 35.33 / 2}px;
    height: ${({ h }) => h ? h / 2 : 35.33 / 2}px;
    position: absolute;
    right:10%;
  }
  &:hover {
    color: ${({hoverC}) => hoverC ? hoverC : '#fff' };
    background: ${({ hoverBgC }) => hoverBgC ? hoverBgC : 'linear-gradient(37.21deg, #B99454 -24.69%, #EEAB47 56.84%)' };
  }
`
const CancelView = styled(Row) <MyButtonViewProps>`
  width: ${({ w }) => w ? `${w}px` : '100%'};
  height: ${({ h }) => h ? `${h}px` : '48px'};
  border-radius:${({ h }) => h ? h / 2 : 24}px;
  background: #181C27;
  mix-blend-mode: normal;
  border: 1px solid #D3AF6E;
  color:${({ c }) => c ? c : '#D3AF6E'};
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: ${({hoverC}) => hoverC ? hoverC : '#fff' };
    background: ${({ hoverBgC }) => hoverBgC ? hoverBgC : 'linear-gradient(37.21deg, #B99454 -24.69%, #EEAB47 56.84%)' };
  }
`
interface Props {
  width?: number,
  height?: number,
  name: string,
  textColor?: string,
  hoverTextColor?: string,
  bgColor?: string,
  hoverBgColor?: string,
  onClick?: () => void,
  cancel?: boolean,
  loading?: boolean,
  styles?: CSSProperties,
}

const MyButton = ({ width = 0, height = 0, textColor = '', hoverTextColor = '', bgColor = '', hoverBgColor = '', name, onClick, cancel, loading, styles = {} }: Props) => {
  const poropsLoading = useMemo(() => typeof loading === 'boolean' ? true : false, [loading])
  const [iloading, setLoading] = useState(false)
  const getLoading = useMemo(() => {
    if (poropsLoading) return loading
    return iloading
  }, [loading, iloading, poropsLoading])
  const propsLoadingClick = async () => {
    onClick && onClick()
  }
  const handleClick = async () => {
    if (getLoading) return
    if (poropsLoading) return propsLoadingClick()
    setLoading(true)
    onClick && await onClick()
    setLoading(false)
  }
  const MyButtonProps = {
    w: width,
    h: height,
    c: textColor,
    hoverC: hoverTextColor,
    bgC: bgColor,
    hoverBgC: hoverBgColor,
    onClick: handleClick
  }
  if (cancel) {
    return <CancelView style={styles} justify='center' {...MyButtonProps}>{name}</CancelView>
  }
  return (
    <MyButtonView style={styles} loading={getLoading} justify='center' {...MyButtonProps}>
      {name}
      <div className="loadingIcon">
        <LoadingView />
      </div>
    </MyButtonView>
  )
}

export default MyButton
