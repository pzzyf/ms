import type { AxiosInstance } from 'axios'
import type { RequestClientOptions } from './types'

import { merge } from '@ms/utils'
import axios from 'axios'

class RequestClient {
  public readonly axiosInstance: AxiosInstance

  constructor(options: RequestClientOptions = {}) {
    // 合并默认配置和传入的配置
    const defaultConfig: RequestClientOptions = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      responseReturn: 'raw',
      // 默认超时时间
      timeout: 10_000,
    }
    const { ...axiosConfig } = options
    const requestConfig = merge(axiosConfig, defaultConfig)

    this.axiosInstance = axios.create(requestConfig)
  }
}

export { RequestClient }
