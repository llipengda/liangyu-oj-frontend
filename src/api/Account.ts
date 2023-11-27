import axios from 'axios'

import { LoginResponse } from '@/types/Account'
import { Result } from '@/types/Result'

const login = async (email: string, password: string) => {
  const data = await axios.post<Result<LoginResponse>>('/account/login', {
    email,
    password
  })
  return data.data.data
}

const signUp = async (email: string, password: string, nickname: string) => {
  const data = await axios.post<Result<void>>('/account/signUp', {
    email,
    password,
    nickname
  })
  return data.data.data
}

const sendCode = async (email: string, type: 0 | 1 = 0) => {
  const data = await axios.post<Result<boolean>>(
    `/account/sendCode?email=${email}&type=${type}`
  )
  return data.data.data
}

const verifyCode = async (email: string, code: string) => {
  const data = await axios.post<Result<boolean>>(
    `/account/verifyCode?email=${email}&code=${code}`
  )
  return data.data.data
}

const deleteAccount = async () => {
  const data = await axios.post<Result<boolean>>('/account/delete')
  return data.data.data
}

const checkName = async (name: string) => {
  const data = await axios.post<Result<boolean>>(
    `/account/checkName?name=${name}`
  )
  return data.data.data
}

const checkEmail = async (email: string) => {
  const data = await axios.post<Result<boolean>>(
    `/account/checkEmail?email=${email}`
  )
  return data.data.data
}

const updatePassword = async (email: string, newPassword: string) => {
  const data = await axios.put<Result<boolean>>(
    `/account/updatePassword?email=${email}&newPassword=${newPassword}`
  )
  return data.data.data
}

const AccountApi = {
  login,
  signUp,
  sendCode,
  verifyCode,
  deleteAccount,
  checkName,
  checkEmail,
  updatePassword
}

export default AccountApi
