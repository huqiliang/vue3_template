import NProgress from 'nprogress'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app, router }) => {
  console.log(router)

  router.beforeEach((to: any, from: any) => {
    if (to.path !== from.path)
      NProgress.start()
  })
  router.afterEach(() => {
    NProgress.done()
  })
}
