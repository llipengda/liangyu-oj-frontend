import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button, Result } from 'antd'
import { useEffect } from 'react'

export default function Error() {
  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    if (id === '404' || id === '403' || id === '500') {
      return
    }
    navigate('/error/404')
  }, [id, navigate])

  const numId = Number(id)

  const Extra = () => (
    <div className='flex justify-center'>
      <Link to='/home'>
        <Button type='primary'>返回首页</Button>
      </Link>
    </div>
  )

  switch (numId) {
    case 404:
      return (
        <Result
          status='404'
          title='404 NOT FOUND'
          subTitle='您访问的页面不存在。'
          extra={<Extra />}
        />
      )
    case 403:
      return (
        <Result
          status='403'
          title='403 FORBIDDEN'
          subTitle='您没有权限访问该页面。'
          extra={<Extra />}
        />
      )
    case 500:
      return (
        <Result
          status='500'
          title='500 INTERNAL SERVER ERROR'
          subTitle='服务器出现了一些问题。'
          extra={<Extra />}
        />
      )
  }
}
