import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore: any = defineStore('user', () => {
  /**
   *   default user.
   */
  const user = ref({
    orgCode: "GCBZG",
    orgName: "绿云标准版酒店",
    userCode: "GCBZG_ADMIN",
    userName: "管理员",
  })


  /**
   * 修改用户
   *
   * @param user - new user to set
   */
  function setUser(user: Object) {
    user = user;
  }

  return {
    user,
    setUser
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
