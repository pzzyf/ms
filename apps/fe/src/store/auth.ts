import type { Recordable, UserInfo } from '@ms/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const loginLoading = ref(false)

  function authLogin(params: Recordable<any>) {
    const userInfo: null | UserInfo = null
    try {
      loginLoading.value = true
    }
    finally {
      loginLoading.value = false
    }

    // eslint-disable-next-line no-console
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
