// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import hyappUI from 'hyapp-ui'
import hyapp from 'hyapp-utils'
import getBaseUrl from './api/env'

// 工具类方法
Vue.use(hyapp.Tools)
let Http = new hyapp.Utils({baseurl: getBaseUrl()})
Vue.use(Http)
Vue.use(hyappUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
