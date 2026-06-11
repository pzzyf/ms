import { defineStore } from "pinia";

type UserInfo = {
  homePath: string
}

interface AccessState {
  userInfo: UserInfo | null
}

const useUserStore = defineStore('user', {
  state: (): AccessState => ({
    userInfo: null,
  })
})

export { useUserStore }
