import { useEffect, useState } from 'react'

import { Typography } from 'antd'

import UserApi from '@/api/User'
import Loading from '@/components/Loading'
import { Submission } from '@/types/Problem'

import SubmissionListItem from './SubmissionListItem'

export default function SubmitionList() {
  const [data, setData] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    UserApi.getSubmissions().then(res => {
      setData(res.slice(0, 10))
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Loading />
  }

  if (data.length === 0) {
    return <Typography.Text type='secondary'>还没有提交记录~</Typography.Text>
  }

  return (
    <>
      {data.map(item => (
        <div key={item.id}>
          <SubmissionListItem item={item} />
        </div>
      ))}
    </>
  )
}
