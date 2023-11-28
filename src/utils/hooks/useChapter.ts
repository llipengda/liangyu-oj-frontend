import { useEffect, useState } from 'react'

import ProblemApi from '@/api/Problem'
import { ChapterProblem } from '@/types/Problem'

const useChapter = () => {
  const [chapters, setChapters] = useState<ChapterProblem[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    ProblemApi.getChapters().then(chap => {
      const tasks = chap.map(item => ProblemApi.getBriefList(item.chapter))
      Promise.all(tasks).then(proList => {
        setChapters(
          proList.map((item, index) => ({
            ...chap[index],
            problems: item
          }))
        )
        setLoading(false)
      })
    })
  }, [])
  return [chapters, loading] as const
}

export default useChapter
