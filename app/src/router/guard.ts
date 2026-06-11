import type { Router } from "vue-router"
import { startProgress, stopProgress } from "@ms/utils"
import { preferences } from "@ms/preferences";
import { useAccessStore, useUserStore } from "@ms/stores";
import { LOGIN_PATH } from "@ms/constants"
import { coreRouteNames } from '#/router/routes'

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

function setupAccessGuard(router: Router) {
  router.beforeEach((to) => {
    const accessStore = useAccessStore()
    const userStore = useUserStore()
    // 基本路由，这些路由不需要进入权限拦截
    if (coreRouteNames.includes(to.name as string)) {
      if (to.path === LOGIN_PATH && accessStore.accessToken) {
        return decodeURIComponent(
          (to.query?.redirect as string) ||
          userStore.userInfo?.homePath ||
          preferences.app.defaultHomePath,
        );
      }
      return true;
    }

    // accessToken 检查
    if (!accessStore.accessToken) {
      // 明确声明忽略权限访问权限，则可以访问
      if (to.meta.ignoreAccess) {
        return true;
      }

      // 没有访问权限，跳转登录页面
      if (to.fullPath !== LOGIN_PATH) {
        return {
          path: LOGIN_PATH,
          // 如不需要，直接删除 query
          query:
            to.fullPath === preferences.app.defaultHomePath
              ? {}
              : { redirect: encodeURIComponent(to.fullPath) },
          // 携带当前跳转的页面，登录后重新跳转该页面
          replace: true,
        };
      }
      return to;
    }
  })

}

function createRouterGuard(router: Router) {
  commonGuard(router)
  setupAccessGuard(router)
}

export { createRouterGuard }
