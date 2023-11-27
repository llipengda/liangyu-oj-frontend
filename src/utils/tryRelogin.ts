import { message } from 'antd'

import AccountApi from '@/api/Account'
import UserApi from '@/api/User'
import { setOpenLogin } from '@/redux/slice/loginSlice'
import { login, logout, setUser } from '@/redux/slice/userSlice'
import store from '@/redux/store'

const tryRelogin = async () => {
  const email = atob(localStorage.getItem('email') ?? '')
  const password = atob(localStorage.getItem('password') ?? '')
  const data = await AccountApi.login(email, password)
  if (!data) {
    message.error('登录已过期，请重新登录')
    store.dispatch(logout())
    store.dispatch(setOpenLogin(true))
    return false
  }
  store.dispatch(login(data))
  const userData = await UserApi.info()
  store.dispatch(setUser(userData))
  return true
}

export default tryRelogin
