import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { message } from 'antd'

import AccountApi from '@/api/Account'
import UserApi from '@/api/User'
import { useAppDispatch } from '@/redux/hooks'
import { setOpenLogin } from '@/redux/slice/loginSlice'
import { login, setUser } from '@/redux/slice/userSlice'

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loginFunc = async (email: string, password: string) => {
    setLoading(true)
    const data = await AccountApi.login(email, password)
    setLoading(false)
    if (!data) return
    dispatch(login(data))
    const userData = await UserApi.info()
    if (!userData) return
    dispatch(setOpenLogin(false))
    dispatch(setUser(userData))
    message.success('登录成功')
    navigate('/home')
  }
  return [loading, loginFunc] as const
}

export default useLogin
