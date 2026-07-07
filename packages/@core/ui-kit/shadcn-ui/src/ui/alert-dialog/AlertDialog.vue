<script setup lang="ts">
import type { AlertDialogEmits, AlertDialogProps } from 'reka-ui'
import { AlertDialogRoot, useForwardPropsEmits } from 'reka-ui'

const properties = defineProps<AlertDialogProps>()
const emits = defineEmits<AlertDialogEmits>()

const forwarded = useForwardPropsEmits(properties, emits)
</script>

<template>
  <AlertDialogRoot
    v-slot="slotProps"
    data-slot="alert-dialog"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps"></slot>
  </AlertDialogRoot>
</template>
