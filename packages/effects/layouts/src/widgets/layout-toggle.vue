<script setup lang="ts">
import { MsDropdownRadioMenu, MsIconButton } from '@ms-core/shadcn-ui'
import { InspectionPanel, PanelLeft, PanelRight } from '@ms/icons'
import { usePreferences } from '@ms/preferences'

defineOptions({
  name: 'AuthenticationLayoutToggle',
})

const { authPanelRight, authPanelLeft, authPanelCenter } = usePreferences()
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
