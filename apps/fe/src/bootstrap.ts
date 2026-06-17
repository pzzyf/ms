// import { registerLoadingDirective } from '@ms/common-ui/es/loading'
import { initStores } from '@ms/stores'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './router/index.js'
import '@ms/styles'

async function bootstrap(namespace: string) {
  const app = createApp(App)

  // registerLoadingDirective(app, {
  //   loading: 'loading'
  // })

  // 配置 pinia-store
  await initStores(app, { namespace })

  app.use(router)

  app.mount('#app')
}

export { bootstrap }
