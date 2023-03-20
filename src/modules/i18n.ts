import { createI18n } from 'vue-i18n'
import { type UserModule } from '~/types'
import _ from "lodash-es"

import iviewEn from 'view-ui-plus/dist/locale/en-US';
import proEn from 'pro_iview_v3/lib/locales/en-US';

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('../../locales/*.js', { eager: true }))
    .map(([key, value]) => {
      console.log(key, value);
      return [key.slice(14, -3), value.default]
      // const yaml = key.endsWith('.yaml')
      // return [key.slice(14, yaml ? -5 : -4), value.default]
    }),
)

export const install: UserModule = ({ app }) => {
  console.log(messages);

  const i18n = createI18n({
    legacy: false,
    locale: 'zh-CN',
    messages
  })

  app.use(i18n)
}
