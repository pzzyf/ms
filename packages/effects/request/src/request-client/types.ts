import type {
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios'

interface ExtendOptions<T = any> {
  paramsSerializer?:
    | 'brackets'
    | 'comma'
    | 'indices'
    | 'repeat'
    | AxiosRequestConfig<T>['paramsSerializer']

  /**
   * 响应数据的返回方式。
   * - raw: 原始的AxiosResponse，包括headers、status等，不做是否成功请求的检查。
   * - body: 返回响应数据的BODY部分（只会根据status检查请求是否成功，忽略对code的判断，这种情况下应由调用方检查请求是否成功）。
   * - data: 解构响应的BODY数据，只返回其中的data节点数据（会检查status和code是否为成功状态）。
   */
  responseReturn?: 'body' | 'data' | 'raw'
}

type RequestClientConfig<T = any> = AxiosRequestConfig<T> & ExtendOptions<T>

type RequestResponse<T = any> = AxiosResponse<T> & {
  config: RequestClientConfig<T>
}

type RequestClientOptions = CreateAxiosDefaults & ExtendOptions

interface RequestInterceptorConfig {
  fulfilled?: (
    config: ExtendOptions & InternalAxiosRequestConfig,
  ) =>
    | (ExtendOptions & InternalAxiosRequestConfig<any>)
    | Promise<ExtendOptions & InternalAxiosRequestConfig<any>>
  rejected?: (error: any) => any
}

interface ResponseInterceptorConfig<T = any> {
  fulfilled?: (
    response: RequestResponse<T>,
  ) => Promise<RequestResponse> | RequestResponse
  rejected?: (error: any) => any
}

export type {
  RequestClientConfig,
  RequestClientOptions,
  RequestInterceptorConfig,
  ResponseInterceptorConfig,
}
