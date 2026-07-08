<script setup lang="ts">
import type { ButtonVariants } from '@ms-core/shadcn-ui/ui/button';
import type { PaginationNextProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { ChevronRightIcon } from '@lucide/vue';
import { buttonVariants } from '@ms-core/shadcn-ui/ui/button';
import { cn } from '@ms-core/shared/utils';
import { reactiveOmit } from '@vueuse/core';
import { PaginationNext, useForwardProps } from 'reka-ui';

const props = withDefaults(
  defineProps<
    PaginationNextProps & {
      size?: ButtonVariants['size'];
      class?: HTMLAttributes['class'];
    }
  >(),
  {
    size: 'default',
  },
);

const delegatedProperties = reactiveOmit(props, 'class', 'size');
const forwarded = useForwardProps(delegatedProperties);
</script>

<template>
  <PaginationNext
    data-slot="pagination-next"
    :class="
      cn(
        buttonVariants({ variant: 'ghost', size }),
        'gap-1 px-2.5 sm:pr-2.5',
        props.class,
      )
    "
    v-bind="forwarded"
  >
    <slot>
      <span class="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </slot>
  </PaginationNext>
</template>
