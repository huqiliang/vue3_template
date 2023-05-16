import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router'
import generatedRoutes from '~pages'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  const routes = setupLayouts(generatedRoutes)
  const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
  })
  app.use(router)
  return router
}

export const step = 0 // 加载中间件顺序
export const name = 'router' // 上下文名称 其他中间件中使用时候的参数名 例:nprogress.ts
