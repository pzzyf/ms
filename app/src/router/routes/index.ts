import { coreRoutes } from "../core";
import type { RouteRecordRaw } from "vue-router";
import { traverseTreeValues } from "@ms/utils"

const routes: RouteRecordRaw[] = [
  ...coreRoutes,
]

const coreRouteNames = traverseTreeValues(coreRoutes, (route) => route.name);

export { routes, coreRouteNames }
