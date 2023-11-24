import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    openLogin: false
  },
  reducers: {
    setOpenLogin: (state, action: PayloadAction<boolean>) => {
      state.openLogin = action.payload
    }
  }
})

export default loginSlice.reducer
export const { setOpenLogin } = loginSlice.actions