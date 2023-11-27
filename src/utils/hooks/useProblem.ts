import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ProblemApi from '@/api/Problem'
import type { Problem } from '@/types/Problem'

const useProblem = () => {
  const { id } = useParams()
  const [problem, setProblem] = useState<Problem>()
  const numId = Number(id)
  useEffect(() => {
    ProblemApi.get(numId).then(res => setProblem(res))
  }, [numId])
  if (isNaN(numId)) {
    throw new Error('id is not a number')
  }
  return problem
}

export default useProblem
