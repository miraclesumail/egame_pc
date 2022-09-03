import {CSSProperties, FC, useEffect, useState} from "react";
import styled from "styled-components";

interface StatusProps {
  status?: boolean
}
const Switch = styled.span<StatusProps>`
  position: relative;
  display: inline-block;
  background-color: ${props => props.status ? '#D3AF6E' : '#121212'};
  width: 52px;
  height: 32px;
  border: 2px solid ${props => props.status ? '#D3AF6E' : '#806F51'};
  border-radius: 35px;
  cursor: pointer;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  .sw-halo {
    position: absolute;
    left: 6px;
    top: 6px;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgba(230, 225, 229, 0.08);
    transition: all 200ms ease-in-out;
    transform: ${props => props.status && 'translateX(20px)'};
  }
  .sw-point {
    display: block;
    position: absolute;
    left: 6px;
    top: 6px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${ props => props.status ? '#FFF' : '#D2AF6E'};
    transition: all 200ms ease-in-out;
    transform: ${props => props.status && 'translateX(20px)'};
  }
  &:hover {
    .sw-halo {
      transform: ${props => props.status ? 'translateX(20px) scale(2.5)' : 'translateX(0px) scale(2.5)'}
    }
    .sw-point {
      transform: ${props => props.status ? 'translateX(20px) scale(1.625)' : 'translateX(0px) scale(1.75)'};
    }
  }
`

interface Props {
  status?: boolean,
  onToggle?: (status: boolean) => void,
  style?: CSSProperties
}
const OSwitch: FC<Props>  = ({ status= false, style, onToggle }) => {
  const [myStatus, setMyStatus] = useState(status ?? false)
  useEffect(() => {
    onToggle && onToggle(myStatus)
  }, [myStatus])
  return (
    <Switch style={style} status={myStatus} onClick={() => setMyStatus(!myStatus)}>
      <span className="sw-halo"></span>
      <span className="sw-point"></span>
    </Switch>
  )
}

export default OSwitch
