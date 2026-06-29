import { defineConfig } from '@ms/vite-config'

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:5432/api',
            ws: true,
          },
        },
      },
    },
  }
})
