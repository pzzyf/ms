import type { RouteRecordRaw } from 'vue-router';
import { mergeRouteModules, traverseTreeValues } from '@ms/utils';
import { coreRoutes } from '../core';

const dynamicRouteFiles = import.meta.glob('./modules/**/*.ts', {
  eager: true,
});

/** 动态路由 */
const dynamicRoutes: RouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles);

const staticRoutes: RouteRecordRaw[] = [];

const routes: RouteRecordRaw[] = [...coreRoutes];

/** 有权限校验的路由列表，包含动态路由和静态路由 */
const accessRoutes = [...dynamicRoutes, ...staticRoutes];

const coreRouteNames = traverseTreeValues(coreRoutes, (route) => route.name);

export { accessRoutes, coreRouteNames, routes };
