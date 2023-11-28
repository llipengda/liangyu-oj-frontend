import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import store from '@/redux/store.ts'
import '@/utils/configMessage.ts'
import '@/utils/interceptor.ts'
import '@/utils/monacoConfig.ts'

import App from './App.tsx'

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
