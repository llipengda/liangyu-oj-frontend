import { useEffect } from 'react'

import { ThemeConfig, theme } from 'antd'
import { useThemeMode } from 'antd-style'

import {
  DARK_THEME_BODY_COLOR,
  DARK_THEME_FOOTER_COLOR,
  DARK_THEME_HEADER_COLOR,
  LIGHT_THEME_BODY_COLOR,
  LIGHT_THEME_FOOTER_COLOR,
  LIGHT_THEME_HEADER_COLOR,
  PRIMARY_COLOR
} from '@/common/constants'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setDarkMode } from '@/redux/slice/themeSlice'

const useTheme = (): ThemeConfig => {
  const isDark = useAppSelector(state => state.theme.darkMode)
  const dispatch = useAppDispatch()

  const { browserPrefers } = useThemeMode()

  useEffect(() => {
    dispatch(setDarkMode(browserPrefers === 'dark'))
  }, [browserPrefers, dispatch])

  return {
    token: {
      colorPrimary: PRIMARY_COLOR
    },
    components: {
      Layout: {
        headerBg: isDark ? DARK_THEME_HEADER_COLOR : LIGHT_THEME_HEADER_COLOR,
        footerBg: isDark ? DARK_THEME_FOOTER_COLOR : LIGHT_THEME_FOOTER_COLOR,
        bodyBg: isDark ? DARK_THEME_BODY_COLOR : LIGHT_THEME_BODY_COLOR
      }
    },
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
  }
}

export default useTheme
