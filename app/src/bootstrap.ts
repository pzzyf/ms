import { createApp } from 'vue'
import App from './App.vue'

import { registerLoadingDirective } from '@ms/common-ui/es/loading'
import { initStores } from '@ms/stores'


async function bootstrap(namespace: string) {

  const app = createApp(App);

  registerLoadingDirective(app, {
    loading: 'loading'
  })


  // 配置 pinia-tore
  await initStores(app, { namespace });


  app.mount('#app')
}


export { bootstrap }
