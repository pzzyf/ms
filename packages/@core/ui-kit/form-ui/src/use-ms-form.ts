import type { BaseFormComponentType, ExtendedFormApi, MsFormProps } from './type.js'
import { useSelector } from '@ms-core/shared/store'
import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue'
import { FormApi } from './form-api.js'
import MsUseForm from './ms-use-form.vue'

function useMsForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: MsFormProps<T>) {
  const IS_REACTIVE = isReactive(options)
  const api = new FormApi(options)
  const extendedApi: ExtendedFormApi = api as never
  extendedApi.useStore = (selector) => {
    return useSelector(api.store, selector)
  }

  const Form = defineComponent(
    (props: MsFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount()
      })
      api.setState({ ...props, ...attrs })
      return () =>
        h(MsUseForm, { ...props, ...attrs, formApi: extendedApi }, slots)
    },
    {
      name: 'MsUseForm',
      inheritAttrs: false,
    },
  )

  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
      },
      { immediate: true },
    )
  }

  return [Form, extendedApi]
}

export { useMsForm }
