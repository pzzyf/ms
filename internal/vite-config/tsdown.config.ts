import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: true,
  deps: {
    neverBundle: ['@ms/node-utils'],
    skipNodeModulesBundle: true,
  },
  dts: {
    resolver: 'tsc',
  },
  entry: ['src/index.ts'],
  format: ['esm'],
  outExtensions: () => ({
    dts: '.d.ts',
  }),
  copy: {
    from: 'src/plugins/inject-app-loading/default-loading.html',
    to: 'dist',
  },
})
