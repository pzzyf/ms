<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import type { FormRenderProps } from '../type'
import { Form } from '@ms-core/shadcn-ui'
import { cn } from '@ms-core/shared/utils'
import { computed } from 'vue'

import FormField from './form-field.vue'

interface Props extends FormRenderProps {}

const props = withDefaults(defineProps<Props>(), {
  wrapperClass: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
})

const emits = defineEmits<{ submit: [event: any] }>()

const wrapperClass = computed(() => {
  const cls = ['flex']
  if (props.layout === 'inline') {
    cls.push('flex-wrap gap-x-2')
  }
  else {
    cls.push(props.compact ? 'gap-x-2' : 'gap-x-4', 'flex-col grid')
  }
  return cn(...cls, props.wrapperClass)
})

const formComponents = computed(() => (props.form ? 'form' : Form))

const formComponentProps = computed(() => {
  return props.form
    ? {
      }
    : {
        onSubmit: (val: GenericObject) => emits('submit', val),
      }
})
</script>

<template>
  <component :is="formComponents" v-bind="formComponentProps">
    <div :class="wrapperClass">
      <template v-for="item in 4" :key="item">
        <FormField field-name="username" component="MsInput" />
      </template>
    </div>
  </component>
</template>

<style scoped></style>
