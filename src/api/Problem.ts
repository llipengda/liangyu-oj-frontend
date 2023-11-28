import axios from 'axios'

import { Page } from '@/types/Page'
import { BriefProblem, Chapter, Problem, Submission, TryProblemResult } from '@/types/Problem'
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

const getSubmissions = async (id: number, page: number, pageSize: number) => {
  const data = await axios.get<Result<Page<Submission>>>(
    `/pro/getSubmissionList`,
    {
      params: {
        problemId: id,
        page,
        pageSize
      }
    }
  )
  return data.data.data
}

const getChapters = async () => {
  const data = await axios.get<Result<Chapter[]>>('/pro/getChapterList')
  return data.data.data
}

const getBriefList = async (chapter: number) => {
  const data = await axios.get<Result<BriefProblem[]>>('/pro/getBriefList', {
    params: {
      chapter
    }
  })
  return data.data.data
}

const ProblemApi = {
  get,
  submit,
  getSubmissions,
  getBriefList,
  getChapters
}

export default ProblemApi
