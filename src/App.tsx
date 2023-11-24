import { App as AntdApp, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import Footer from '@/components/Footer.tsx'
import Header from '@/components/Header.tsx'
import Main from '@/components/Main.tsx'
import useTheme from '@/utils/hooks/useTheme'

import './App.css'

export default function App() {
  const theme = useTheme()

  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <AntdApp>
        <Header />
        <Main />
        <Footer />
      </AntdApp>
    </ConfigProvider>
  )
}
