import { defineComponent, h } from 'vue'
import MsUseForm from './ms-use-form.vue'

function useMsForm() {
  const Form = defineComponent(
    (props, { attrs, slots }) => {
      return () => h(MsUseForm, { ...props, ...attrs }, slots)
    },
    {
      name: 'MsUseForm',
      inheritAttrs: false,
    },
  )

  return [Form]
}

export { useMsForm }
