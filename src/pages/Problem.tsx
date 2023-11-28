import { Link } from 'react-router-dom'

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

import { PRIMARY_COLOR } from '@/common/constants'
import Loading from '@/components/Loading'
import { useAppSelector } from '@/redux/hooks'
import generateDiffculty from '@/utils/generateDiffculty'
import useChapter from '@/utils/hooks/useChapter'

export default function Problem() {
  const [chapters, loading] = useChapter()

  const darkMode = useAppSelector(state => state.theme.darkMode)

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      {chapters.map(chapter => (
        <div key={chapter.chapter}>
          <h1 className='my-4'>{chapter.chapter_name}</h1>
          <div>
            {chapter.problems.map(problem => (
              <Link
                to={`/problem/${problem.id}`}
                style={{ color: PRIMARY_COLOR }}
                key={problem.id}
              >
                <div
                  key={problem.id}
                  className='p-4 rounded-md px-6 my-2 cursor-pointer font-bold flex flex-row items-center justify-between w-12/12'
                  style={{ background: darkMode ? '#222' : '#e5e5e5' }}
                >
                  <div className='text-lg basis-11/12 flex'>
                    <div
                      className='rounded-md p-1 mr-2 my-auto text-white font-bold font-mono px-2 text-sm'
                      style={{
                        background: generateDiffculty(problem.difficulty)[1]
                      }}
                    >
                      {generateDiffculty(problem.difficulty)[0]}
                    </div>
                    {problem.title}
                  </div>
                  <div className='flex basis-1/12 justify-around items-center font-normal'>
                    <div className='justify-center'>
                      <CheckCircleOutlined className='mr-1' />
                      {problem.accepted}
                    </div>
                    <div className='text-red-500 justify-center items-center'>
                      <CloseCircleOutlined className='mr-1' />
                      {problem.submitted - problem.accepted}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
