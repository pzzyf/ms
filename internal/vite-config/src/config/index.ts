import type { DefineConfig, MsViteConfig } from '../typing';

import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { defineApplicationConfig } from './application';


function defineConfig(
  userConfigPromise?: DefineConfig,
): MsViteConfig {
  return defineApplicationConfig(userConfigPromise);
}

export { defineConfig };
