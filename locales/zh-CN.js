import iview from 'view-ui-plus/dist/locale/zh-CN';
import proIview from 'pro_iview_v3/lib/locales/zh-CN';

export default {
  button: {
    go: "开始",
  },
  ...iview,  //包裹在i中 请不要定义字段为i
  ...proIview    //包裹在pro中 请不要定义字段为pro
}