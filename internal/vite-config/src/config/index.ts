import type { DefineConfig, MsViteConfig } from '../typing'

import { defineApplicationConfig } from './application'

function defineConfig(
  userConfigPromise?: DefineConfig,
): MsViteConfig {
  return defineApplicationConfig(userConfigPromise)
}

export { defineConfig }
