import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import NoticeView from '@/views/NoticeView.vue'

import AdminDashboardView from '@/views/AdminDashboardView.vue'
import AdminStudentView from '@/views/AdminStudentView.vue'
import AdminFacultyView from '@/views/AdminFacultyView.vue'
import AdminDepartmentView from '@/views/AdminDepartmentView.vue'

import StudentDashboardView from '@/views/StudentDashboardView.vue'
import StudentProfileView from '@/views/StudentProfileView.vue'

const routes = [
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    alias: '/'
  },
  {
    path: '/notice',
    name: 'NoticeView',
    component: NoticeView
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboardView',
    component: AdminDashboardView
  },
  {
    path: '/admin/students',
    name: 'AdminStudentView',
    component: AdminStudentView
  },
  {
    path: '/admin/faculty',
    name: 'AdminFacultyView',
    component: AdminFacultyView
  },
  {
    path: '/admin/department',
    name: 'AdminDepartmentView',
    component: AdminDepartmentView
  },
  {
    path: '/student/dashboard',
    name: 'StudentDashboardView',
    component: StudentDashboardView
  },
  {
    path: '/student/profile',
    name: 'StudentProfileView',
    component: StudentProfileView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
