/**
* @Author aiden
* @Date 2021-02-24 20:50:23
* @Last Modified by: aidenn
* @Last Modified time: 2022-02-26 08:03:133
*/
import { loginSlice } from '@/store/slices/auth.slice';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, HashRouter, NavigateFunction, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import routers from './routers'
interface Props {}
const IRouter = process.env.REACT_APP_I_ENV === 'local' ? HashRouter : BrowserRouter
const RouterChildren: React.FC = (props) => {
  const navigate: NavigateFunction = useNavigate()
  const location: any = useLocation()
  const isLogin: boolean = useSelector(loginSlice)
  // useEffect(() => {
  //   if (!isLogin && location.pathname !== '/auth') {
  //     navigate('/auth', {
  //       replace: true,
  //       state: {
  //         title: location?.state?.title || '',
  //       }
  //     })
  //   }
  // }, [])

  return useRoutes(routers)
}
const Router: React.FC<Props> = (props) => {
  return (
    <IRouter >
      <RouterChildren />
    </IRouter>
  )
}

export default Router