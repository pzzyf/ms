import { createApp } from 'vue'
import App from './App.vue'

import { registerLoadingDirective } from '@ms/common-ui/es/loading'


async function bootstrap(namespace: string) {
  console.log(namespace);
  

  const app = createApp(App);

  registerLoadingDirective(app,{
    loading: 'loading'
  })

  app.mount('#app')
}


export { bootstrap }
