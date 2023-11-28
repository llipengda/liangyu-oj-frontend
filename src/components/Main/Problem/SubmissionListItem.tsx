import React from 'react'
import { Link } from 'react-router-dom'

import { PRIMARY_COLOR } from '@/common/constants'
import { useAppSelector } from '@/redux/hooks'
import { Submission } from '@/types/Problem'

export default function SubmissionListItem({ item }: { item: Submission }) {
  const darkMode = useAppSelector(state => state.theme.darkMode)

  return (
    <div
      className='font-mono flex flex-row items-center p-3 rounded-md mb-2 px-4'
      style={{ background: darkMode ? '#333' : '#e5e5e5' }}
    >
      <div
        className='rounded-md w-fit px-2 text-white font-bold font-mono mr-6'
        style={{ background: item.result === 'AC' ? 'green' : 'red' }}
      >
        {item.result}
      </div>
      <span className='mr-2'>{item.submitTime}</span>
      <Link
        style={{ color: PRIMARY_COLOR, minWidth: '12%' }}
        to={`/problem/${item.problemId}`}
        className='ml-14 font-bold'
      >
        {item.problemName || `问题#${item.problemId}`}
      </Link>{' '}
      <span className='ml-16 hidden md:block' style={{ minWidth: '12%' }}>
        用时：{item.time * 1000}ms
      </span>
      <span className='ml-10 hidden md:block'>内存：{item.memory}M</span>
    </div>
  )
}
