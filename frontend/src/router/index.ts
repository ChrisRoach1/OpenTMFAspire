import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { pageRoutes } from './routes'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      children: pageRoutes,
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
