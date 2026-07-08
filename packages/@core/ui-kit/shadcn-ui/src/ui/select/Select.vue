<script setup lang="ts">
import type { SelectRootEmits, SelectRootProps } from 'reka-ui';
import { SelectRoot, useForwardPropsEmits } from 'reka-ui';

const properties = defineProps<SelectRootProps>();
const emits = defineEmits<SelectRootEmits>();

const forwarded = useForwardPropsEmits(properties, emits);
</script>

<template>
  <SelectRoot v-slot="slotProps" data-slot="select" v-bind="forwarded">
    <slot v-bind="slotProps"></slot>
  </SelectRoot>
</template>
