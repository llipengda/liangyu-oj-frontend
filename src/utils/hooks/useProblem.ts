import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ProblemApi from '@/api/Problem'
import type { Problem, Submission } from '@/types/Problem'

const useProblem = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [problem, setProblem] = useState<Problem>()
  const [submittions, setSubmittions] = useState<Submission[]>([])
  const numId = Number(id)
  const updateSubmittions = useCallback(
    () =>
      ProblemApi.getSubmissions(numId, 1, 10).then(res => {
        setSubmittions(res.list)
      }),
    [numId]
  )

  useEffect(() => {
    ProblemApi.get(numId).then(res => {
      setProblem(res)
      setLoading(false)
    })
    updateSubmittions()
  }, [numId, updateSubmittions])
  if (isNaN(numId)) {
    throw new Error('id is not a number')
  }
  return [problem, submittions, loading, updateSubmittions] as const
}

export default useProblem
