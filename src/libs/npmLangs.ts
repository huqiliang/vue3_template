import zh_iview from 'view-ui-plus/dist/locale/zh-CN'
import zh_pro from 'pro_iview_v3/lib/locales/zh-CN'
import en_iview from 'view-ui-plus/dist/locale/en-US'
import en_pro from 'pro_iview_v3/lib/locales/en-US'
import _ from 'lodash-es'

export default {
  zh: _.assign({}, zh_iview, zh_pro),
  en: _.assign({}, en_iview, en_pro),
}
