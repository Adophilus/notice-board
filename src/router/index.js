import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import NoticeView from '@/views/NoticeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'DashboardView',
    component: DashboardView
  },
  {
    path: '/notice',
    name: 'NoticeView',
    component: NoticeView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
