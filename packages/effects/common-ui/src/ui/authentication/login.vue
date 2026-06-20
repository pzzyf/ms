<script setup lang="ts">
import type { AuthenticationProps } from './types'
import { useMsForm } from '@ms-core/form-ui'

import Title from './auth-title.vue'

interface Props extends AuthenticationProps {}

withDefaults(defineProps<Props>(), {
  title: '',
  subTitle: '',
})

function handleSubmit() {}

const [Form] = useMsForm()
</script>

<template>
  <div @keydown.enter.prevent="handleSubmit">
    <slot name="title">
      <Title>
        <slot name="title">
          {{ title || `欢迎回来 👋🏻` }}
        </slot>
        <template #desc>
          <span class="text-muted-foreground">
            <slot name="subTitle">
              {{ subTitle || '请输入您的账户信息以开始管理您的项目' }}
            </slot>
          </span>
        </template>
      </Title>
    </slot>

    <Form />
  </div>
</template>

<style scoped>

</style>
