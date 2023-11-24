import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Menu, Modal } from 'antd'

import loginPages from '@/common/menu_pages/loginPages'
import { useAppSelector } from '@/redux/hooks'
import { setOpenLogin } from '@/redux/slice/loginSlice'

import ChangePasswordForm from './Login/ChangePasswordForm'
import LoginForm from './Login/LoginForm'
import RegisterForm from './Login/RegisterForm'

export default function Login() {
  const openLogin = useAppSelector(state => state.login.openLogin)

  const dispatch = useDispatch()

  const [selected, setSelected] = useState('login')

  const handleCancel = () => {
    dispatch(setOpenLogin(false))
  }

  const handleSelect = ({ selectedKeys }: { selectedKeys: string[] }) => {
    setSelected(selectedKeys[0])
  }

  const switchToChangePassword = () => {
    setSelected('changePassword')
  }

  return (
    <Modal
      title='登录以使用更多功能'
      open={openLogin}
      onCancel={handleCancel}
      centered
      footer={null}
    >
      <Menu
        mode='horizontal'
        items={loginPages}
        onSelect={handleSelect}
        selectedKeys={[selected]}
        className='w-52 mt-3 mb-7 mx-auto'
      />
      <div className='h-fit w-4/5 mx-auto mb-5'>
        {selected === 'register' ? (
          <RegisterForm />
        ) : selected === 'changePassword' ? (
          <ChangePasswordForm />
        ) : (
          <LoginForm onSwitch={switchToChangePassword} />
        )}
      </div>
    </Modal>
  )
}
