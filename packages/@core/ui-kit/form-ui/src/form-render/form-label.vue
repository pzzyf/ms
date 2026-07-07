<script setup lang="ts">
import type { CustomRenderType } from '../types'

import { FormLabel, MsRenderContent } from '@ms-core/shadcn-ui'
import { cn } from '@ms-core/shared/utils'

interface Properties {
  class?: string
  colon?: boolean
  help?: CustomRenderType
  label?: CustomRenderType
  required?: boolean
}

const props = defineProps<Properties>()
</script>

<template>
  <FormLabel :class="cn('flex items-center', props.class)">
    <span v-if="required" class="mr-[2px] text-destructive">*</span>
    <slot></slot>
    <MsRenderContent :content="help" />
    <span v-if="colon && label" class="ml-[2px]">:</span>
  </FormLabel>
</template>
