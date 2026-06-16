<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '../../ui'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child class="flex items-center gap-1">
      <slot />
    </DropdownMenuTrigger>
  </DropdownMenu>
</template>
