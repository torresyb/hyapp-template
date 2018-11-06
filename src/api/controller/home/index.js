/**
 * @author yangbin
 * @date 2018/4/18
 * @Description: 首页接口
 */

import http from '../../http'
import {getUrl, getParams} from '../../env'

// 登录接口url
let loginUrl = getUrl('/login')

/**
 * 登录接口
 * @params query
 * @config axios 配置项
 * @url '/login'
 * @returns {*}
 */
export function loginHandle (params = {}, config = {}) {
  let q = getParams(params)
  return http.get(loginUrl + '?' + q, config)
}

/**
 * 登录接口 post请求
 * @returns {*}
 */
// export function loginHandle (params = {}, config = {}) {
//   return http.post(loginUrl, params, config)
// }
