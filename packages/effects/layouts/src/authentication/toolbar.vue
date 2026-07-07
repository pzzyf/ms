<script setup lang="ts">
import type { ToolbarType } from './types'
import { preferences } from '@ms/preferences'
import { computed } from 'vue'

import {
  AuthenticationColorToggle,
  AuthenticationLanguageToggle,
  AuthenticationLayoutToggle,
  AuthenticationThemeToggle,
} from '../widgets'

interface Properties {
  toolbarList?: ToolbarType[]
}

defineOptions({
  name: 'AuthenticationToolbar',
})

const properties = withDefaults(defineProps<Properties>(), {
  toolbarList: () => ['color', 'language', 'layout', 'theme'],
})

const showColor = computed(() => properties.toolbarList.includes('color'))
const showLanguage = computed(() => properties.toolbarList.includes('language'))
const showLayout = computed(() => properties.toolbarList.includes('layout'))
const showTheme = computed(() => properties.toolbarList.includes('theme'))
</script>

<template>
  <div
    :class="{
      'rounded-3xl px-3 py-1': toolbarList.length > 1,
    }"
    class="absolute top-4 right-2 z-10 flex-center"
  >
    <div class="hidden md:flex">
      <AuthenticationColorToggle v-if="showColor" />
      <AuthenticationLayoutToggle v-if="showLayout" />
    </div>
    <AuthenticationLanguageToggle
      v-if="showLanguage && preferences.widget.languageToggle"
    />
    <AuthenticationThemeToggle
      v-if="showTheme && preferences.widget.themeToggle"
    />
  </div>
</template>

<style scoped></style>
