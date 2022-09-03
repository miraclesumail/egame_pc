import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { Column } from '@/components/flex'
import { Communicator } from '@/utils/tool'
import { useTranslation } from 'react-i18next';
import { loginOut } from '@/store/slices/auth.slice'
const HomeScrollView = styled(Column)`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  flex:1;
`

interface Props { }

const Home: React.FC = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loc = useLocation()

  const backFun = () => {
    dispatch(loginOut())
    navigate('/auth', {
      replace: true
    })
  }
  useEffect(() => {
    Communicator.createListener(loc.pathname + 'back', backFun)
    return () => {
      Communicator.removeListener(loc.pathname + 'back', backFun)
    }
  }, [])

  return (
    <HomeScrollView>
      {t('home.page1.page2.text')}
    </HomeScrollView>
  )
}
export default Home
