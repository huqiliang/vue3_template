import ProIview from 'pro_iview_v3'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(ProIview)
}
