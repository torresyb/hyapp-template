/**
 * @author yangbin
 * @date 2018/8/2
 * @Description: 开发环境配置
 */
let env = {
  dev: 'http://localhost:9093/Api',
  build: 'http://192.168.184.25:9093'
}

/**
 * url 配置
 * @param url
 */
export const getUrl = url => {
  return process.env.NODE_ENV === 'development' ? (env.dev + url) : (env.build + url)
}

/**
 * params 拼接
 * @param parmas
 */
export const getParams = params => {
  let str = ''
  for (let i in params) {
    str += i + '=' + params[i] + '&'
  }
  return str.substring(0, str.length - 1)
}
