import defineConfig from '@ms/eslint-config'

export default defineConfig(
  {
    typescript: true,
    vue: true,
  },
  {
    files: ['pnpm-workspace.yaml'],
    rules: {
      'pnpm/yaml-enforce-settings': 'off',
    },
  },
)
