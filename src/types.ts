import type { App as Application } from 'vue'

export type UserModule = (ctx: { app: Application; router: any }) => void
