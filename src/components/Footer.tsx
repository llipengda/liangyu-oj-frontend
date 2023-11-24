import React from 'react'
import { Link } from 'react-router-dom'

import { Footer as AntdFooter } from 'antd/es/layout/layout'

import { AUTHORS } from '@/common/constants'

export default function Footer() {
  return (
    <AntdFooter style={{ textAlign: 'center' }}>
      LYOJ &copy; {new Date().getFullYear()}{' '}
      {AUTHORS.map((author, index) => (
        <>
          &nbsp;
          <Link key={index} to={author.link}>
            {author.name}
          </Link>
          &nbsp;
        </>
      ))}
    </AntdFooter>
  )
}
