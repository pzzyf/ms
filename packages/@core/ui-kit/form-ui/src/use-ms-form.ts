import type {
  BaseFormComponentType,
  ExtendedFormApi,
  MsFormProps as MsFormProperties,
} from './types';
import { useSelector } from '@ms-core/shared/store';
import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue';
import { FormApi } from './form-api.js';
import MsUseForm from './ms-use-form.vue';

function useMsForm<T extends BaseFormComponentType = BaseFormComponentType>(
  options: MsFormProperties<T>,
) {
  const IS_REACTIVE = isReactive(options);
  const api = new FormApi(options);
  const extendedApi: ExtendedFormApi = api as never;
  extendedApi.useStore = (selector) => {
    return useSelector(api.store, selector);
  };

  const Form = defineComponent(
    (properties: MsFormProperties, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount();
      });
      api.setState({ ...properties, ...attrs });
      return () =>
        h(MsUseForm, { ...properties, ...attrs, formApi: extendedApi }, slots);
    },
    {
      name: 'MsUseForm',
      inheritAttrs: false,
    },
  );

  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {},
      { immediate: true },
    );
  }

  return [Form, extendedApi] as const;
}

export { useMsForm };
