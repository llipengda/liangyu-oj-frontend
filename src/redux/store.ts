import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistCombineReducers
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import loginSlice from './slice/loginSlice'
import themeSlice from './slice/themeSlice'
import userSlice from './slice/userSlice'

const persistedReducers = persistCombineReducers(
  {
    key: 'root',
    storage
  },
  {
    user: userSlice,
    theme: themeSlice,
    login: loginSlice
  }
)

const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
