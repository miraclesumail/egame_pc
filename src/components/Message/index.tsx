import React, { useRef, useState, useEffect } from 'react'
import { createRoot, Root } from 'react-dom/client'
import css from './index.module.scss'

interface Props {
  type?: 'success' | 'error'
  visible: boolean
  message: string
  onAnimationend?: () => void
}

interface Params extends Omit<Props, 'visible'> {
  duration?: number
}

function Message (props: Props) {
  const { type, visible: visibleProps, message, onAnimationend } = props
  const wrapperEl = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(visibleProps)

  useEffect(toggleDialog, [visibleProps])

  function toggleDialog () {
    const wrapper = wrapperEl.current
    if (visibleProps) {
      setVisible(visibleProps)
    } else {
      wrapper?.classList.add(css.leave)
      wrapper?.addEventListener('animationend', () => {
        setVisible(false)
        onAnimationend && onAnimationend()
      }, { once: true })
    }
  }

  return (
    visible
      ? <div ref={wrapperEl} className={[css['message-notice'], css.enter].join(' ')}>
        <div className={css['message-notice-content']}>
          {type && <img className={css.icon} src={require(`./img/${type}.svg`)} alt=""/>}
          <span>{message}</span>
        </div>
      </div>
      : null
  )
}

let container: HTMLDivElement | null = null

function getContainer () {
  if (!container) {
    const divElement = document.createElement('div')
    divElement.setAttribute('class', css.message)
    document.body.appendChild(divElement)
    container = divElement
  }
  return container
}

function init (messageEl: HTMLDivElement, params: Params): Root {
  const root = createRoot(messageEl)
  const container = getContainer()
  container.appendChild(messageEl)
  root.render(<Message {...params as Props}/>)
  return root
}

function hide (messageEl: HTMLDivElement, params: Params, root: Root) {
  const _params = {
    ...params,
    visible: false,
    onAnimationend () {
      root.unmount()
      messageEl.parentNode?.removeChild(messageEl)
      params.onAnimationend && params.onAnimationend()
    }
  }
  root.render(<Message {..._params}/>)
}

function message (params: Params | string) {
  if (typeof params === 'string') {
    params = {
      message: params
    }
  }
  const _params = {
    visible: true,
    duration: 2000,
    ...params
  }
  const messageEl = document.createElement('div')
  const root = init(messageEl, _params)
  _params.duration && setTimeout(() => hide(messageEl, _params, root), _params.duration)
}

function error (params: Params | string) {
  if (typeof params === 'string') {
    params = {
      message: params
    }
  }
  params = {
    type: 'error',
    ...params
  }
  message(params)
}

function success (params: Params | string) {
  if (typeof params === 'string') {
    params = {
      message: params
    }
  }
  params = {
    type: 'success',
    ...params
  }
  message(params)
}

message.error = error
message.success = success
export { message }
