import type { Router } from "vue-router"

/**
 * 创建通用路由守卫
 * @param router 
 */

function commonGuard(router: Router) {

  const loadedPaths = new Set<string>();
  router.beforeEach((to) => {
    to.meta.loaded = loadedPaths.has(to.path);

    if (!to.meta.loaded) {
      // startProgress();
    }
    return true;
  });

  router.afterEach((to) => {
    loadedPaths.add(to.path);
    // stopProgress();
  });
}

function createRouterGuard(router: Router) {

  commonGuard(router)
  
}

export { createRouterGuard }
