// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './errorLog'
import * as filters from './filters'
import FastClick from 'fastclick'
import hyappUI from 'hyapp-ui'
import hyapp from 'hyapp-utils'

// 工具类方法
Vue.use(hyapp.Tools)
Vue.use(hyappUI)

// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 防止点穿
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

if (process.env.NODE_ENV === 'production') {
  // 全局错误统计
  window.onerror = function (msg, url, line, col, error) {
    // 没有URL不上报！上报也不知道错误
    if (msg !== 'Script error.' && !url) {
      return true
    }
    // 采用异步的方式
    // 我遇到过在window.onunload进行ajax的堵塞上报O
    // 由于客户端强制关闭webview导致这次堵塞上报有Network Error
    // 我猜测这里window.onerror的执行流在关闭前是必然执行的
    // 而离开文章之后的上报对于业务来说是可丢失的
    // 所以我把这里的执行流放到异步事件去执行
    // 脚本的异常数降低了10倍
    setTimeout(function () {
      var data = {}
      // 不一定所有浏览器都支持col参数
      col = col || (window.event && window.event.errorCharacter) || 0

      data.url = window.location.href
      data.line = line
      data.col = col
      data.errMessage = msg || error.message
      if (!!error && !!error.stack) {
        // 如果浏览器有堆栈信息
        // 直接使用
        data.msg = error.stack.toString()
      } else if (window.arguments.callee) {
        // 尝试通过callee拿堆栈信息
        let ext = []
        let f = window.arguments.callee.caller
        let c = 3
        // 这里只拿三层堆栈信息
        while (f && (--c > 0)) {
          ext.push(f.toString())
          if (f === f.caller) {
            break// 如果有环
          }
          f = f.caller
        }
        ext = ext.join(',')
        // console.log(data)
        if (error.stack) {
          data.msg = error.stack.toString()
        } else {
          data.meg = JSON.stringify(msg)
        }
      }
      // console
      // 把data上报到后台！
      // console.log(data)
      console.log('错误收集 --- > ' + JSON.stringify(data))
      window.vm.$appInvoked('appUploadException', {error: data}, '')
    }, 0)
    return true
  }

  // 添加版本信息
  let vData = new Date()
  let m = (vData.getMonth() + 1) + ''
  let d = vData.getDay() + ''
  console.log('版本号:', VERSION + '_' + (m.length === 1 ? ('0' + m) : m) + '' + (d.length === 1 ? ('0' + d) : d))
}
