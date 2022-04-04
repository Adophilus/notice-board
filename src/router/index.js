import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NoticeView from '@/views/NoticeView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
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
    path: '/admin/dashboard',
    name: 'AdminDashboardView',
    component: AdminDashboardView
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
  history: createWebHistory(),
  routes
})

export default router
