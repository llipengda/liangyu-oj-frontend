import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initDarkMode: boolean = false

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: initDarkMode
  },
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
    }
  }
})

export default themeSlice.reducer
export const { toggleDarkMode, setDarkMode } = themeSlice.actions
