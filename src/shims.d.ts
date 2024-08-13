declare interface Window {
  // extend the window
}

// with vite-plugin-vue-markdown, markdown files can be treated as Vue components
declare module '*.md' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'unplugin-vue-macros/vite'
declare module 'view-ui-plus/dist/locale/*'
declare module 'pro_iview_v3/lib/locales/*'
declare module 'lodash-es'
declare module 'prettier'
declare module 'vue-router/auto-routes'
declare module 'unplugin-vue-router/data-loaders'