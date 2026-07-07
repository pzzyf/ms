<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@ms-core/shared/utils'
import { reactiveOmit } from '@vueuse/core'
import { TabsRoot, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<TabsRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<TabsRootEmits>()

const delegatedProperties = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProperties, emits)
</script>

<template>
  <TabsRoot
    v-slot="slotProps"
    data-slot="tabs"
    v-bind="forwarded"
    :class="cn('flex flex-col gap-2', props.class)"
  >
    <slot v-bind="slotProps"></slot>
  </TabsRoot>
</template>
