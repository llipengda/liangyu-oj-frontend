import { Result } from "@/types/Result"
import { UpdateUserParams, User } from "@/types/User"
import axios from "axios"

const info = async () => {
  const data = await axios.get<Result<User>>('/user/info')
  return data.data.data
}

const update = async (user: UpdateUserParams) => {
  const data = await axios.put<Result<User>>('/user/update', user)
  return data.data.data
}

const UserApi = {
  info,
  update
}

export default UserApi