<script setup lang="ts">
import type { ToolbarType } from './types'
import Toolbar from './toolbar.vue'

interface Props {
  appName?: string
  logo?: string
  toolbar?: boolean
  toolbarList?: ToolbarType[]
}

withDefaults(defineProps<Props>(), {
  toolbar: true,
  toolbarList: () => ['color', 'language', 'layout', 'theme'],
})
</script>

<template>
  <div class="min-h-full">
    <template v-if="toolbar">
      <slot name="toolbar">
        <Toolbar :toolbar-list="toolbarList" />
      </slot>
    </template>
  </div>
</template>

<style scoped></style>
