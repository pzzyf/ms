<script setup lang="ts">
import type { ToolbarType } from './types'
import { usePreferences } from '@ms/preferences'
import AuthenticationFormView from './form.vue'
import Toolbar from './toolbar.vue'

interface Properties {
  appName?: string
  logo?: string
  toolbar?: boolean
  toolbarList?: ToolbarType[]
}

withDefaults(defineProps<Properties>(), {
  toolbar: true,
  toolbarList: () => ['layout'],
})

const { authPanelCenter } = usePreferences()
</script>

<template>
  <div class="flex min-h-full overflow-x-hidden select-none">
    <template v-if="toolbar">
      <slot name="toolbar">
        <Toolbar :toolbar-list="toolbarList" />
      </slot>
    </template>

    <div v-if="authPanelCenter" class="relative flex-center w-full">
      <div class="login-background absolute top-0 left-0 size-full"></div>
      <AuthenticationFormView
        class="w-full rounded-3xl pb-20 shadow-float shadow-primary/5 md:w-2/3 md:bg-background lg:w-1/2 xl:w-[36%]"
        data-side="bottom"
      />
    </div>
  </div>
</template>

<style scoped>
.login-background {
  background: linear-gradient(
    154deg,
    #07070915 30%,
    hsl(var(--primary) / 30%) 48%,
    #07070915 64%
  );
  filter: blur(100px);
}
</style>
