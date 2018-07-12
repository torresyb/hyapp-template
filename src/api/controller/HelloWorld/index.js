/**
 * @author yangbin
 * @date 2018/4/18
 * @Description: 首页接口
 */

/**
 * 登录接口
 * @returns {*}
 */
export function loginHandle () {
  return window.vm.$get({url: '/login'})
}
