<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from 'reka-ui';
import { TooltipRoot, useForwardPropsEmits } from 'reka-ui';

const properties = defineProps<TooltipRootProps>();
const emits = defineEmits<TooltipRootEmits>();

const forwarded = useForwardPropsEmits(properties, emits);
</script>

<template>
  <TooltipRoot v-slot="slotProps" data-slot="tooltip" v-bind="forwarded">
    <slot v-bind="slotProps"></slot>
  </TooltipRoot>
</template>
