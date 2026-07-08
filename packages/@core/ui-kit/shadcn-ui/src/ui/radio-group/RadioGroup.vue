<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@ms-core/shared/utils';
import { reactiveOmit } from '@vueuse/core';
import { RadioGroupRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<
  RadioGroupRootProps & { class?: HTMLAttributes['class'] }
>();
const emits = defineEmits<RadioGroupRootEmits>();

const delegatedProperties = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProperties, emits);
</script>

<template>
  <RadioGroupRoot
    v-slot="slotProps"
    data-slot="radio-group"
    :class="cn('grid gap-3', props.class)"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps"></slot>
  </RadioGroupRoot>
</template>
