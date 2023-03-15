import { createI18n } from 'vue-i18n'
import { type UserModule } from '~/types'

import zh from 'view-ui-plus/dist/locale/zh-CN';
import en from 'view-ui-plus/dist/locale/en-US';
// import zh2 from 'pro_iview_v3/lib/locales/zh-CN';
// console.log(zh2);

// import en2 from 'pro_iview_v3/lib/locales/en-US'
// import zh from "pro_iview_v3/src/"
// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('../../locales/*.y(a)?ml', { eager: true }))
    .map(([key, value]) => {
      const yaml = key.endsWith('.yaml')
      return [key.slice(14, yaml ? -5 : -4), value.default]
    }),
)

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh-CN',
    messages: {
      ...messages,
      "zh-CN": {
        ...zh,
        // ...zh2
      },
      "en-US": {
        ...en,
        // ...en2
      }
    },
  })

  app.use(i18n)
}
