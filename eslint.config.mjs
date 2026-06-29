import defineConfig from '@ms/eslint-config'

export default defineConfig(
  {
    typescript: true,
    vue: true,
    rules: {
      'ts/no-namespace': 'off',
    },
  },
  {
    files: ['pnpm-workspace.yaml'],
    rules: {
      'pnpm/yaml-enforce-settings': 'off',
    },
  },
)
