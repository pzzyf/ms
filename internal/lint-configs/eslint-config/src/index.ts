import type { Linter } from 'eslint';

import {
  disableds,
  ignores,
  importPluginConfig,
  javascript,
  jsonc,
  node,
  prettier,
  test,
  typescript,
  vue,
  yaml,
  comments,
  jsdoc,
  unicorn,
} from './configs';

type FlatConfig = Linter.Config;

type FlatConfigPromise =
  FlatConfig | FlatConfig[] | Promise<FlatConfig> | Promise<FlatConfig[]>;

async function defineConfig(config: FlatConfig[] = []) {
  const configs: FlatConfigPromise[] = [
    vue(),
    javascript(),
    ignores(),
    prettier(),
    typescript(),
    jsonc(),
    disableds(),
    importPluginConfig(),
    node(),
    comments(),
    jsdoc(),
    unicorn(),
    test(),
    yaml(),
    ...config,
  ];

  const resolved = await Promise.all(configs);

  return resolved.flat();
}

export { defineConfig };
