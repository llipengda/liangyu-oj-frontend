import { useState } from 'react'

import { Button, Col, Form, Input, Row } from 'antd'
import { RuleRender } from 'antd/lib/form'

import AccountApi from '@/api/Account'
import useChangePassword from '@/utils/hooks/useChangePassword'
import useSendCode from '@/utils/hooks/useSendCode'

type ChangePasswordFieldType = {
  email: string
  code: string
  newPassword: string
}

const checkCode = async (email: string, code: string) => {
  return await AccountApi.verifyCode(email, code)
}

const useRules = () => {
  const [disabled, setDisabled] = useState(false)

  const codeRule: RuleRender = ({ getFieldValue }) => ({
    async validator(_, value) {
      if (!value || (await checkCode(getFieldValue('email'), value))) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('验证码错误'))
    }
  })

  const emailRule: RuleRender = () => ({
    async validator(_, value) {
      if (!value || !(await AccountApi.checkEmail(value))) {
        setDisabled(false)
        return Promise.resolve()
      }
      setDisabled(true)
      return Promise.reject(new Error('用户不存在'))
    }
  })

  return { codeRule, emailRule, disabled } as const
}

export default function ChangePasswordForm() {
  const [form] = Form.useForm<ChangePasswordFieldType>()

  const [sendCodeLoading, sendCodeDiasbled, handleSendCode] = useSendCode(
    form,
    1
  )

  const [loading, change] = useChangePassword()

  const { codeRule, emailRule, disabled } = useRules()

  const handleSubmit = (values: ChangePasswordFieldType) => {
    change(values.email, values.newPassword)
  }

  return (
    <Form
      name='changePassword'
      labelAlign='right'
      autoComplete='off'
      form={form}
      onFinish={handleSubmit}
    >
      <Form.Item<ChangePasswordFieldType>
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
      <Form.Item<ChangePasswordFieldType>
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
              onClick={handleSendCode}
              disabled={sendCodeDiasbled || disabled}
              loading={sendCodeLoading}
            >
              发送验证码
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item<ChangePasswordFieldType>
        label='新密码'
        name='newPassword'
        rules={[
          { required: true, message: '请输入新密码' },
          { min: 6, message: '密码长度至少为6位' }
        ]}
      >
        <Input.Password placeholder='密码' autoComplete='off' />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          style={{ width: '100%' }}
          loading={loading}
        >
          重置密码
        </Button>
      </Form.Item>
    </Form>
  )
}
