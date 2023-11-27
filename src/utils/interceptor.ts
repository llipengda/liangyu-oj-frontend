import { message } from 'antd'

import axios, { AxiosError, AxiosResponse } from 'axios'

import { BASE_URL } from '@/common/constants'
import store from '@/redux/store'
import { Result } from '@/types/Result'
import tryRelogin from './tryRelogin'

axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + store.getState().user.token
  config.headers['Content-Type'] = 'application/json'
  config.url = BASE_URL + config.url
  return config
})

axios.interceptors.response.use(
  (response: AxiosResponse<Result<any>>) => {
    const { code } = response.data
    if (code !== 200) {
      console.warn('ERROR ', response.data.code, response)
      message.error(response.data.msg)
    }
    return response
  },
  async (error: AxiosError<Result<any>>) => {
    if (error.response?.status === 401) {
      if (await tryRelogin()) {
        return axios.request(error.request)
      }
      return Promise.reject(error)
    } else if (error.response?.status === 403) {
      console.error('403')
    }
    message.error(error.response?.data?.msg || error.message)
    return Promise.reject(error)
  }
)
