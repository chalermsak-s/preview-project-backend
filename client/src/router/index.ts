import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
import LoginView from '@/views/page/LoginView.vue'
import AboutView from '@/views/page/AboutView.vue'
import RegisterView from '@/views/page/RegisterView.vue'
import StudentListView from '@/views/student/StudentListView.vue'
import StudentDetailView from '@/views/student/StudentDetailView.vue'

import { useStudentStore } from '@/stores/student'
import studentService from '@/services/StudentService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login-view',
      component: LoginView,
      props: (route) => ({
        page: parseInt(route.query.page as string) || 1,
      }),
    },
    {
      path: '/about',
      name: 'about-view',
      component: AboutView,
      props: (route) => ({
        page: parseInt(route.query.page as string) || 1,
      }),
    },
    {
      path: '/register',
      name: 'register-view',
      component: RegisterView,
      props: (route) => ({
        page: parseInt(route.query.page as string) || 1,
      }),
    },
    {
      path: '/student',
      name: 'student-list-view',
      component: StudentListView,
      props: (route) => ({
        page: parseInt(route.query.page as string) || 1,
      }),
    },
    {
      path: '/student/detail/:id',
      name: 'student-detail-view',
      component: StudentDetailView,
      props: true,
      beforeEnter: async (to) => {
        const id = Number(to.params.id) // ป้องกัน NaN
        if (isNaN(id)) {
          return { name: '404-resource-view', params: { resource: 'student' } }
        }
    
        const studentStore = useStudentStore()
    
        try {
          const response = await studentService.getStudent(id)
          studentStore.setStore(response.data)
          return true // อนุญาตให้ไปต่อ
        } catch (error:any) {
          if (error.response?.status === 404) {
            return { name: '404-resource-view', params: { resource: 'student' } }
          } else {
            return { name: 'network-error-view' }
          }
        }
      },
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
