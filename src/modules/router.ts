import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router'
import { isEmpty } from 'lodash-es'
import { type UserModule } from '~/types'
// import { routes } from 'vue-router/auto-routes'
// import { DataLoaderPlugin } from 'unplugin-vue-router/data-loaders'
import { setTabActive } from '~/libs/menu'

// 从 vite-plugin-pages 导入生成的路由
import routes from '~pages'

export const install: UserModule = ({ app }) => {
  const routesLayout = setupLayouts(routes)
  const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: routesLayout,
  })
  router.beforeEach(async (to: any, from, next) => {
    document.title = to.meta.title || '平台'
    const { token } = to.query;
    if (!isEmpty(token))
      localStorage.setItem('token', token)
    next()
  })
  router.afterEach((to) => {
    setTabActive(to);
  })
  // app.use(DataLoaderPlugin, { router })
  app.use(router)
  return router
}

export const step = 1 // 加载中间件顺序
export const name = 'router' // 上下文名称 其他中间件中使用时候的参数名 例:nprogress.ts