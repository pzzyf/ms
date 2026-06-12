import type { PluginOption } from 'vite'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

/**
 * 用于获取loading的html模板
 */
async function getLoadingRawByHtmlTemplate(loadingTemplate: string) {
  // 支持在app内自定义loading模板，模版参考default-loading.html即可
  let appLoadingPath = join(process.cwd(), loadingTemplate)

  if (!fs.existsSync(appLoadingPath)) {
    const __dirname = fileURLToPath(new URL('.', import.meta.url))
    appLoadingPath = join(__dirname, './default-loading.html')
  }

  return await fsp.readFile(appLoadingPath, 'utf8')
}

async function viteInjectAppLoadingPlugin(
  loadingTemplate = 'loading.html',
): Promise<PluginOption> {
  const loadingHtml = await getLoadingRawByHtmlTemplate(loadingTemplate)

  return {
    enforce: 'pre',
    name: 'vite:inject-app-loading',
    transformIndexHtml: {
      handler(html) {
        const re = /<body\s*>/
        html = html.replace(re, `<body>${loadingHtml}`)
        return html
      },
      order: 'pre',
    },
  }
}

export { viteInjectAppLoadingPlugin }
