import { createApp } from 'vue'
import App from './App.vue'


function bootstrap(namespace: string) {
  console.log(namespace);
  
  const app = createApp(App);
  app.mount('#app')
}


export { bootstrap }
