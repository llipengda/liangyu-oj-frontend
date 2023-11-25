import React from 'react'
import { NavLink } from 'react-router-dom'

import { MenuProps } from 'antd'

const pages: MenuProps['items'] = [
  { label: <NavLink to='/home'>首页</NavLink>, key: 'home' },
  { label: <NavLink to='/problem'>题目</NavLink>, key: 'problem' },
  { label: <NavLink to='/me'>个人</NavLink>, key: 'me' }
]

export default pages
