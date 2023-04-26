import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { type UserModule } from '~/types'

export const install: UserModule = ({ router }) => {
  router.beforeEach((to: any, from: any) => {
    if (to.path !== from.path)
      NProgress.start()
  })
  router.afterEach(() => {
    NProgress.done()
  })
}
