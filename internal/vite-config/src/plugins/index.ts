import type { PluginOption } from 'vite';

import type {
  ConditionPlugin,
} from '../typing';

import tailwindcss from '@tailwindcss/vite';
import viteVue from '@vitejs/plugin-vue';
import viteVueJsx from '@vitejs/plugin-vue-jsx';
import viteDtsPlugin from 'unplugin-dts/vite';


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
): Promise<ConditionPlugin[]> {
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
  ];
}

/**
 * 根据条件获取应用类型的vite插件
 */
async function loadApplicationPlugins(): Promise<PluginOption[]> {

  const commonPlugins = await loadCommonPlugins();

  return await loadConditionPlugins([
    ...commonPlugins,
  ]);
}

export {
  loadApplicationPlugins,
  viteDtsPlugin,
};
