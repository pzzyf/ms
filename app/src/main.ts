import { unmountGlobalLoading } from '@ms/utils'
import { initPreferences } from '@ms/preferences';

async function initApplication() {
  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  await initPreferences()

  const { bootstrap } = await import('./bootstrap')
  await bootstrap(namespace)
  unmountGlobalLoading()
}

initApplication()
