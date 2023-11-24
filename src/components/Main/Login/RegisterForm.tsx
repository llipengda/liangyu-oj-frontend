import { useState } from 'react'

import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import { RuleRender } from 'antd/es/form'

import AccountApi from '@/api/Account'
import useRegister from '@/utils/hooks/useRegister'
import useSendCode from '@/utils/hooks/useSendCode'

type IRegisterField = {
  nickname: string
  password: string
  confirmPassword: string
  email: string
  code: string
  remember: boolean
}

const checkCode = async (email: string, code: string) => {
  return await AccountApi.verifyCode(email, code)
}

const useRules = () => {
  const [disabled, setDisabled] = useState(false)

  const nickNameRule: RuleRender = () => ({
    async validator(_, value) {
      if (!value || (await AccountApi.checkName(value))) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('用户名已存在'))
    }
  })

  const codeRule: RuleRender = ({ getFieldValue }) => ({
    async validator(_, value) {
      if (!value || (await checkCode(getFieldValue('email'), value))) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('验证码错误'))
    }
  })

  const passwordRule: RuleRender = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('两次输入的密码不一致'))
    }
  })

  const emailRule: RuleRender = () => ({
    async validator(_, value) {
      if (!value || (await AccountApi.checkEmail(value))) {
        setDisabled(false)
        return Promise.resolve()
      }
      setDisabled(true)
      return Promise.reject(new Error('邮箱已被使用'))
    }
  })

  return {
    nickNameRule,
    codeRule,
    passwordRule,
    emailRule,
    disableSend: disabled
  } as const
}

export default function RegisterForm() {
  const [loading, register] = useRegister()

  const [form] = Form.useForm<IRegisterField>()

  const [sendCodeLoading, sendCodeDiasbled, sendCode] = useSendCode(form, 0)

  const { nickNameRule, codeRule, passwordRule, emailRule, disableSend } =
    useRules()

  const handleSubmit = async (values: {
    nickname: string
    password: string
    email: string
    remember: boolean
  }) => {
    if (values.remember) {
      localStorage.setItem('nickname', btoa(values.nickname))
      localStorage.setItem('password', btoa(values.password))
    } else {
      localStorage.removeItem('nickname')
      localStorage.removeItem('password')
    }
    await register(values.email, values.password, values.nickname)
  }

  return (
    <Form
      name='login'
      labelAlign='right'
      autoComplete='off'
      onFinish={handleSubmit}
      form={form}
      initialValues={{
        remember: true
      }}
    >
      <Form.Item<IRegisterField>
        label='用户名'
        name='nickname'
        rules={[
          { required: true, message: '请输入用户名' },
          { min: 3, message: '用户名长度至少为3位' },
          nickNameRule
        ]}
      >
        <Input placeholder='用户名' autoComplete='off' />
      </Form.Item>
      <Form.Item<IRegisterField>
        label='邮箱'
        name='email'
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '邮箱地址非法' },
          emailRule
        ]}
      >
        <Input placeholder='邮箱' autoComplete='off' />
      </Form.Item>
      <Form.Item<IRegisterField>
        label='验证码'
        name='code'
        dependencies={['email']}
        rules={[{ required: true, message: '请输入验证码' }, codeRule]}
      >
        <Row gutter={8}>
          <Col span={16}>
            <Input placeholder='验证码' autoComplete='off' />
          </Col>
          <Col span={8}>
            <Button
              type='primary'
              onClick={sendCode}
              disabled={sendCodeDiasbled || disableSend}
              loading={sendCodeLoading}
            >
              发送验证码
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item<IRegisterField>
        label='密码'
        name='password'
        rules={[
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码长度至少为6位' }
        ]}
      >
        <Input.Password placeholder='密码' autoComplete='off' />
      </Form.Item>
      <Form.Item<IRegisterField>
        label='确认密码'
        name='confirmPassword'
        dependencies={['password']}
        rules={[{ required: true, message: '请确认密码' }, passwordRule]}
      >
        <Input.Password placeholder='确认密码' autoComplete='off' />
      </Form.Item>
      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button
          className='w-full'
          type='primary'
          htmlType='submit'
          loading={loading}
        >
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}
