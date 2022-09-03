import React from 'react'
import styled from 'styled-components'
import loader from '@/assets/images/loader.svg'

const LoadingView = styled.div`
  background: url(${loader}) no-repeat center;
  background-size: contain;
  width: 100%;
  height: 100%;
  animation: btnLoading 2s linear infinite;
  @keyframes btnLoading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`
function Loading() {
  return (
    <LoadingView />
  )
}

export default Loading