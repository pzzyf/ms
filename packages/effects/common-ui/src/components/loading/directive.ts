import type { App, Directive } from 'vue';
import { isString } from '@ms-core/shared/utils';
import { h, render } from 'vue';

const CLASS_NAME_RELATIVE = 'spinner-parent--relative';

const LOADING_INSTANCE_KEY = Symbol('loading');

interface LoadingDirectiveParameters {
  loading: boolean | string;
}

const loadingDirective: Directive = {
  mounted(element, binding) {
    const instance = h({}, binding);
    render(instance, element);

    element.classList.add(CLASS_NAME_RELATIVE);
    element[LOADING_INSTANCE_KEY] = instance;
  },
  unmounted(element) {
    const instance = element[LOADING_INSTANCE_KEY];
    element.classList.remove(CLASS_NAME_RELATIVE);
    render(null, element);
    instance.el.remove();
    element[LOADING_INSTANCE_KEY] = null;
  },
};

/**
 * 注册加载指令
 * @param app
 * @param params
 */

function registerLoadingDirective(
  app: App,
  parameters: LoadingDirectiveParameters,
) {
  const style = document.createElement('style');
  style.innerHTML = `
    ${CLASS_NAME_RELATIVE} {
      position: relative !important;
    }
  `;
  document.head.append(style);

  if (parameters?.loading !== false) {
    app.directive(
      isString(parameters?.loading) ? parameters.loading : 'loading',
      loadingDirective,
    );
  }
}

export { registerLoadingDirective };
