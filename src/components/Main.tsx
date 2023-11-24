import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import { Col, Layout, Row } from 'antd'
import { Content } from 'antd/es/layout/layout'

import routes from '../routes'
import Loading from './Loading'
import Login from './Main/Login'

export default function Main() {
  return (
    <Layout>
      <Content
        style={{ padding: '20px 50px', minHeight: 'calc(100vh - 130px)' }}
      >
        <Row justify='center'>
          <Col md={18} xs={24}>
            <Login />
            <Suspense fallback={<Loading />}>{useRoutes(routes)}</Suspense>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
