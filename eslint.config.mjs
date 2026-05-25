import defineConfig from '@ms/eslint-config'

export default defineConfig(
  {},
  {
    files: ['pnpm-workspace.yaml'],
    rules: {
      'pnpm/yaml-enforce-settings': 'off',
    },
  },
)
