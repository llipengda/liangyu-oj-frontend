import axios from 'axios'

import { Problem, TryProblemResult } from '@/types/Problem'
import { Result } from '@/types/Result'

const get = async (id: number) => {
  const data = await axios.get<Result<Problem>>(`/pro/getDetail`, {
    params: {
      id
    }
  })
  return data.data.data
}

const submit = async (id: number, code: string) => {
  const data = await axios.post<Result<TryProblemResult>>(`/pro/try`, {
    problemId: id,
    code
  })
  return data.data.data
}

const ProblemApi = {
  get,
  submit
}

export default ProblemApi
