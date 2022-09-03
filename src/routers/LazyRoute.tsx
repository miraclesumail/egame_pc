import React, { Suspense, useEffect, useMemo } from 'react'
import { useLocation, useOutletContext } from 'react-router-dom';

interface LzyRouteProps {
  children: React.ReactNode,
  title?: string,
  options?: Ioptions,
}

interface Ioptions {
  [key: string]: any
}

const LazyRoute: React.FC<LzyRouteProps> = (props) => {
  const [, setRouteProps] = useOutletContext() as Array<any>
  const { state = {} } = useLocation() as {
    state: {} | null
  }
  const [loding, setLoding] = React.useState(true)
  const title = useMemo(() => {
    if (!props.title) return ''
    return encodeURIComponent(props.title)
  }, [props.title])

  const options: Ioptions = useMemo(() => {
    if (!props.options) return {
      ...state
    }
    return Object.assign({}, state, props.options)
  }, [props.options])

  useEffect(() => {
    if (options) {
      setRouteProps({
        ...options,
        title,
      })
    }
    // 页面title修改
    document.title = decodeURIComponent(title)
    setLoding(false)
  }, [options, title])
  
  const getDecoratedChildren = () => {
    return React.Children.map(props.children, (child: any) => {
      return React.cloneElement(child, { ...options, setRouteProps });
    })
  }

  return (
    <Suspense fallback={<div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      fontSize: '20rem'
    }}>Loading...</div>}>
      {!loding && getDecoratedChildren()}
    </Suspense>
  )
}
export default LazyRoute
