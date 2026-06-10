import type { Router } from "vue-router"
import { startProgress, stopProgress } from "@ms/utils"
import { preferences } from "@ms/preferences";

/**
 * 创建通用路由守卫
 * @param router 
 */

function commonGuard(router: Router) {
  const loadedPaths = new Set<string>();
  router.beforeEach((to) => {
    to.meta.loaded = loadedPaths.has(to.path);
    if (!to.meta.loaded && preferences.transition.progress) {
      startProgress();
    }
    return true;
  });

  router.afterEach((to) => {
    loadedPaths.add(to.path);
    if (preferences.transition.progress) {
      stopProgress();
    }
  });
}

function createRouterGuard(router: Router) {
  commonGuard(router)
}

export { createRouterGuard }
