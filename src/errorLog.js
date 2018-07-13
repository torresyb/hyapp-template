/**
 * @author yangbin
 * @date 2018/7/13
 * @Description: 获取错误日志
 */
import Vue from 'Vue'
import store from './store/index'

if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = (err, vm, info, a) => {
    Vue.nextTick(() => {
      store.dispatch('addErrorLog', {err, vm, info, url: window.location.href})
      console.error(err, info)
    })
  }
}
