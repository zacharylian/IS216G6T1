import {getAuth} from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter(to, from, next){
      if (getAuth().currentUser !== null){
        next()
      }else{
        next("/LoginView")
      }
    }
    
  },
  {
    path: '/AboutView',
    name: 'AboutView',
    component: () => import('../views/AboutView.vue'),
    beforeEnter(to, from, next){
      if (getAuth().currentUser !== null){
        next()
      }else{
        next("/LoginView")
      }
    }
  },
  {
    path: '/LoginView',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/SpendingDashboard',
    name: 'SpendingDashboard',
    component: () => import('../views/SpendingDashboard.vue'),
    beforeEnter(to, from, next){
      if (getAuth().currentUser !== null){
        next()
      }else{
        next("/LoginView")
      }
    }
  },
  {
    path: '/ToDoSample',
    name: 'ToDoSample',
    component: () => import('../views/ToDoSample.vue'),
    beforeEnter(to, from, next){
      if (getAuth().currentUser !== null){
        next()
      }else{
        next("/LoginView")
      }
    }
  },
  {
    path: '/Calendar',
    name: 'Calendar',
    component: () =>import('../views/Calendar.vue'),
    beforeEnter(to, from, next){
      if (getAuth().currentUser !== null){
        next()
      }else{
        next("/LoginView")
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
