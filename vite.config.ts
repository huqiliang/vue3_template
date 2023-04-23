import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'

// import Preview from 'vite-plugin-vue-component-preview'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Inspect from 'vite-plugin-inspect'
import Inspector from 'vite-plugin-vue-inspector'
import Unocss from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import removeConsole from 'vite-plugin-remove-console'

import pkg from './package.json'

const prefixDir = `${pkg.name}`

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, `${process.cwd()}/env`)
  return {
    base: `/${prefixDir}`,
    envDir: 'env',
    server: {
      proxy: {
        '/api': {
          target: 'http://192.168.0.137:8890/',
          changeOrigin: true,
          rewrite: (path: any) => path.replace(/^\/api/, ''),
        },
        '/mock': {
          target: 'http://192.168.0.38:3000',
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [
      // Preview(),

      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/],
            reactivityTransform: true,
          }),
        },
      }),
      vueJsx(),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ['vue', 'md'],
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts({
        defaultLayout: env.VITE_LAYOUT,
      }),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n', 'vue/macros', '@vueuse/head', '@vueuse/core'],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/stores'],
        vueTemplate: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'src/components.d.ts',
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),

      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),

      // https://github.com/antfu/vite-plugin-inspect
      // Visit http://localhost:3333/__inspect/ to see the inspector
      Inspect(),

      // https://github.com/webfansplz/vite-plugin-vue-inspector
      Inspector({
        toggleButtonVisibility: 'never',
      }),
      removeConsole(),
    ],
    build: {
      outDir: `dist/${prefixDir}`,
    },
    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
      deps: {
        inline: ['@vue', '@vueuse', 'vue-demi'],
      },
    },
    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ['workbox-window', /vue-i18n/],
    },
  }
})
