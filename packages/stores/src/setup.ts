import type { Pinia } from 'pinia'
import type { App } from 'vue'
import { createPinia } from 'pinia'

let pinia: Pinia

interface InitStoreOptions {
  namespace: string
}

/**
 * @zh_CN 初始化pinia
 */
export async function initStores(app: App, options: InitStoreOptions) {
  const { createPersistedState } = await import('pinia-plugin-persistedstate')
  pinia = createPinia()
  const { namespace } = options

  pinia.use(createPersistedState({
    key: id => `${namespace}-${id}`,
  }))

  app.use(pinia)
  return pinia
}
