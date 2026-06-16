<script setup lang="ts">
import type { ButtonVariants } from '../../ui'
import type { MsButtonProps } from './button'

import { cn } from '@ms-core/shared/utils'

import { computed, useSlots } from 'vue'

import MsButton from './button.vue'

interface Props extends MsButtonProps {
  class?: any
  disabled?: boolean
  onClick?: () => void
  tooltip?: string
  tooltipDelayDuration?: number
  tooltipSide?: 'bottom' | 'left' | 'right' | 'top'
  variant?: ButtonVariants['variant']
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  onClick: () => {},
  tooltipDelayDuration: 200,
  tooltipSide: 'bottom',
  variant: 'ghost',
})

const slots = useSlots()

const showTooltip = computed(() => !!slots.tooltip || !!props.tooltip)
</script>

<template>
  <MsButton
    v-if="!showTooltip"
    :class="cn('rounded-full', props.class)"
    :disabled="disabled"
    :variant="variant"
    size="icon"
    @click="onClick"
  >
    <slot />
  </MsButton>
</template>
