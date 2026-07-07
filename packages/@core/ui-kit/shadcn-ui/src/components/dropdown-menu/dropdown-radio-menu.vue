<script setup lang="ts">
import type { DropdownMenuProps as DropdownMenuProperties } from './interface'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui'

interface Properties extends DropdownMenuProperties {}

withDefaults(defineProps<Properties>(), {})

const modelValue = defineModel<string>()

function handleItemClick(value: string) {
  modelValue.value = value
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child class="flex items-center gap-1">
      <slot></slot>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuGroup>
        <template v-for="menu in menus" :key="menu.value">
          <DropdownMenuItem
            :class="
              menu.value === modelValue
                ? 'bg-accent text-accent-foreground'
                : ''
            "
            class="text-foreground/80 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground mb-1 cursor-pointer"
            @click="handleItemClick(menu.value)"
          >
            <component :is="menu.icon" v-if="menu.icon" class="mr-2 size-4" />
            {{ menu.label }}
          </DropdownMenuItem>
        </template>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
