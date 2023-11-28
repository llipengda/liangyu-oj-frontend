import { message } from 'antd'

import axios, { AxiosError, AxiosResponse } from 'axios'

import { BASE_URL } from '@/common/constants'
import store from '@/redux/store'
import { Result } from '@/types/Result'

import tryRelogin from './tryRelogin'

axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + store.getState().user.token
  config.url = BASE_URL + config.url
  return config
})

axios.interceptors.response.use(
  (response: AxiosResponse<Result<any>>) => {
    const { code } = response.data
    if (code !== 200) {
      console.warn(
        'ERROR',
        response.config.method?.toUpperCase(),
        response.config.url,
        response.data.code,
        response
      )
      message.error(response.data.msg)
    }
    return response
  },
  async (error: AxiosError<Result<any>>) => {
    console.warn(
      'ERROR',
      error.config?.method?.toUpperCase(),
      error.config?.url,
      error.response?.status,
      error
    )
    if (error.response?.status === 401) {
      if (await tryRelogin()) {
        return axios.request({
          ...error.config,
          url: error.config?.url?.replace(BASE_URL, ''),
          headers: {
            ...error.config?.headers,
            Authorization: 'Bearer ' + store.getState().user.token
          }
        })
      }
    } else if (error.response?.status === 403) {
      window.location.href = '/error/403'
    } else if (error.response?.status === 404) {
      window.location.href = '/error/404'
    } else if (error.response?.status === 500) {
      window.location.href = '/error/500'
    }
    const msg = error.response?.data?.msg || error.message
    message.error(msg)
    return Promise.resolve({
      data: { code: 500, msg, data: null }
    })
  }
)
