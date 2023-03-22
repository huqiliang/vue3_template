import { createI18n } from 'vue-i18n'
import _ from 'lodash-es'
import { localLanguage } from '../../locales/npmLangs'
import { type UserModule } from '~/types'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('../../locales/*.json', { eager: true }))
    .map(([key, value]) => {
      let realValue = value.default
      const lang = key.slice(14, -5)
      if (_.has(localLanguage, lang))
        realValue = _.assign({}, _.get(localLanguage, lang), value.default)

      return [lang, realValue]
    }),
)

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    messages,
  })
  app.use(i18n)
}
