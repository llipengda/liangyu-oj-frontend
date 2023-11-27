import React from 'react'

import { Avatar, Card, Divider, Typography } from 'antd'

import { EditTwoTone } from '@ant-design/icons'

import { PRIMARY_COLOR } from '@/common/constants'
import { useAppSelector } from '@/redux/hooks'
import SubmitionList from '@/components/Main/Problem/SubmissionList'

export default function Me() {
  const user = useAppSelector(state => state.user.user)
  const { Title, Text } = Typography

  return (
    <div className='flex md:flex-row flex-col'>
      <div className='flex flex-col basis-8/12 md:mr-10'>
        <Title level={1} className='!mb-4'>
          {user.nickname}
          <EditTwoTone twoToneColor={PRIMARY_COLOR} className='text-2xl ml-1' />
        </Title>
        {user.name && <Text type='secondary'>{user.name}</Text>}
        <Text type='secondary'>{user.email}</Text>
        <Text type='secondary'>{user.motto || '还没有个性签名~'}</Text>
        <div className='mt-5'>
          <Title level={3}>近期提交</Title>
          <SubmitionList />
        </div>
      </div>
      <div className='flex flex-col align-middle'>
        <Card className='md:mt-20 mt-10'>
          <Avatar size={256} shape='square'>
            {user.avatar ? (
              <img src={user.avatar} alt='avatar' />
            ) : (
              user.nickname
            )}
          </Avatar>
          <div className='mt-3 w-full font-semibold text-2xl'>
            {user.nickname}
          </div>
          <div className='text-gray-400'>注册于{user.createTime}</div>
          <Divider />
          <div className='text-gray-400'>提交 {user.solved} 次</div>
          <div className='text-gray-400'>解决 {user.solved} 个问题</div>
        </Card>
      </div>
    </div>
  )
}
