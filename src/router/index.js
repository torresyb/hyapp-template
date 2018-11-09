import Vue from 'vue'
import Router from 'vue-router'
const HomeIndex = resolve => require(['@/pages/home/index'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'home-page',
      component: HomeIndex
    },
    {
      path: '/',
      redirect: '/index'
    }
  ]
})
