import { preferences } from "@ms/preferences";
import type { RouteRecordRaw } from "vue-router";
const BasicLayout = () => import('#/layouts/basic.vue');
const AuthPageLayout = () => import('#/layouts/auth.vue');

/** 基本路由，这些路由是必须存在的 */
const coreRoutes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      hideInBreadcrumb: true,
      title: 'Root',
    },
    name: 'Root',
    path: '/',
    redirect: preferences.app.defaultHomePath,
    children: [],
  },

  {
    component: AuthPageLayout,
    meta: {
      hideInTab: true,
      title: 'Authentication',
    },
    name: 'Authentication',
    path: '/auth',
    redirect: '/auth/login',
    children: [
      {
        name: 'Login',
        path: 'login',
        component: () => import('#/views/_core/authentication/login.vue'),
      },
    ],
  },
  
]


export { coreRoutes }
