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

const upload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const data = await axios.post<Result<string>>('/user/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data.data.data
}

const UserApi = {
  info,
  update,
  upload,
  getSubmissions
}

export default UserApi
