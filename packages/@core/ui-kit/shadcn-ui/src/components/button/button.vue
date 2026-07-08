<script setup lang="ts">
import type { MsButtonProps as MsButtonProperties } from './button';

import { LoaderCircle } from '@ms-core/icons';

import { cn } from '@ms-core/shared/utils';
import { Primitive } from 'reka-ui';

import { computed } from 'vue';

import { buttonVariants } from '../../ui';

interface Properties extends MsButtonProperties {}

const props = withDefaults(defineProps<Properties>(), {
  as: 'button',
  class: '',
  disabled: false,
  loading: false,
  size: 'default',
  variant: 'default',
});

const isDisabled = computed(() => {
  return props.disabled || props.loading;
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="isDisabled"
  >
    <LoaderCircle
      v-if="loading"
      class="text-md mr-2 size-4 shrink-0 animate-spin"
    />
    <slot></slot>
  </Primitive>
</template>
