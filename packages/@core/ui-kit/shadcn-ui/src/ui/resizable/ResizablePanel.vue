<script setup lang="ts">
import type { SplitterPanelEmits, SplitterPanelProps } from 'reka-ui'
import { SplitterPanel, useForwardExpose, useForwardPropsEmits } from 'reka-ui'

const properties = defineProps<SplitterPanelProps>()
const emits = defineEmits<SplitterPanelEmits>()

const forwarded = useForwardPropsEmits(properties, emits)
const { forwardRef } = useForwardExpose()
</script>

<template>
  <SplitterPanel
    :ref="forwardRef"
    v-slot="slotProps"
    data-slot="resizable-panel"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps"></slot>
  </SplitterPanel>
</template>
