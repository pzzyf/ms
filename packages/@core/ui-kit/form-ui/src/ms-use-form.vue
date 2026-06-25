<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ExtendedFormApi, MsFormProps } from './types'
import { useForwardPriorityValues } from '@ms-core/composables'
import {
  COMPONENT_MAP,
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

console.log(forward, 'forward')

const { form } = useFormInitial(forward)
</script>

<template>
  <Form v-bind="forward" :collapsed="state?.collapsed" :form="form" :component-map="COMPONENT_MAP" />
</template>

<style scoped>

</style>
