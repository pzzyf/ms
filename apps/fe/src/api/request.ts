import type { RequestClientOptions } from '@ms/request'
import { useAppConfig } from '@ms/hooks'
import { RequestClient } from '@ms/request'

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD)

function createRequestClient(baseURL: string, options?: RequestClientOptions) {
  const cilent = new RequestClient({
    ...options,
    baseURL,
  })
  return cilent
}

export const requestClient = createRequestClient(apiURL, {
  responseReturn: 'data',
})
