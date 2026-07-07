import type { App } from 'vue'
import { createPinia } from 'pinia'

interface InitStoreOptions {
  namespace: string
}

/**
 * @zh_CN 初始化pinia
 */
export async function initStores(app: App, options: InitStoreOptions) {
  const { createPersistedState } = await import('pinia-plugin-persistedstate')
  const pinia = createPinia()
  const { namespace } = options

  pinia.use(
    createPersistedState({
      key: (id) => `${namespace}-${id}`,
    }),
  )

  app.use(pinia)
  return pinia
}
