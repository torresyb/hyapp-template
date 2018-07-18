import axios from 'axios'

axios.defaults.withCredentials = true

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = 'token 2222'
  config.headers['os'] = window.vm.$tools.getBrowser()
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
})

axios.interceptors.response.use(function (rst) {
  // Do something with response data
  return rst
}, function (error) {
  // Do something with response error
  // window.vm.$message.error('接口连接错误!')
  return Promise.reject(error)
})

function errorTipHandle (rst) {
  if (rst.data && rst.data.code !== '0000') {
    // window.vm.$message.error(rst.data.msg)
    throw new Error()
  }
}

function getMethod (url, config = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, config).then(rst => {
      errorTipHandle(rst)
      resolve(rst)
    }).catch(err => {
      reject(err)
    })
  })
}

function postMethod (url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config).then(rst => {
      errorTipHandle(rst)
      resolve(rst)
    }).catch(err => {
      reject(err)
    })
  })
}

export default {
  get: getMethod,
  post: postMethod
}
