import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { IconCloud, IconDashboard } from '@tabler/icons-vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: Component
  }
}

// Each entry is a dashboard page; entries with a `meta.title` are listed in the sidebar.
export const pageRoutes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/pages/DashboardPage.vue'),
    meta: { title: 'Dashboard', icon: IconDashboard },
  },
  {
    path: '/weather',
    name: 'weather',
    component: () => import('@/pages/WeatherPage.vue'),
    meta: { title: 'Weather Forecast', icon: IconCloud },
  },
] satisfies RouteRecordRaw[]
