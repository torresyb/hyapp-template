import axios from 'axios'
import qs from 'qs'

// axios全局配置
axios.defaults.withCredentials = true
axios.defaults.timeout = 15000
axios.defaults.retry = 1
axios.defaults.retryDelay = 1000

/**
 * 获取请求头和加密
 * @param config
 * @returns {Promise<any>}
 */
function reqInterceptor (config) {
  return new Promise(resolve => {
    window.appInvoked('appGetAjaxHeader', '', rst => {
      config.headers = Object.assign(config.headers, rst)
      if (config.method === 'post') {
        if (config.data && config.data.type === 'upload') {
          config.data = config.data.form
          return resolve(config)
        } else {
          if (!config.data || JSON.stringify(config.data) === '{}') {
            return resolve(config)
          }
          // 添加token判断登录状态
          window.appInvoked('appEncryptData', { data: qs.stringify(config.data) }, rst => {
            config.data = qs.stringify(config.data)
            return resolve(config)
          })
        }
      } else {
        return resolve(config)
      }
    })
  })
}

/**
 * 返回结果解密
 * @param rst
 * @returns {Promise<any>}
 */
function rspInterceptor (rst) {
  return new Promise((resolve, reject) => {
    if (rst.data.code === 200) {
      window.appInvoked('appDecryptData', { data: JSON.stringify(rst.data.data) }, (res) => {
        rst.data.data = JSON.parse(res)
        return resolve(rst.data)
      })
    } else {
      if (rst.data.code === 401) {
        window.appInvoked('appTokenInvalid', {code: rst.data.code, message: rst.data.message})
      }
      return reject(rst.data)
    }
  })
}

// 请求拦截
axios.interceptors.request.use(function (config) {
  // 基本设置请求头
  if (config.data && config.data.type === 'upload') {
    config.headers['Content-Type'] = 'multipart/form-data'
  } else {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  // 判断是否是移动端
  if (window.isIos || window.isAndroid) {
    return reqInterceptor(config).then(rst => {
      return rst
    })
  } else {
    if (config.method === 'post') {
      if (config.data && config.data.type === 'upload') {
        config.data = config.data.form
      } else {
        // 添加token判断登录状态
        config.data = qs.stringify(config.data)
      }
    };
    return config
  }
}, error => {
  return Promise.reject(error)
})

// 返回拦截
axios.interceptors.response.use(function (rst) {
  if (window.isIos || window.isAndroid) {
    return rspInterceptor(rst).then(rst => {
      return Promise.resolve(rst)
    }).catch(err => {
      return Promise.reject(err)
    })
  } else {
    if (rst.data.code === 200) {
      return Promise.resolve(rst.data)
    }
    return Promise.reject(rst.data)
  }
}, function (error) {
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
      return resolve(rst.data || rst)
    }).catch(error => {
      if ((error.message.search('timeout') !== -1 && error.code === 'ECONNABORTED') || error.message.search('Network') !== -1) {
        error.message = '您的网络不给力，请稍后再试'
      }
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
      return resolve(rst.data || rst)
    }).catch(error => {
      if ((error.message.search('timeout') !== -1 && error.code === 'ECONNABORTED') || error.message.search('Network') !== -1) {
        error.message = '您的网络不给力，请稍后再试'
      }
      return reject(error)
    })
  })
}

export default {
  get: getMethod,
  post: postMethod
}
