import ViewUIPlus from "view-ui-plus";
import ProIview from "pro_iview_v3";
import { type UserModule } from "~/types";
import 'view-ui-plus/dist/styles/viewuiplus.css'

export const install: UserModule = ({ app }) => {
    app.use(ViewUIPlus).use(ProIview);
};
