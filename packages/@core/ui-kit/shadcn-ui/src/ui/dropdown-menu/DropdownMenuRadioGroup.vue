<script setup lang="ts">
import type {
  DropdownMenuRadioGroupEmits,
  DropdownMenuRadioGroupProps,
} from 'reka-ui';
import { DropdownMenuRadioGroup, useForwardPropsEmits } from 'reka-ui';

const properties = defineProps<DropdownMenuRadioGroupProps>();
const emits = defineEmits<DropdownMenuRadioGroupEmits>();

const forwarded = useForwardPropsEmits(properties, emits);
</script>

<template>
  <DropdownMenuRadioGroup
    data-slot="dropdown-menu-radio-group"
    v-bind="forwarded"
  >
    <slot></slot>
  </DropdownMenuRadioGroup>
</template>
