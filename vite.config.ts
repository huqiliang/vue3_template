import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'

// import Preview from 'vite-plugin-vue-component-preview'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Unocss from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import removeConsole from 'vite-plugin-remove-console'
import { child_process } from 'vite-plugin-child-process'
// import VueRouter from 'unplugin-vue-router/vite'
// import { VueRouterAutoImports } from 'unplugin-vue-router'
import vitePluginsAutoI18n from "vite-gc-i18n-plugin";
import chalk from 'chalk'
import dayjs from 'dayjs'
import _ from "lodash-es"

import project from './project.config.json'

const appCode = project.appCode.includes('$') ? 'appCode' : project.appCode

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, `${process.cwd()}/env`)
  console.log(`${chalk.grey(dayjs().format('HH:MM:DD'))} ${chalk.blue('[环境]')}${chalk.green(` 模式:${mode} 布局:${env.VITE_LAYOUT}`)}`)

  const nativePlugins = mode === "native" ? [VueDevTools(), child_process({
    name: 'tg-local-server',
    command: ['node', './vite/tg/app.js'],
    watch: ['vite/tg/*'],
  })] : [];

  const productionPlugins = mode === 'production' ? [removeConsole()] : [];

  return {
    base: `/${appCode}/`,
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
      // https://github.com/posva/unplugin-vue-router
      // VueRouter({
      //   extensions: ['.vue'],
      //   dts: false,
      //   // 自动加入name
      //   // 自定义路由名称生成规则
      //   getRouteName: (node) => {
      //     // 从节点路径中提取页面名称（忽略布局目录）
      //     const pathSegments = node.path.split('/').filter(Boolean)
      //     // 排除布局相关的路径片段（如 'layouts'）
      //     const pageSegments = pathSegments.filter(seg => !seg.includes('layout'))
      //
      //     // 如果是根路径，返回 'home'
      //     if (pageSegments.length === 0) {
      //       return 'home'
      //     }
      //
      //     // 生成 PascalCase 名称
      //     const name = pageSegments.map(seg => seg.charAt(0).toUpperCase() + seg.slice(1)).join('')
      //
      //     // 确保名称不为空
      //     return name || 'home'
      //   }
      // }),

      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/],
            // reactivityTransform: true,
          }),
        },
      }),
      vueJsx(),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ['vue'],
        routeNameSeparator: '-'
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts({
        defaultLayout: env.VITE_LAYOUT,
      }),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        // imports: ['vue', 'vue-router', VueRouterAutoImports, 'vue-i18n', 'vue/macros', '@vueuse/head', '@vueuse/core'],
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
      ...nativePlugins, // 本地插件
      ...productionPlugins,
      vitePluginsAutoI18n({
        appCode, // 第三步中生成的语言由此 appCode+GREENCLOUD 决定，应用代码为UC应用code,如果不是uc应用，请联系管理
        excludedPath: ["node_modules", "README"] //排除不需要扫描的路径,如果启动保存，特殊情况配置
      })
    ],
    build: {
      minify: mode !== 'development',
      sourcemap: mode === 'development',
      outDir: `dist/${appCode}`,
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