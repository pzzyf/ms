import { defineStore } from 'pinia'

type AccessToken = string | null

interface AccessState {
  /**
   * 权限码
   */
  accessCodes: string[]
  /**
   * 登录 accessToken
   */
  accessToken: AccessToken
  loginExpired: boolean
}

const useAccessStore = defineStore('core-access', {
  actions: {
    setAccessToken(token: AccessToken) {
      this.accessToken = token
    },
    setAccessCodes(codes: string[]) {
      this.accessCodes = codes
    },
    setLoginExpired(loginExpired: boolean) {
      this.loginExpired = loginExpired
    },
  },
  state: (): AccessState => ({
    accessToken: null,
    accessCodes: [],
    loginExpired: false,
  }),
})

export { useAccessStore }
