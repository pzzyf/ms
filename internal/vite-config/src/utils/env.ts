import type { ApplicationPluginOptions as AppPluginOptions } from '../typing';

import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

import dotenv from 'dotenv';

function getString(value: string | undefined, fallback: string) {
  return value ?? fallback;
}

function getNumber(value: string | undefined, fallback: number) {
  return Number(value) || fallback;
}

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfigFiles() {
  const script = process.env.npm_lifecycle_script as string;
  const reg = /--mode ([\d_a-z]+)/;
  const result = reg.exec(script);
  const mode = result ? (result[1] as string) : 'production';
  return ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`];
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
async function loadEnvironment<T = Record<string, string>>(
  match = 'VITE_GLOB_',
  confFiles = getConfigFiles(),
) {
  let environmentConfig = {};

  for (const configFile of confFiles) {
    try {
      const configFilePath = join(process.cwd(), configFile);
      if (existsSync(configFilePath)) {
        const environmentPath = await fs.readFile(configFilePath, {
          encoding: 'utf8',
        });
        const environment = dotenv.parse(environmentPath);
        environmentConfig = { ...environmentConfig, ...environment };
      }
    } catch (error) {
      console.error(`Error while parsing ${configFile}`, error);
    }
  }
  const reg = new RegExp(`^(${match})`);
  for (const key of Object.keys(environmentConfig)) {
    if (!reg.test(key)) {
      Reflect.deleteProperty(environmentConfig, key);
    }
  }
  return environmentConfig as T;
}

async function loadAndConvertEnvironment(
  match = 'VITE_',
  configFiles = getConfigFiles(),
): Promise<
  Partial<AppPluginOptions> & {
    base: string;
    port: number;
  }
> {
  const environmentConfig = await loadEnvironment(match, configFiles);

  const { VITE_BASE, VITE_PORT } = environmentConfig;

  return {
    base: getString(VITE_BASE, '/'),
    port: getNumber(VITE_PORT, 5173),
  };
}

export {
  loadAndConvertEnvironment as loadAndConvertEnv,
  loadEnvironment as loadEnv,
};
