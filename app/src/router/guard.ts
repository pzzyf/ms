import type { Router } from "vue-router"
import { startProgress, stopProgress } from "@ms/utils"

/**
 * 创建通用路由守卫
 * @param router 
 */

function commonGuard(router: Router) {
  const loadedPaths = new Set<string>();
  router.beforeEach(async (to) => {
    to.meta.loaded = loadedPaths.has(to.path);
    if (!to.meta.loaded) {
      await startProgress();
    }
    return true;
  });

  router.afterEach(async (to) => {
    loadedPaths.add(to.path);
    await stopProgress();
  });
}

function createRouterGuard(router: Router) {
  commonGuard(router)
}

export { createRouterGuard }
