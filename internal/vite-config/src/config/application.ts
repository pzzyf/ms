import type { UserConfig } from 'vite'

import type { DefineApplicationOptions } from '../typing'

import { defineConfig, mergeConfig } from 'vite'

import { loadApplicationPlugins } from '../plugins'
import { loadAndConvertEnv } from '../utils/env'
import { getCommonConfig } from './common'

function defineApplicationConfig(userConfigPromise?: DefineApplicationOptions) {
  return defineConfig(async (config) => {
    const options = await userConfigPromise?.(config)

    const { base, port } = await loadAndConvertEnv()
    const { command } = config
    const { vite = {} } = options || {}
    const isBuild = command === 'build'

    const plugins = await loadApplicationPlugins({
      injectMetadata: true,
      injectAppLoading: true,
      nitroMock: !isBuild,
      nitroMockOptions: {},
    })

    const applicationConfig: UserConfig = {
      base,
      build: {
        rolldownOptions: {
          output: {
            assetFileNames: '[ext]/[name]-[hash].[ext]',
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'jse/index-[name]-[hash].js',
            minify: isBuild
              ? {
                  compress: {
                    dropDebugger: true,
                  },
                }
              : false,
          },
        },
        target: 'es2015',
      },
      plugins,
      server: {
        host: true,
        port,
        warmup: {
          // 预热文件
          clientFiles: [
            './index.html',
          ],
        },
      },
    }

    const mergedCommonConfig = mergeConfig(
      await getCommonConfig(),
      applicationConfig,
    )
    return mergeConfig(mergedCommonConfig, vite)
  })
}

export { defineApplicationConfig }
