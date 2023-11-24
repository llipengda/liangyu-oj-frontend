import { useState } from 'react'

import { Form, message } from 'antd'
import { FormInstance } from 'antd/lib'

import { useDebounceEffect, useRequest } from 'ahooks'

import AccountApi from '@/api/Account'

/**
 * 自定义 Hook：用于发送验证码
 * @template T - 表单数据类型
 * @param {FormInstance<T>} form - 表单实例
 * @param {0 | 1} [type=0] - 验证码类型，0：注册，1：重置密码, 默认为 0
 * @returns {[boolean, boolean, () => void]} - 返回一个元组，包含 loading 状态、disabled 状态和发送验证码的函数
 */
const useSendCode = <T>(
  form: FormInstance<T>,
  type: 0 | 1 = 0
): [boolean, boolean, () => void] => {
  const [disabled, setDisabled] = useState(true)
  const email = Form.useWatch('email', form)

  useDebounceEffect(
    () => {
      const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      setDisabled(!reg.test(email))
    },
    [email],
    { wait: 100 }
  )

  const { loading, run } = useRequest(
    async () => AccountApi.sendCode(email, type),
    {
      manual: true,
      debounceWait: 100,
      loadingDelay: 300,
      onSuccess: (data) => {
        if (!data) return
        message.success('验证码发送成功')
      }
    }
  )

  return [loading, disabled, run]
}

export default useSendCode
