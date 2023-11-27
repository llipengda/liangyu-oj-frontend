export type User = {
  id: number
  password: string
  email: string
  nickname: string
  name: string
  avatar: string
  motto: string
  grade: string
  type: 0 | 1
  createTime: string
  deleteTime: string
  submitted: number
  solved: number
}

export type UpdateUserParams = {
  nickname: string
  name: string
  avatar: string
  motto: string
  grade: string
}
