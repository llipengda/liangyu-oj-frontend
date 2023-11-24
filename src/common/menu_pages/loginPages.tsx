import { MenuProps } from 'antd'

const loginPages: MenuProps['items'] = [
  { label: '登录', key: 'login' },
  { label: '注册', key: 'register' },
  { label: '修改密码', key: 'changePassword' }
]

export default loginPages
