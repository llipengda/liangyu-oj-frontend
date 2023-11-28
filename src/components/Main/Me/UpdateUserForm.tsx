import React from 'react'
import { useDispatch } from 'react-redux'

import { App, Button, Divider, Form, Input, InputNumber } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Title from 'antd/es/typography/Title'

import { useRequest } from 'ahooks'

import UserApi from '@/api/User'
import { useAppSelector } from '@/redux/hooks'
import { setUser } from '@/redux/slice/userSlice'
import sleep from '@/utils/sleep'

type FiledType = {
  nickname: string
  name: string
  grade: string
  motto: string
}

type UpdateUserFormProps = {
  open: boolean
  onClose: () => void
}

export default function UpdateUserForm({ open, onClose }: UpdateUserFormProps) {
  const user = useAppSelector(state => state.user.user)
  const dispatch = useDispatch()
  const { message } = App.useApp()

  const { loading, runAsync: update } = useRequest(UserApi.update, {
    manual: true,
    onSuccess: async user => {
      dispatch(setUser(user))
      message.success('更新成功')
      await sleep(100)
      onClose()
    },
    loadingDelay: 500
  })

  const handleSubmit = async (values: FiledType) => {
    await update({
      ...values,
      avatar: user.avatar
    })
  }

  return (
    <div className='transition-all delay-500 ease-in-out h-fit'>
      {open && (
        <div>
          <Title level={3}>修改个人信息</Title>
          <Form<FiledType>
            layout='horizontal'
            style={{ maxWidth: '50%' }}
            initialValues={user}
            onFinish={handleSubmit}
            className='mt-8 mb-8'
          >
            <Form.Item<FiledType> name='nickname' label='昵称'>
              <Input placeholder='昵称' />
            </Form.Item>
            <Form.Item<FiledType> name='name' label='姓名'>
              <Input placeholder='真实姓名' />
            </Form.Item>
            <Form.Item<FiledType> name='grade' label='年级'>
              <InputNumber placeholder='年级' addonAfter='级' />
            </Form.Item>
            <Form.Item<FiledType> name='motto' label='个性签名'>
              <TextArea
                showCount
                maxLength={100}
                placeholder='个性签名'
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' loading={loading}>
                提交
              </Button>
            </Form.Item>
          </Form>
          <Divider />
        </div>
      )}
    </div>
  )
}
