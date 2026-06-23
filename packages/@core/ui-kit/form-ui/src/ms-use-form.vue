<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ExtendedFormApi, MsFormProps } from './types'
import { Form } from './form-render'

interface Props extends MsFormProps {
  formApi?: ExtendedFormApi
}

defineOptions({
  name: 'MsUseForm',
})

const props = defineProps<Props>()

const state = props.formApi?.useStore?.()

console.log(state)
</script>

<template>
  <Form />
</template>

<style scoped>

</style>
