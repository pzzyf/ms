<script setup lang="ts">
import type { AccordionItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@ms-core/shared/utils';
import { reactiveOmit } from '@vueuse/core';
import { AccordionItem, useForwardProps } from 'reka-ui';

const props = defineProps<
  AccordionItemProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProperties = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProperties);
</script>

<template>
  <AccordionItem
    v-slot="slotProps"
    data-slot="accordion-item"
    v-bind="forwardedProps"
    :class="cn('border-b last:border-b-0', props.class)"
  >
    <slot v-bind="slotProps"></slot>
  </AccordionItem>
</template>
