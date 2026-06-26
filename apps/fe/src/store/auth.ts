import { defineStore } from 'pinia'
import { ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const loginLoading = ref(false)

  return {
    loginLoading,
  }
})

export { useAuthStore }
