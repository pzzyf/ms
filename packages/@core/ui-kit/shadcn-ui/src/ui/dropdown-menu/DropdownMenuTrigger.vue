<script setup lang="ts">
import type { DropdownMenuTriggerProps } from 'reka-ui';
import { DropdownMenuTrigger, useForwardProps } from 'reka-ui';

const properties = defineProps<DropdownMenuTriggerProps>();

const forwardedProps = useForwardProps(properties);
</script>

<template>
  <DropdownMenuTrigger
    data-slot="dropdown-menu-trigger"
    v-bind="forwardedProps"
  >
    <slot></slot>
  </DropdownMenuTrigger>
</template>
