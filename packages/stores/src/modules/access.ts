import { defineStore } from 'pinia'

type AccessToken = string | null

interface AccessState {
  accessToken: AccessToken
}

const useAccessStore = defineStore('core-access', {
  state: (): AccessState => ({
    accessToken: null,
  }),
})

export { useAccessStore }
