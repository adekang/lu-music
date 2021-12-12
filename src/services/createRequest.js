import querystring from 'querystring'

import axios from 'axios'

const API_TIME_OUT = 20000

function isRspSuccess({ status, code }, config) {
  return status === 200 || code === 200 || (config || {}).byPassStatusCheck
}

let axiosRequest

function handleRequest(instance, createConfig) {
  if (Array.isArray(createConfig.interceptors?.request)) {
    createConfig.interceptors?.request.forEach(resInterceptor => {
      instance.interceptors.request.use(...resInterceptor)
    })
  }
  instance.interceptors.request.use(options => {
    const setHeaders =
      typeof createConfig?.setHeaders === 'function' ? createConfig?.setHeaders : () => ({})
    const headers = setHeaders()

    return {
      ...(options || {}),
      headers: {
        ...(options?.headers || {}),
        ...(typeof headers === 'object' ? headers : {})
      }
    }
  })
}

function handleError(instance, createConfig) {
  const processError = response => {
    const { data, config, status } = response || {}
    const responseStatusMap = createConfig.responseStatusMap || {}
    const errorText = responseStatusMap[data?.status] || data?.msg || '系统错误'

    const errorResult =
      typeof createConfig.httpStatusErrorHandler === 'function' &&
      createConfig.httpStatusErrorHandler(status, response)

    return (
      errorResult ||
      Promise.reject(
        config?.needDetail
          ? {
              ...(data && typeof data === 'object' ? data : { data }),
              errorText
            }
          : errorText
      )
    )
  }

  if (Array.isArray(createConfig.interceptors?.response)) {
    createConfig.interceptors?.response.forEach(resInterceptor => {
      instance.interceptors.response.use(...resInterceptor)
    })
  }

  // http response 拦截器
  instance.interceptors.response.use(
    response => {
      // http status 200
      const { data, config } = response || {}
      // const { needDetail, needHttpResponse } = config || {}
      const responseData = data || {}

      if (isRspSuccess(responseData, config)) {
        return responseData
      }

      return processError(response)
    },
    error => processError(error.response)
  )
}

function createInstance(createConfig) {
  axiosRequest =
    // axiosRequest ||
    axios.create({
      timeout: API_TIME_OUT,
      ...(createConfig || {})
    })
  handleRequest(axiosRequest, createConfig)
  handleError(axiosRequest, createConfig)
  return axiosRequest
}

const createRequest = createConfig => {
  const instance = createInstance(createConfig)
  const res = ({ url, method = 'get', data, ...config }) => {
    if (method.toLowerCase() === 'get') {
      const query = querystring.stringify(data)
      return instance.get(`${url}${query ? `?${query}` : ''}`, config)
    }
    return instance[method.toLowerCase()](url, data, config)
  }

  res.instance = instance
  return res
}

export default createRequest
