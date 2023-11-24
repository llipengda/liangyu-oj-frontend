import { useState } from 'react'

import { message } from 'antd'

import AccountApi from '@/api/Account'

import useLogin from './useLogin'

const useRegister = () => {
  const [, login] = useLogin()
  const [loading, setLoading] = useState(false)
  const registerFunc = async (
    email: string,
    password: string,
    nickname: string
  ) => {
    setLoading(true)
    await AccountApi.signUp(email, password, nickname)
    await login(email, password)
    setLoading(false)
    message.success('注册成功')
  }

  return [loading, registerFunc] as const
}

export default useRegister
