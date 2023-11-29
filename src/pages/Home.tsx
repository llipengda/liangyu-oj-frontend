import React from 'react'

import { Divider, Image } from 'antd'

import javaPng from '@/assets/java.jpeg'
import { PRIMARY_COLOR } from '@/common/constants'
import Chapter from '@/components/Main/Home/Chapter'

const chapters = [
  '第一章',
  '第二章',
  '第三章',
  '第四章',
  '第五章',
  '第六章',
  '第七章',
  '第八章',
  '第九章',
  '第十章',
  '第十一章',
  '第十二章'
]

export default function Home() {
  return (
    <div>
      <div
        className='text-9xl font-mono font-bold flex justify-center items-center my-10'
        style={{ color: PRIMARY_COLOR }}
      >
        <Image src={javaPng} className='rounded-lg' />
        <div className='flex flex-col justify-center ml-10'>
          <div>LYOJ</div>
          <div className='text-6xl'>Java核心技术</div>
        </div>
      </div>
      <Divider />
      <h1>精品资源</h1>
      <div>
        {chapters.map((chapter, index) => (
          <div key={index}>
            <Chapter chapter={chapter} index={index + 1} />
          </div>
        ))}
      </div>
    </div>
  )
}
