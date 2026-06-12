import type { RouteRecordRaw } from 'vue-router'
import { traverseTreeValues } from '@ms/utils'
import { coreRoutes } from '../core'

const routes: RouteRecordRaw[] = [
  ...coreRoutes,
]

const coreRouteNames = traverseTreeValues(coreRoutes, route => route.name)

export { coreRouteNames, routes }
