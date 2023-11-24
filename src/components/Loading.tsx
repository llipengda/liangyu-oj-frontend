import React from 'react'

import { Skeleton } from 'antd'

export default function Loading() {
  return (
    <div>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </div>
  )
}
