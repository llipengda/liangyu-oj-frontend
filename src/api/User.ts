import axios from 'axios'

import { Submission } from '@/types/Problem'
import { Result } from '@/types/Result'
import { UpdateUserParams, User } from '@/types/User'

const info = async () => {
  const data = await axios.get<Result<User>>('/user/info')
  return data.data.data
}

const update = async (user: UpdateUserParams) => {
  const data = await axios.put<Result<User>>('/user/update', user)
  return data.data.data
}

const getSubmissions = async () => {
  const data = await axios.get<Result<Submission[]>>(
    '/user/getRecentSubmission'
  )
  return data.data.data
}

const UserApi = {
  info,
  update,
  getSubmissions
}

export default UserApi
