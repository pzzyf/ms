<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { EllipsisIcon } from '@lucide/vue';
import { cn } from '@ms-core/shared/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <span
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    aria-hidden="true"
    :class="cn('flex size-9 items-center justify-center', props.class)"
  >
    <slot>
      <EllipsisIcon class="size-4" />
    </slot>
    <span class="sr-only">More</span>
  </span>
</template>
