import type { App, Directive } from 'vue'
import { isString } from '@ms-core/shared/utils'
import { h, render } from 'vue'

const CLASS_NAME_RELATIVE = 'spinner-parent--relative'

const LOADING_INSTANCE_KEY = Symbol('loading')

interface LoadingDirectiveParams {
  loading: boolean | string
}

const loadingDirective: Directive = {
  mounted(el, binding) {
    const instance = h({}, binding)
    render(instance, el)

    el.classList.add(CLASS_NAME_RELATIVE)
    el[LOADING_INSTANCE_KEY] = instance
  },
  unmounted(el) {
    const instance = el[LOADING_INSTANCE_KEY]
    el.classList.remove(CLASS_NAME_RELATIVE)
    render(null, el)
    instance.el.remove()
    el[LOADING_INSTANCE_KEY] = null
  },
}

/**
 * 注册加载指令
 * @param app
 * @param params
 */

function registerLoadingDirective(app: App, params: LoadingDirectiveParams) {
  const style = document.createElement('style')
  style.innerHTML = `
    ${CLASS_NAME_RELATIVE} {
      position: relative !important;
    }
  `
  document.head.appendChild(style)

  if (params?.loading !== false) {
    app.directive(
      isString(params?.loading) ? params.loading : 'loading',
      loadingDirective,
    )
  }
}

export { registerLoadingDirective }
