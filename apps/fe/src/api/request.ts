import type { RequestClientOptions } from '@ms/request'
import { useAppConfig } from '@ms/hooks'
import { defaultResponseInterceptor, RequestClient } from '@ms/request'
import { useAccessStore } from '@ms/stores'

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD)

function createRequestClient(baseURL: string, options?: RequestClientOptions) {
  const client = new RequestClient({
    ...options,
    baseURL,
  })

  // 携带登录后保存的 accessToken
  client.addRequestInterceptor({
    fulfilled: (config) => {
      const accessToken = useAccessStore().accessToken
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
  })

  // 处理返回的响应数据格式
  client.addResponseInterceptor(
    defaultResponseInterceptor({
      codeField: 'code',
      dataField: 'data',
      successCode: 0,
    }),
  )

  return client
}

export const requestClient = createRequestClient(apiURL, {
  responseReturn: 'data',
})
