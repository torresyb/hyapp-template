import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '@/pages/home/index'

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
