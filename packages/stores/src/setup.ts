import type { App } from 'vue';
import type { Pinia } from 'pinia';
import { createPinia } from 'pinia';

let pinia: Pinia;

interface InitStoreOptions {
  namespace: string;
}

/**
 * @zh_CN 初始化pinia
 */
export async function initStores(app: App, options: InitStoreOptions) {
  const { createPersistedState } = await import('pinia-plugin-persistedstate');
  pinia = createPinia();
  const { namespace } = options;

  console.log(namespace);

  pinia.use(createPersistedState())

  app.use(pinia);
  return pinia;
}
