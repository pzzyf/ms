<script setup lang="ts">
import type { SelectScrollDownButtonProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { ChevronDownIcon } from '@lucide/vue';
import { cn } from '@ms-core/shared/utils';
import { reactiveOmit } from '@vueuse/core';
import { SelectScrollDownButton, useForwardProps } from 'reka-ui';

const props = defineProps<
  SelectScrollDownButtonProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProperties = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProperties);
</script>

<template>
  <SelectScrollDownButton
    data-slot="select-scroll-down-button"
    v-bind="forwardedProps"
    :class="
      cn('flex cursor-default items-center justify-center py-1', props.class)
    "
  >
    <slot>
      <ChevronDownIcon class="size-4" />
    </slot>
  </SelectScrollDownButton>
</template>
