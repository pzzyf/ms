<script setup lang="ts">
import type { MsFormSchema } from '@ms/common-ui'
import type { BasicOption } from '@ms/types'
import { AuthenticationLogin, z } from '@ms/common-ui'
import { computed } from 'vue'

const MOCK_USER_OPTIONS: BasicOption[] = [
  {
    label: 'Super',
    value: 'vben',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'User',
    value: 'jack',
  },
]

const formSchema = computed((): MsFormSchema[] => {
  return [
    {
      component: 'MsSelect',
      componentProps: {
        options: MOCK_USER_OPTIONS,
        placeholder: '快速选择账号',
      },
      fieldName: 'selectAccount',
      label: '快速选择账号',
      rules: z
        .string()
        .min(1, { message: '快速选择账号' })
        .optional()
        .default('vben'),
    },
  ]
})
</script>

<template>
  <AuthenticationLogin :form-schema="formSchema" />
</template>

<style scoped>

</style>
