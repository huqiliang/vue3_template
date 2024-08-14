import { acceptHMRUpdate, defineStore } from 'pinia'
import project from '../../project.config.json'

export const useAppStore: any = defineStore('app', {
  state: () => {
    return {
      appCode: project.appCode,
      tabList: [],
    }
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
