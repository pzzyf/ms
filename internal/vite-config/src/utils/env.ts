import type { ApplicationPluginOptions } from '../typing'

import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'

import dotenv from 'dotenv'

function getString(value: string | undefined, fallback: string) {
  return value ?? fallback
}

function getNumber(value: string | undefined, fallback: number) {
  return Number(value) || fallback
}

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script as string
  const reg = /--mode ([\d_a-z]+)/
  const result = reg.exec(script)
  let mode = 'production'
  if (result) {
    mode = result[1] as string
  }
  return ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`]
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
async function loadEnv<T = Record<string, string>>(
  match = 'VITE_GLOB_',
  confFiles = getConfFiles(),
) {
  let envConfig = {}

  for (const confFile of confFiles) {
    try {
      const confFilePath = join(process.cwd(), confFile)
      if (existsSync(confFilePath)) {
        const envPath = await fs.readFile(confFilePath, {
          encoding: 'utf8',
        })
        const env = dotenv.parse(envPath)
        envConfig = { ...envConfig, ...env }
      }
    }
    catch (error) {
      console.error(`Error while parsing ${confFile}`, error)
    }
  }
  const reg = new RegExp(`^(${match})`)
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key)
    }
  })
  return envConfig as T
}

async function loadAndConvertEnv(
  match = 'VITE_',
  confFiles = getConfFiles(),
): Promise<
  Partial<ApplicationPluginOptions> & {
    base: string
    port: number
  }
> {
  const envConfig = await loadEnv(match, confFiles)

  const {
    VITE_BASE,
    VITE_PORT,
  } = envConfig

  return {
    base: getString(VITE_BASE, '/'),
    port: getNumber(VITE_PORT, 5173),
  }
}

export { loadAndConvertEnv, loadEnv }
