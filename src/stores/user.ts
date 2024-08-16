import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore: any = defineStore('user', {


  state: () => {

    return {
      user: {
        orgCode: "GCBZG",
        orgName: "绿云标准版酒店",
        userCode: "GCBZG_ADMIN",
        userName: "管理员",
      }

    }
  },
  actions: {
    setUser(user: any) {
      this.user = user;
    }
  }

})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
