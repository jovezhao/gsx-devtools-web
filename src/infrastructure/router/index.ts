import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import GsxMain from '@/views/GsxMain.vue'
import GsxHome from '@/views/GsxHome.vue'
import GsxTest from '@/views/GsxTest.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main',
    name: 'main',
    component: GsxMain,

    children: [
      {
        path: '/main/home',
        name: 'home',
        component: GsxHome,
        meta: {
          menuKey: "010101"
        }
      },
      {
        path: '/main/404',
        name: '404',
        component: GsxTest
      },
    ]
  },
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/GsxLogin.vue')
  },
  {
    path: '/test',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/GsxTest.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
