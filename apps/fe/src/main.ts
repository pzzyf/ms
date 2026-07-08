import { initPreferences } from '@ms/preferences';
import { unmountGlobalLoading } from '@ms/utils';

async function initApp() {
  const environment = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${environment}`;

  await initPreferences(namespace);

  const { bootstrap } = await import('./bootstrap');
  await bootstrap(namespace);
  unmountGlobalLoading();
}

initApp();
