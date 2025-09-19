import pro_zh_CN from 'pro_iview_v3/lib/locales/zh-CN';
import iview_zh_CN from 'view-ui-plus/dist/locale/zh-CN';
import pro_zh_TW from 'pro_iview_v3/lib/locales/zh-TW';
import iview_zh_TW from 'view-ui-plus/dist/locale/zh-TW';

import project from '../project.config.json';
const appCode = project.appCode.includes('$') ? 'appCode' : project.appCode;
import gc_i18n from 'gc_i18n';
export const languages = [
  {
    code: 'zh-CN',
    name: '简体中文'
  },
  {
    code: 'zh-TW',
    name: '繁体中文'
  }
];
export default {
  install(app, router) {
    const { i18n } = new gc_i18n({
      appCode: `${appCode}`,
      router,
      local: localStorage.getItem('I18N_LANGUAGE'),
      token: localStorage.getItem('I18N_TOKEN'),
      dev: true,
      messages: {
        'zh-CN': { ...pro_zh_CN, ...iview_zh_CN },
        'zh-TW': { ...pro_zh_TW, ...iview_zh_TW }
      }
    });
    app.use(i18n);
  }
};
