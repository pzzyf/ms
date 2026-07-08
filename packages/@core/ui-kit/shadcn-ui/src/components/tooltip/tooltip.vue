<script setup lang="ts">
import type { ClassType } from '@ms-core/typings';

import type { TooltipContentProps } from 'reka-ui';

import type { StyleValue } from 'vue';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui';

interface Properties {
  contentClass?: ClassType;
  contentStyle?: StyleValue;
  delayDuration?: number;
  side?: TooltipContentProps['side'];
}

withDefaults(defineProps<Properties>(), {
  delayDuration: 0,
  side: 'right',
});
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration">
    <Tooltip>
      <TooltipTrigger as-child tabindex="-1">
        <slot name="trigger"></slot>
      </TooltipTrigger>
      <TooltipContent
        :class="contentClass"
        :side="side"
        :style="contentStyle"
        class="side-content bg-accent text-popover-foreground rounded-md"
      >
        <slot></slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
