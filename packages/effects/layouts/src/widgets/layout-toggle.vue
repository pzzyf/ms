<script setup lang="ts">
import { MsDropdownRadioMenu, MsIconButton } from '@ms-core/shadcn-ui'
import { InspectionPanel, PanelLeft, PanelRight } from '@ms/icons'
import { preferences } from '@ms/preferences'
import { computed } from 'vue'

defineOptions({
  name: 'AuthenticationLayoutToggle',
})

const authPanelRight = computed(() => preferences.app.authPageLayout === 'panel-right')
const authPanelLeft = computed(() => preferences.app.authPageLayout === 'panel-left')
const authPanelCenter = computed(() => preferences.app.authPageLayout === 'panel-center')
</script>

<template>
  <MsDropdownRadioMenu>
    <MsIconButton>
      <PanelRight v-if="authPanelRight" class="size-4" />
      <PanelLeft v-if="authPanelLeft" class="size-4" />
      <InspectionPanel v-if="authPanelCenter" class="size-4" />
    </MsIconButton>
  </MsDropdownRadioMenu>
</template>
