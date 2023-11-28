import { useEffect, useState } from 'react'

import { Button, Card, Divider } from 'antd'

import { Editor } from '@monaco-editor/react'

import Loading from '@/components/Loading'
import SubmissionListItem from '@/components/Main/Problem/SubmissionListItem'
import { useAppSelector } from '@/redux/hooks'
import generateDiffculty from '@/utils/generateDiffculty'
import useProblem from '@/utils/hooks/useProblem'
import useTryProblem from '@/utils/hooks/useTryProblem'
import sleep from '@/utils/sleep'

export default function DetailProblem() {
  const [problem, submissions, problemLoading, update] = useProblem()

  const [value, setValue] = useState('')

  useEffect(() => {
    if (problem) {
      setValue(submissions?.[0]?.code || problem.reservedCode)
    }
  }, [problem, submissions])

  const { tryProblem, loading, Status } = useTryProblem()

  const darkMode = useAppSelector(state => state.theme.darkMode)

  if (problemLoading) {
    return <Loading />
  }

  if (!problem) {
    return <div>问题不存在</div>
  }

  const handleReset = () => {
    setValue(problem.reservedCode)
  }

  const handleSubmit = async () => {
    await tryProblem(problem.id, value)
    update()
    await sleep(100)
    document
      .getElementById('status')
      ?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }

  return (
    <div>
      <div className='flex xl:flex-row flex-col' id='status'>
        <div className='basis-2/5 xl:mr-10 xl:min-h-3/4 mb-5 flex-shrink-0'>
          <h1 className='text-3xl font-bold flex'>
            {problem.title}
            <div
              className='rounded-md p-1 ml-2 my-auto text-white font-bold font-mono px-2 text-sm'
              style={{
                background: generateDiffculty(problem.difficulty)[1]
              }}
            >
              {generateDiffculty(problem.difficulty)[0]}
            </div>
          </h1>
          <div className='text-gray-400 mt-2'>
            时间限制：{problem.timeLimit}s&nbsp;&nbsp;&nbsp;内存限制：
            {problem.memoryLimit}MB
          </div>
          <h2 className='mt-5 mb-2'>问题描述</h2>
          <div>{problem.description}</div>
          <h2 className='mt-5'>输入</h2>
          <pre
            className={`relative font-mono ${
              darkMode ? 'bg-gray-800' : 'bg-gray-200'
            } p-4 rounded-md break-all whitespace-pre-wrap`}
          >
            {problem.input}
          </pre>
          <h2 className='mt-5'>输出</h2>
          <pre
            className={`relative font-mono ${
              darkMode ? 'bg-gray-800' : 'bg-gray-200'
            } p-4 rounded-md break-all whitespace-pre-wrap`}
          >
            {problem.output}
          </pre>
          <h2 className='mt-5'>样例输入</h2>
          <pre
            className={`relative font-mono ${
              darkMode ? 'bg-gray-800' : 'bg-gray-200'
            } p-4 rounded-md break-all whitespace-pre-wrap`}
          >
            {problem.sampleInput}
          </pre>
          <h2 className='mt-5'>样例输出</h2>
          <pre
            className={`relative font-mono ${
              darkMode ? 'bg-gray-800' : 'bg-gray-200'
            } p-4 rounded-md break-all whitespace-pre-wrap`}
          >
            {problem.sampleOutput}
          </pre>
          <h2 className='mt-5 mb-2'>提示</h2>
          <div>{problem.hint}</div>
        </div>
        <div className='basis-3/5'>
          <Card className='min-h-3/4' bodyStyle={{ minHeight: '75vh' }}>
            <Editor
              height='75vh'
              width='100%'
              defaultLanguage='java'
              defaultValue={problem.reservedCode}
              loading='加载中...'
              value={value}
              onChange={value => setValue(value || '')}
              theme={darkMode ? 'vs-dark' : 'vs-light'}
            />
            <Status />
            <div className='flex flex-row justify-end mt-5 space-x-2'>
              <Button danger onClick={handleReset}>
                重置
              </Button>
              <Button type='primary' onClick={handleSubmit} loading={loading}>
                提交
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Divider />
      <div>
        <h2 className='mb-4'>最近提交</h2>
        <div>
          {submissions.map(item => (
            <div key={item.id}>
              <SubmissionListItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
