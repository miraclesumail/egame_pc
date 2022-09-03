import { FC, useMemo } from 'react'
import styled from 'styled-components'
import backIcon from '@/assets/images/back_icon.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { Communicator } from '@/utils/tool'
import { Column, Row } from '../flex'
import { useSelector } from 'react-redux'
import { selectorWork } from '@/store/slices/work.slice'

const HeaderView = styled(Column)`
  height: 87px;
  width: 100%;
  //flex主轴反向
  border-bottom: 0.5px solid #F6E0B0;


  .headerTitleView {
    height: 41px;
    width: 100%;
    position: relative;

    .backView {
      position: absolute;
      left: 0;
      width: 40px;
      height: 100%;
      padding-left: 20px;

      img {
        width: 6px;
        height: 12px;
      }
    }

    .rightIconView {
      position: absolute;
      right: 0;
      padding-right: 20px;
    }
  }
`
interface Props {
  routeProps: {
    title?: string,
    rightIcon?: () => JSX.Element,
    [key: string]: any
  }
}

const Header: FC<Props> = (props) => {
  const navigate = useNavigate()
  const location: any = useLocation()
  const noAuth = location.pathname !== '/auth'
  const title = useMemo(() => {
    if (props.routeProps?.title) return decodeURIComponent(props.routeProps.title)
    return ''
  }, [props.routeProps.title])
  return (
    <HeaderView direction='column-reverse'>
      <Row justify='center' className="headerTitleView">
        <span>
          {title}
        </span>
        {noAuth && <Row className="backView" justify='flex-start' onClick={() => {
          const backfunc = Communicator.getListenerList(location.pathname + 'back')
          if (backfunc) {
            Communicator.action(location.pathname + 'back', {})
          } else {
            navigate(-1)
          }
        }}>
          <img src={backIcon} alt=""/>
        </Row>}
      </Row>
    </HeaderView>
  )
}
export default Header
