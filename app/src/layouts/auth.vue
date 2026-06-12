<script setup lang="ts">
import { AuthPageLayout } from '@ms/layouts'

import { preferences } from '@ms/preferences'
import { computed } from 'vue'

const appName = computed(() => preferences.app.name)
const logo = computed(() => preferences.logo.source)
</script>

<template>
  <div>
    <AuthPageLayout
      :app-name="appName"
      :logo="logo"
    />
  </div>
</template>

<style scoped></style>
