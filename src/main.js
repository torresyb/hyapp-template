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

// 添加版本信息
let vData = new Date()
let m = (vData.getMonth() + 1) + ''
let d = vData.getDay() + ''
console.log('版本号:', VERSION + '_' + (m.length === 1 ? ('0' + m) : m) + '' + (d.length === 1 ? ('0' + d) : d))
