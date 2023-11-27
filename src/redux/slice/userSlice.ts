import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { LoginResponse } from '@/types/Account'
import { User } from '@/types/User'

const initToken: string = ''

const initUser: User = {
  id: -1,
  password: '',
  email: '未登录',
  nickname: '未登录',
  name: '未登录',
  avatar: '',
  motto: '',
  grade: '',
  type: 1,
  createTime: '未登录',
  deleteTime: '',
  submitted: 0,
  solved: 0
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: initToken,
    needLogin: true,
    user: initUser
  },
  reducers: {
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.token
      state.user.id = action.payload.userId
      state.needLogin = false
    },
    logout: state => {
      state.token = initToken
      state.user = initUser
      state.needLogin = true
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  }
})

export default userSlice.reducer
export const { login, logout, setUser } = userSlice.actions
