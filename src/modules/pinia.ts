import { createPinia } from 'pinia'
import { type UserModule } from '~/types'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const install: UserModule = ({ app }) => {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate) // 持久化插件
  app.use(pinia)
}
