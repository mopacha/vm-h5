import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/trip'
  },

  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/trip',
    name: 'trip',
    component: () => import('../views/trip/trip.vue')
  },
  {
    path: '/traffic',
    name: 'traffic',
    component: () => import('../views/traffic/traffic.vue')
  },
  {
    path: '/cssTest',
    name: 'cssTest',
    component: () => import('../views/cssTest/cssTest.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/mine/mine.vue')
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('../views/mine/chart.vue')
  },
  // 出错路径
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    name: '404',
    component: () => import('components/Error/404')
  },
  {
    path: '/401',
    name: '401',
    component: () => import('components/Error/401')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
