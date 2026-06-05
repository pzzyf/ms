import type { PluginOption } from 'vite';

import type {
  ConditionPlugin,
  CommonPluginOptions,
  ApplicationPluginOptions
} from '../typing';

import tailwindcss from '@tailwindcss/vite';
import viteVue from '@vitejs/plugin-vue';
import viteVueJsx from '@vitejs/plugin-vue-jsx';
import viteDtsPlugin from 'unplugin-dts/vite';
import { viteMetadataPlugin } from './inject-metadata';
import { viteInjectAppLoadingPlugin } from './inject-app-loading';


/**
 * 获取条件成立的 vite 插件
 * @param conditionPlugins
 */
async function loadConditionPlugins(conditionPlugins: ConditionPlugin[]) {
  const plugins: PluginOption[] = [];
  for (const conditionPlugin of conditionPlugins) {
    if (conditionPlugin.condition) {
      const realPlugins = await conditionPlugin.plugins();
      plugins.push(...realPlugins);
    }
  }
  return plugins.flat();
}

/**
 * 根据条件获取通用的vite插件
 */
async function loadCommonPlugins(
  options: CommonPluginOptions
): Promise<ConditionPlugin[]> {
  const { injectMetadata } = options;
  return [
    {
      condition: true,
      plugins: () => [
        viteVue({
          script: {
            defineModel: true,
            // propsDestructure: true,
          },
        }),
        viteVueJsx(),
        tailwindcss(),
      ],
    },
    {
      condition: injectMetadata,
      plugins: async () => [await viteMetadataPlugin()],
    },
  ];
}

/**
 * 根据条件获取应用类型的vite插件
 */
async function loadApplicationPlugins(options: ApplicationPluginOptions): Promise<PluginOption[]> {

  const {
    injectAppLoading,
    ...commonOptions
  } = options;

  const commonPlugins = await loadCommonPlugins(commonOptions);

  return await loadConditionPlugins([
    ...commonPlugins,
    {
      condition: injectAppLoading,
      plugins: async () => [await viteInjectAppLoadingPlugin()]
    }
  ]);
}

export {
  loadApplicationPlugins,
  viteDtsPlugin,
};
