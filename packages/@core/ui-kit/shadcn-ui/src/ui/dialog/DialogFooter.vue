<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@ms-core/shadcn-ui/ui/button'
import { cn } from '@ms-core/shared/utils'
import { DialogClose } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    showCloseButton?: boolean
  }>(),
  {
    showCloseButton: false,
  },
)
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="
      cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', props.class)
    "
  >
    <slot></slot>
    <DialogClose v-if="showCloseButton" as-child>
      <Button variant="outline"> Close </Button>
    </DialogClose>
  </div>
</template>
