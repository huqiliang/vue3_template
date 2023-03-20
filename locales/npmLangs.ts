import zh_iview from 'view-ui-plus/dist/locale/zh-CN';
import zh_pro from 'pro_iview_v3/lib/locales/zh-CN';
import en_iview from 'view-ui-plus/dist/locale/en-US';
import en_proIview from 'pro_iview_v3/lib/locales/en-US';

export const localLanguage = {
    zh: {
        ...zh_iview,
        ...zh_pro
    },
    en: {
        ...en_iview,
        ...en_proIview
    }
}