import iview from 'view-ui-plus/dist/locale/en-US';
import proIview from 'pro_iview_v3/lib/locales/en-US';

export default {
  button: {
    go: "go",
  },
  ...iview,  //包裹在i中 请不要定义字段为i
  ...proIview    //包裹在pro中 请不要定义字段为pro
}