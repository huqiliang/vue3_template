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

export const step = 0
export const name = 'router'
