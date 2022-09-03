import React, { ChangeEvent, useState } from 'react'
import { useSetState } from 'ahooks'
import Dialog from '@/components/Dialog'
import Input from '@/components/input'

interface State {
  areaCode: string;
  phone: string;
  amount: string;
}

const Index = () => {
  const [{ areaCode, phone, amount }, setState] = useSetState<State>({
    areaCode: '',
    phone: '',
    amount: ''
  })

  return (
    <Dialog
      visible={true}
      title={'申请专属服务'}
      buttons={[
        {
          action: () => console.log('dsfsd')
        },
        {
          action: () => null
        }
      ]}
    >
      <Input
        {...{
          placeholder: '区码',
          errorMsg: '输入有效区码',
          id: `${Date.now()}_code`,
          value: areaCode,
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            if (/^[0-9]*$/.test(e.target.value)) {
              setState({ areaCode: e.target.value })
            }
          }
        }}
      />

      <Input
        {...{
          placeholder: '电话号码',
          errorMsg: '输入电话号码',
          value: phone,
          id: `${Date.now()}_phone`,
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            if (/^[0-9]*$/.test(e.target.value)) {
              setState({ phone: e.target.value })
            }
          }
        }}
      />

      <Input
        {...{
          placeholder: '出码额',
          errorMsg: '输入出码额',
          value: amount,
          id: `${Date.now()}_amount`,
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            if (/^[0-9]*$/.test(e.target.value)) {
              setState({ amount: e.target.value })
            }
          }
        }}
      />
    </Dialog>
  )
}

export default Index
