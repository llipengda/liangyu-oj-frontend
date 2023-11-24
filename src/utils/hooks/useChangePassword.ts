import { message } from 'antd'

import { useRequest } from 'ahooks'

import AccountApi from '@/api/Account'

const useChangePassword = () => {
  const { loading, runAsync } = useRequest(AccountApi.updatePassword, {
    manual: true,
    debounceWait: 100,
    loadingDelay: 300,
    onSuccess: data => {
      if (!data) return
      message.success('密码修改成功')
    }
  })
  return [loading, runAsync] as const
}

export default useChangePassword
