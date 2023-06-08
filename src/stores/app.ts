import { acceptHMRUpdate, defineStore } from 'pinia'
import project from '../../project.config.json'

export const userAppStore: any = defineStore('app', () => {
  return {
    appCode: project.appCode,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(userAppStore, import.meta.hot))
