import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import NoticeView from '@/views/NoticeView.vue'
import AdminStudentView from '@/views/AdminStudentView.vue'

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
  },
  {
    path: '/admin/students',
    name: 'AdminStudentView',
    component: AdminStudentView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
