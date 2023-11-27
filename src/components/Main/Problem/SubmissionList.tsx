import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { List, Typography } from 'antd'

import UserApi from '@/api/User'
import { PRIMARY_COLOR } from '@/common/constants'
import { Submition } from '@/types/Problem'

export default function SubmitionList() {
  const [data, setData] = useState<Submition[]>([])

  useEffect(() => {
    UserApi.getSubmissions().then(res => {
      setData(res.slice(0, 10))
    })
  })

  return (
    <List
      itemLayout='horizontal'
      dataSource={data}
      loading={false}
      locale={{
        emptyText: (
          <Typography.Text type='secondary'>还没有提交记录~</Typography.Text>
        )
      }}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            description={
              <span>
                <span
                  className='p-1 rounded-md w-fit px-2 text-white font-bold'
                  style={{ background: item.result === 'AC' ? 'green' : 'red' }}
                >
                  {item.result}
                </span>{' '}
                - <span className='mr-2'>{item.submitTime}</span>
                <Link
                  style={{ color: PRIMARY_COLOR }}
                  to={`/problem/${item.problemId}`}
                >
                  题目#{item.problemId}
                </Link>{' '}
                {item.time}ms
              </span>
            }
          />
        </List.Item>
      )}
    />
  )
}
