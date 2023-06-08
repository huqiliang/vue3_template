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
import { child_process } from 'vite-plugin-child-process'
import chalk from 'chalk'
import dayjs from 'dayjs'

// import tg from './vite/tg'

import project from './project.config.json'

const prefixDir = project.appCode.includes('$') ? 'appCode' : project.appCode

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, `${process.cwd()}/env`)
  console.log(`${chalk.grey(dayjs().format('HH:MM:DD'))} ${chalk.blue('[环境]')}${chalk.green(` 模式:${env.VITE_MODE} 布局:${env.VITE_LAYOUT}`)}`)
  return {
    base: `/${prefixDir}/`,
    envDir: 'env',
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          // rewrite: (path: any) => path.replace(/^\/api/, ''),
        },
        '/mock': {
          target: env.VITE_BASE_MOCK,
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
      mode === 'production' ? removeConsole() : null,
      // tg(),
      child_process({
        name: 'tg-local-server',
        command: ['node', './vite/tg/app.js'],
        watch: [/vite/],
      }),
    ],
    build: {
      minify: mode !== 'development',
      sourcemap: mode !== 'development',
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
