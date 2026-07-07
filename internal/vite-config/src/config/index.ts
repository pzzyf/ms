import type { DefineConfig, MsViteConfig } from '../typing'

import { defineApplicationConfig as defineAppConfig } from './application'

function defineConfig(userConfigPromise?: DefineConfig): MsViteConfig {
  return defineAppConfig(userConfigPromise)
}

export { defineConfig }
