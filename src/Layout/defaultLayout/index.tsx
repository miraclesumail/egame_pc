import React, { useEffect } from 'react'
// Outlet
import { Outlet } from 'react-router-dom';
// styled-components
import styled from 'styled-components'
import DefaultHeader from '@/components/DefaultHeader'
import { Column } from '@/components/flex';
// layoutH5 styled 根元素
const LayoutH5 = styled(Column)`
  height: 100%;
  width: 100%;
  overflow: hidden;
`
const ContentView = styled(Column)`
  flex:1;
  width: 100%;
  overflow: hidden;
`
interface RoutePropsType {
  [key: string]: any
}
const Layout: React.FC<{}> = (props) => {
  const [routeProps, setRouteProps] = React.useState<RoutePropsType>({})
  useEffect(() => {

    return () => {

    }
  }, [routeProps])
  return (
    <LayoutH5 >
      <DefaultHeader routeProps={routeProps} />
      <ContentView >
        <Outlet context={[routeProps, setRouteProps]} />
      </ContentView>

    </LayoutH5>
  )
}

export default Layout