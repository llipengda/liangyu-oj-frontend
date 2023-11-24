import { Button, Checkbox, Form, Input } from 'antd'

import useLogin from '@/utils/hooks/useLogin'

type ILoginField = {
  email: string
  password: string
  remember: boolean
}

type ILoginFormProps = {
  onSwitch: () => void
}

export default function LoginForm({ onSwitch }: ILoginFormProps) {
  const [loading, login] = useLogin()

  const handleSubmit = async (values: {
    email: string
    password: string
    remember: boolean
  }) => {
    if (values.remember) {
      localStorage.setItem('email', btoa(values.email))
      localStorage.setItem('password', btoa(values.password))
    } else {
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    }
    await login(values.email, values.password)
  }

  return (
    <Form
      name='login'
      labelAlign='right'
      autoComplete='off'
      onFinish={handleSubmit}
      initialValues={{
        email: atob(localStorage.getItem('email') ?? ''),
        password: atob(localStorage.getItem('password') ?? ''),
        remember: true
      }}
    >
      <Form.Item<ILoginField>
        label='邮箱'
        name='email'
        rules={[{ required: true, message: '请输入邮箱' }]}
      >
        <Input placeholder='邮箱' autoComplete='off' />
      </Form.Item>
      <Form.Item<ILoginField>
        label='密码'
        name='password'
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password placeholder='密码' autoComplete='off' />
      </Form.Item>
      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <a className='float-right' onClick={onSwitch}>
          忘记密码
        </a>
      </Form.Item>
      <Form.Item>
        <Button
          className='w-full'
          type='primary'
          htmlType='submit'
          loading={loading}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
