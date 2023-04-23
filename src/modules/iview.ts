import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(ViewUIPlus)
}
