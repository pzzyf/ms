import type { UserConfig } from 'vite';

import type { DefineApplicationOptions as DefineAppOptions } from '../typing';

import { defineConfig, mergeConfig } from 'vite';

import { loadApplicationPlugins as loadAppPlugins } from '../plugins';
import { loadAndConvertEnv as loadAndConvertEnvironment } from '../utils/env';
import { getCommonConfig } from './common';

function defineAppConfig(userConfigPromise?: DefineAppOptions) {
  return defineConfig(async (config) => {
    const options = await userConfigPromise?.(config);

    const { base, port } = await loadAndConvertEnvironment();
    const { command } = config;
    const { vite = {} } = options || {};
    const isBuild = command === 'build';

    const plugins = await loadAppPlugins({
      injectMetadata: true,
      injectAppLoading: true,
      nitroMock: false,
      // nitroMock: !isBuild,
      nitroMockOptions: {},
    });

    const appConfig: UserConfig = {
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
          clientFiles: ['./index.html'],
        },
      },
    };

    const mergedCommonConfig = mergeConfig(await getCommonConfig(), appConfig);
    return mergeConfig(mergedCommonConfig, vite);
  });
}

export { defineAppConfig as defineApplicationConfig };
