import {useEffect, useState} from "react";

export const useDlgHooks = (
  props: {visible?: boolean, onClose?: () => void}
) => {
  const [isShow, setIsShow] = useState(false)
  useEffect(() => {
    setIsShow(props.visible ?? true)
  }, [])
  const close = () => {
    if (isShow === false) {
      setIsShow(false)
      props.onClose && props.onClose()
    }
  }

  return {
    isShow,
    setIsShow,
    close
  }
}

