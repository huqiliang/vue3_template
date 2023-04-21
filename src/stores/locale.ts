import { acceptHMRUpdate, defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useLocaleStore: any = defineStore('locale', () => {
  const { locale: i18nLocal } = useI18n()
  // 国际化 语言 环境
  const locale: any = ref(i18nLocal)
  // 所支持的语言池  中文 英文
  const localeArray: Array<object> = reactive([
    {
      title: '中文',
      value: 'zh',
    },
    {
      title: '英文',
      value: 'en',
    },
  ])

  const changeLocale = (str: string) => {
    locale.value = str
  }
  // 返回
  return { locale, localeArray, changeLocale }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLocaleStore, import.meta.hot))
