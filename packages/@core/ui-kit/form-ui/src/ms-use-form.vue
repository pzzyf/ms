<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ExtendedFormApi, MsFormProps } from './types'
import { useForwardPriorityValues } from '@ms-core/composables'
import {
  COMPONENT_BIND_EVENT_MAP,
  COMPONENT_MAP,
  DEFAULT_FORM_COMMON_CONFIG,
} from './config'
import { Form } from './form-render'

import {
  useFormInitial,
} from './use-form-context'

interface Props extends MsFormProps {
  formApi?: ExtendedFormApi
}

defineOptions({
  name: 'MsUseForm',
})

const props = defineProps<Props>()

const state = props.formApi?.useStore?.()

const forward = useForwardPriorityValues(props, state)

const { form } = useFormInitial(forward)

props.formApi?.mount(form)
</script>

<template>
  <Form
    v-bind="forward"
    :collapsed="state?.collapsed"
    :component-bind-event-map="COMPONENT_BIND_EVENT_MAP"
    :component-map="COMPONENT_MAP"
    :form="form"
    :global-common-config="DEFAULT_FORM_COMMON_CONFIG"
  />
</template>

<style scoped>

</style>
