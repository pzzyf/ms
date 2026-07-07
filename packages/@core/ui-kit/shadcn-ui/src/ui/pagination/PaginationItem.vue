<script setup lang="ts">
import type { ButtonVariants } from '@ms-core/shadcn-ui/ui/button'
import type { PaginationListItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { buttonVariants } from '@ms-core/shadcn-ui/ui/button'
import { cn } from '@ms-core/shared/utils'
import { reactiveOmit } from '@vueuse/core'
import { PaginationListItem } from 'reka-ui'

const props = withDefaults(
  defineProps<
    PaginationListItemProps & {
      size?: ButtonVariants['size']
      class?: HTMLAttributes['class']
      isActive?: boolean
    }
  >(),
  {
    size: 'icon',
  },
)

const delegatedProps = reactiveOmit(props, 'class', 'size', 'isActive', 'value')
</script>

<template>
  <PaginationListItem
    data-slot="pagination-item"
    :value="value"
    v-bind="delegatedProps"
    :class="
      cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        props.class,
      )
    "
  >
    <slot></slot>
  </PaginationListItem>
</template>
