/* eslint-disable no-console */
import type { Recordable, UserInfo } from '@ms/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi } from '#/api'

const useAuthStore = defineStore('auth', () => {
  const loginLoading = ref(false)

  async function authLogin(params: Recordable<any>) {
    const userInfo: null | UserInfo = null
    try {
      loginLoading.value = true
      const { accessToken } = await loginApi(params)
      console.log(accessToken, 'accessToken')
    }
    finally {
      loginLoading.value = false
    }

    console.log(params, 'params')

    return {
      userInfo,
    }
  }

  return {
    loginLoading,
    authLogin,
  }
})

export { useAuthStore }
