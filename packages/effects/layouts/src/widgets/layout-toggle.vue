<script setup lang="ts">
import type { MsDropdownMenuItem } from '@ms-core/shadcn-ui'
import type { AuthPageLayoutType } from '@ms/types'
// import type { AuthPageLayoutType } from '@ms-core/typings'
import { MsDropdownRadioMenu, MsIconButton } from '@ms-core/shadcn-ui'
import { InspectionPanel, PanelLeft, PanelRight } from '@ms/icons'
import { preferences, updatePreferences, usePreferences } from '@ms/preferences'
import { computed } from 'vue'

defineOptions({
  name: 'AuthenticationLayoutToggle',
})

const { authPanelRight, authPanelLeft, authPanelCenter } = usePreferences()

function handleUpdate(value: string | undefined): any {
  if (!value)
    return
  updatePreferences({
    app: {
      authPageLayout: value as AuthPageLayoutType,
    },
  })
}

const menus = computed((): MsDropdownMenuItem[] => [
  {
    icon: PanelLeft,
    label: '居左',
    value: 'panel-left',
  },
  {
    icon: InspectionPanel,
    label: '居中',
    value: 'panel-center',
  },
  {
    icon: PanelRight,
    label: '居右',
    value: 'panel-right',
  },
])
</script>

<template>
  <MsDropdownRadioMenu :menus="menus" :model-value="preferences.app.authPageLayout" @update:model-value="handleUpdate">
    <MsIconButton>
      <PanelRight v-if="authPanelRight" class="size-4" />
      <PanelLeft v-if="authPanelLeft" class="size-4" />
      <InspectionPanel v-if="authPanelCenter" class="size-4" />
    </MsIconButton>
  </MsDropdownRadioMenu>
</template>
