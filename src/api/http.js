import axios from 'axios'
import qs from 'qs'

// axios全局配置
axios.defaults.withCredentials = true
axios.defaults.timeout = 15000
axios.defaults.retry = 1
axios.defaults.retryDelay = 1000

/**
 * 获取请求头设置
 * @param config
 * @returns {Promise<any>}
 */
function reqInterceptor (config) {
  return new Promise((resolve) => {
    window.vm.$appInvoked('appGetAjaxHeader', {}, rst => {
      config.headers = Object.assign({}, config.headers, rst)
      if (config.method === 'post' && config.data && config.data.type === 'upload') {
        config.data = config.data.form
      }
      return resolve(config)
    })
  })
}

// 请求拦截
axios.interceptors.request.use(function (config) {
  let isApp = window.vm.$tools.getBrowser() === 'iOS' || window.vm.$tools.getBrowser() === 'android'
  // 基本设置请求头
  if (config.data && config.data.type === 'upload') {
    config.headers['Content-Type'] = 'multipart/form-data'
  } else {
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
  }
  config.headers.token = '3AD17D3EFF1EAD2E24B61753C0D5127F85005DD945F66A3F4614D0BD699FA7DF'
  config.headers.terminalId = '1'
  // 产品id 立即贷写死是10002
  config.headers.pid = '10002'
  config.headers.terminalType = 'ljd_3rd'
  config.headers.os = window.vm.$tools.getBrowser() === 'iOS' ? 'ios' : 'android'
  // version 和 channel 字段需要找产品确认
  config.headers.channel = 'test_channel'
  config.headers.version = '9.2.1'
  if (isApp) { // 移动端
    return reqInterceptor(config).then(rst => {
      return rst
    })
  } else { // pc端
    if (config.method === 'post' && config.data && config.data.type === 'upload') {
      config.data = config.data.form
    } else if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data)
    }
    return config
  }
}, error => {
  return Promise.reject(error)
})
let timestamp1 = Date.parse(new Date())
// 接口异常监控参数
let exceptionData = {
  errorContent: '', // 错误内容
  errorType: '', // 错误类型 string
  requestUrl: '', // 接口url string
  requestUrlFunction: '', // 接口url - 标识 string
  responseTime: '' // 响应时间 string
}

// 返回拦截
axios.interceptors.response.use(function (rst) {
  if (rst.data.code === 'success') {
    return Promise.resolve(rst.data.result)
  } else if (rst.data.code === 'uc_user_007') { // 1008:未登录
    window.vm.$appInvoked('appTokenInvalid', {message: rst.data.error.message})
    return Promise.reject(rst.data.error.message)
  } else if (rst.data.code === '"SYS_ERR_0001"') { // 1001:系统异常!
    let timestamp2 = Date.parse(new Date())
    let url = rst.request.responseURL
    exceptionData.errorContent = rst.data.respMsg && rst.data.respMsg.substring(0, 98)
    exceptionData.errorType = '30'
    exceptionData.requestUrl = url
    exceptionData.requestUrlFunction = url.substring(url.lastIndexOf('/') + 1, url.length).split('?')[0]
    exceptionData.responseTime = timestamp2 - timestamp1
    window.vm.$appInvoked('appUrlExceptionMonitor', exceptionData, '')
    return Promise.reject(rst.data)
  }
  return Promise.reject(rst.data)
}, function (error) {
  let timestamp2 = Date.parse(new Date())
  exceptionData.errorContent = error.message && JSON.stringify(error.message).substring(0, 98)
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    exceptionData.errorType = '10'
  } else {
    exceptionData.errorType = '20'
  }
  let url = error.config.url
  exceptionData.requestUrl = url
  exceptionData.requestUrlFunction = url.substring(url.lastIndexOf('/') + 1, url.length).split('?')[0]
  exceptionData.responseTime = timestamp2 - timestamp1
  window.vm.$appInvoked('appUrlExceptionMonitor', exceptionData, '')
  return Promise.reject(error)
})

/**
 * get请求
 * @param url
 * @param config
 * @returns {Promise<any>}
 */
function getMethod (url, config = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, config).then(rst => {
      return resolve(rst.body || rst)
    }).catch(error => {
      return reject(error)
    })
  })
}

/**
 * post 请求
 * @param url
 * @param data
 * @param config
 * @returns {Promise<any>}
 */
function postMethod (url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config).then(rst => {
      return resolve(rst.body || rst)
    }).catch(error => {
      return reject(error)
    })
  })
}

/**
 * all
 * @param arr
 * @returns {Promise<any>}
 */
function allMethod (arr) {
  return new Promise((resolve, reject) => {
    axios.all(arr).then((...rsts) => {
      return resolve(rsts)
    }).catch(error => {
      return reject(error)
    })
  })
}

export default {
  get: getMethod,
  post: postMethod,
  all: allMethod
}
