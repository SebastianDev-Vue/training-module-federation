import { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/training',
    name: 'training',
    component: () => import('../views/TrainingView.vue'),
  },
  {
    path: '/modal',
    name: 'modal',
    component: () => import(/* webpackChunkName: "modal" */ '../views/TrainingModalView.vue'),
  },
  {
    path: '/federation',
    name: 'federation',
    component: () =>
      import(/* webpackChunkName: "federation" */ '../views/TrainingModuleFederation.vue'),
  },
]

export default routes
