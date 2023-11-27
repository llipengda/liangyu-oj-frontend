import { useState } from 'react'

import { message } from 'antd'

import { useRequest } from 'ahooks'

import ProblemApi from '@/api/Problem'
import { useAppSelector } from '@/redux/hooks'
import { TryProblemResult } from '@/types/Problem'

const useTryProblem = () => {
  const [tried, setTried] = useState(false)
  const [color, setColor] = useState('')
  const [msg, setMsg] = useState('')
  const [res, setRes] = useState<TryProblemResult>({} as TryProblemResult)
  const { loading, runAsync: submit } = useRequest(ProblemApi.submit, {
    manual: true
  })
  const darkMode = useAppSelector(state => state.theme.darkMode)

  const tryProblem = async (id: number, code: string) => {
    setMsg('评测中')
    setColor('orange')
    setTried(true)
    const data = await submit(id, code)
    setRes(data)
    switch (data.status) {
      case 'AC':
        setColor('green')
        message.success('评测通过')
        setMsg('评测通过')
        break
      case 'WA':
        setColor('red')
        message.error('答案错误')
        setMsg('答案错误')
        break
      case 'TLE':
        setColor('red')
        message.error('运行超时')
        setMsg('运行超时')
        break
      case 'MLE':
        setColor('red')
        message.error('内存超限')
        setMsg('内存超限')
        break
      case 'RE':
        setColor('red')
        message.error('运行错误')
        setMsg('运行错误')
        break
      case 'CE':
        setColor('red')
        message.error('编译错误')
        setMsg('编译错误')
        break
    }
  }

  const Status = () => {
    if (!tried) return <></>
    return (
      <div>
        <div className='mt-4 mb-4'>
          <span
            className='p-1 rounded-md w-fit px-2 text-white font-bold'
            style={{ background: color }}
          >
            {loading ? 'RUNNING' : res.status}
          </span>
          <span className='ml-2 font-bold' style={{ color }}>
            {msg}
          </span>
        </div>
        {!!res.time && <div>耗时：{res.time * 1000}ms</div>}
        {!!res.message && (
          <pre
            className={`relative font-mono ${
              darkMode ? 'bg-gray-800' : 'bg-gray-200'
            } p-4 rounded-md break-all whitespace-pre-wrap`}
          >
            {res.message}
          </pre>
        )}
      </div>
    )
  }

  return { tryProblem, Status, loading } as const
}

export default useTryProblem
