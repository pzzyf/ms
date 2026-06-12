<script setup lang="ts">
import type { ToolbarType } from './types'

interface Props {
  toolbarList?: ToolbarType[]
}

defineOptions({
  name: 'AuthenticationToolbar',
})

withDefaults(defineProps<Props>(), {
  toolbarList: () => [],
})
</script>

<template>
  <div v-for="item in toolbarList" :key="item" class="min-h-full">
    {{ item }}
  </div>
</template>

<style scoped></style>
