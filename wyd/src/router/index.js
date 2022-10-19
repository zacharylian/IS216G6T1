import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/AboutView',
    name: 'AboutView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/LoginView',
    name: 'LoginView',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/SpendingDashboard',
    name: 'SpendingDashboard',
    component: () => import('../views/SpendingDashboard.vue')
  },
  {
    path: '/ToDoSample',
    name: 'ToDoSample',
    component: () => import('../views/ToDoSample.vue')
  },
  {
    path: '/Calendar',
    name: 'Calendar',
    component: () =>import('../views/Calendar.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
