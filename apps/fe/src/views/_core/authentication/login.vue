<script setup lang="ts">
import type { MsFormSchema } from '@ms/common-ui'
import type { BasicOption } from '@ms/types'
import { AuthenticationLogin, z } from '@ms/common-ui'
import { computed, markRaw } from 'vue'
import { useAuthStore } from '#/store/auth'

const MOCK_USER_OPTIONS: BasicOption[] = [
  {
    label: 'Super',
    value: 'ms',
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
      rules: markRaw(
        z.string().min(1, { message: '快速选择账号' }).optional().default('ms'),
      ),
    },
    {
      component: 'MsInput',
      componentProps: {
        placeholder: '快速选择账号',
      },
      dependencies: {
        trigger(values, form) {
          if (!values.selectAccount) {
            return
          }

          const findUser = MOCK_USER_OPTIONS.find(
            (item) => item.value === values.selectAccount,
          )
          if (findUser) {
            form.setValues({
              password: '123456',
              username: findUser.value,
            })
          }
        },
        triggerFields: ['selectAccount'],
      },
      fieldName: 'username',
      label: '名称',
      rules: z.string().min(1, { message: '快速选择账号' }),
    },
    {
      component: 'MsInputPassword',
      componentProps: {
        placeholder: '密码',
      },
      fieldName: 'password',
      label: '密码',
      rules: z.string().min(1, { message: '请输入密码' }),
    },
  ]
})

const authStore = useAuthStore()
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="authStore.authLogin"
  />
</template>

<style scoped></style>
