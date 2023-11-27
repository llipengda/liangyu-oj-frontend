import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  App,
  Avatar,
  Button,
  Col,
  Menu,
  Popconfirm,
  Row,
  Space,
  Tooltip,
  Typography
} from 'antd'
import { Header as AntdHeader } from 'antd/es/layout/layout'

import { GithubOutlined } from '@ant-design/icons'

import { GITHUB_URL } from '@/common/constants'
import pages from '@/common/menuPages/pages'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setOpenLogin } from '@/redux/slice/loginSlice'
import { toggleDarkMode } from '@/redux/slice/themeSlice'
import { logout } from '@/redux/slice/userSlice'

const { Title } = Typography

export default function Header() {
  const isDark = useAppSelector(state => state.theme.darkMode)
  const needLogin = useAppSelector(state => state.user.needLogin)

  const dispatch = useAppDispatch()

  const location = useLocation()

  const [themeIcon, setThemeIcon] = useState(isDark ? '☀️' : '🌒')

  const { message } = App.useApp()

  const handleChangeTheme = () => {
    dispatch(toggleDarkMode())
    setThemeIcon(isDark ? '🌒' : '☀️')
  }

  const onClickLogin = () => {
    dispatch(setOpenLogin(true))
  }

  const onClickLogout = () => {
    message.success('登出成功')
    dispatch(logout())
  }

  return (
    <AntdHeader className='sticky top-0 z-10 w-full flex items-center justify-center py-2'>
      <Row className='w-full' gutter={16} align='middle' justify='center'>
        <Col md={1} sm={4} xs={4}>
          <Link to='/'>
            <Avatar
              size={{ xs: 40, sm: 40, md: 40, lg: 48, xl: 48, xxl: 48 }}
              shape='square'
              src='/favicon.ico'
            />
          </Link>
        </Col>
        <Col md={7} sm={8} xs={12}>
          <Link to='/'>
            <Title
              className='p-0 m-4 text-center md:text-left'
              level={4}
              style={{
                color: '#7cb305'
              }}
            >
              LYOJ
            </Title>
          </Link>
        </Col>
        <Col md={6} xs={0}>
          <Menu
            className='bg-inherit'
            mode='horizontal'
            items={pages}
            selectedKeys={[location.pathname.split('/')[1]]}
          />
        </Col>
        <Col md={2} xs={0}>
          <Space>
            <Tooltip
              placement='bottom'
              title={`切换至${isDark ? '浅色' : '深色'}主题`}
            >
              <Button
                className='px-2 py-1'
                type='dashed'
                onClick={handleChangeTheme}
              >
                {themeIcon}
              </Button>
            </Tooltip>
            <Tooltip placement='bottom' title='GitHub仓库'>
              <Button className='px-2 py-1' type='dashed' href={GITHUB_URL}>
                <GithubOutlined />
              </Button>
            </Tooltip>
          </Space>
        </Col>
        <Col xs={5} md={2}>
          {needLogin ? (
            <Button type='primary' onClick={onClickLogin}>
              登录
            </Button>
          ) : (
            <Popconfirm
              title='您确定要登出吗？'
              description='这将会清除您的登录状态。'
              okText='确定'
              cancelText='取消'
              onConfirm={onClickLogout}
              placement='bottomRight'
            >
              <Button type='primary'>登出</Button>
            </Popconfirm>
          )}
        </Col>
      </Row>
    </AntdHeader>
  )
}
