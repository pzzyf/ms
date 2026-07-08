<script setup lang="ts" generic="Type extends 'text' | 'number' = 'text'">
import type { PinInputRootEmits, PinInputRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@ms-core/shared/utils';
import { reactiveOmit } from '@vueuse/core';
import { PinInputRoot, useForwardPropsEmits } from 'reka-ui';

const props = withDefaults(
  defineProps<PinInputRootProps<Type> & { class?: HTMLAttributes['class'] }>(),
  {
    otp: true,
  },
);
const emits = defineEmits<PinInputRootEmits<Type>>();

const delegatedProperties = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProperties, emits);
</script>

<template>
  <PinInputRoot
    :otp="props.otp"
    data-slot="pin-input"
    v-bind="forwarded"
    :class="
      cn(
        'flex items-center gap-2 disabled:cursor-not-allowed has-disabled:opacity-50',
        props.class,
      )
    "
  >
    <slot></slot>
  </PinInputRoot>
</template>
