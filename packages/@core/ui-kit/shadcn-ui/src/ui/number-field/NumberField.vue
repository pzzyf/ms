<script setup lang="ts">
import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@ms-core/shared/utils';
import { reactiveOmit } from '@vueuse/core';
import { NumberFieldRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<
  NumberFieldRootProps & { class?: HTMLAttributes['class'] }
>();
const emits = defineEmits<NumberFieldRootEmits>();

const delegatedProperties = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProperties, emits);
</script>

<template>
  <NumberFieldRoot
    v-slot="slotProps"
    v-bind="forwarded"
    :class="cn('grid gap-1.5', props.class)"
  >
    <slot v-bind="slotProps"></slot>
  </NumberFieldRoot>
</template>
