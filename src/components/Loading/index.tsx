import React, { useRef, useState, useEffect } from 'react'
import { createRoot, Root } from 'react-dom/client'
import classNames from 'classnames/bind'
import scss from './index.module.scss'

const cn = classNames.bind(scss)

interface Props {
  visible: boolean,
  onAnimationend?: () => void
}

function Loading (props: Props) {
  const { visible: visibleProps, onAnimationend } = props
  const wrapperEl = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(visibleProps)

  useEffect(toggleVisible, [visibleProps])

  function toggleVisible () {
    const wrapper = wrapperEl.current
    if (visibleProps) {
      setVisible(visibleProps)
    } else {
      wrapper && (wrapper.onanimationend = animationend)
    }
  }

  function animationend () {
    setVisible(false)
    onAnimationend && onAnimationend()
  }

  return (
    visible
      ? <div ref={wrapperEl}
        className={cn(scss.mask, 'animate__animated', visibleProps ? 'animate__fadeIn' : 'animate__fadeOut')}>
        <div className={scss.loading}></div>
      </div>
      : null
  )
}

class LoadingClass {
  private readonly root: Root

  constructor () {
    this.root = LoadingClass.getRoot()
  }

  private static getRoot () {
    const container = document.createElement('div')
    document.body.appendChild(container)
    return createRoot(container)
  }

  show () {
    const params = { visible: true }
    this.root.render(<Loading {...params}/>)
  }

  hide (onAnimationend?: () => void) {
    const params = {
      visible: false,
      onAnimationend
    }
    this.root.render(<Loading {...params}/>)
  }
}

export { LoadingClass }
export default Loading
