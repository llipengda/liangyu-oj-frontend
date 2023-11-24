import { useState } from 'react'

import { message } from 'antd'

import AccountApi from '@/api/Account'
import { useAppDispatch } from '@/redux/hooks'
import { setOpenLogin } from '@/redux/slice/loginSlice'
import { login } from '@/redux/slice/userSlice'

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const loginFunc = async (email: string, password: string) => {
    setLoading(true)
    const data = await AccountApi.login(email, password)
    setLoading(false)
    if (!data) return
    dispatch(login(data))
    dispatch(setOpenLogin(false))
    message.success('登录成功')
  }
  return [loading, loginFunc] as const
}

export default useLogin
