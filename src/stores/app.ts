import { acceptHMRUpdate, defineStore } from 'pinia'
import project from '../../project.config.json'

export const useAppStore: any = defineStore('app', {
  state: () => {
    return {
      appCode: project.appCode,
      tabList: [],
      menuList: []
    }
  },
  actions: {
    setMenuList(menuList: any) {
      this.menuList = menuList
    },
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
