/**
 * @author yangbin
 * @date 2018/4/18
 * @Description: 首页接口
 */

import http from '../../http'
import {getUrl} from '../../env'

/**
 * 登录接口
 * @returns {*}
 */
export function loginHandle () {
  let _url = getUrl('/login')
  return http.get(_url)
}
