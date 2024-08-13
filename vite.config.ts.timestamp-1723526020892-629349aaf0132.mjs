// vite.config.ts
import path from "node:path";
import { defineConfig, loadEnv } from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/vite@5.3.1_less@4.2.0/node_modules/vite/dist/node/index.js";
import Vue from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.3.1+vue@3.4.30/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Layouts from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/vite-plugin-vue-layouts@0.11.0_4hqwcskecm6blrics5mms2fvce/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Components from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.30/node_modules/unplugin-vue-components/dist/vite.js";
import AutoImport from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/unplugin-auto-import@0.17.6_@vueuse+core@10.11.0/node_modules/unplugin-auto-import/dist/vite.js";
import VueI18n from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/@intlify+unplugin-vue-i18n@2.0.0_vue-i18n@9.13.1/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import VueDevTools from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.7_vite@5.3.1+vue@3.4.30/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import Unocss from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/unocss@0.58.9_vite@5.3.1/node_modules/unocss/dist/vite.mjs";
import VueMacros from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/unplugin-vue-macros@2.9.5_o644jcv2owrxrfz6eo5o3inweu/node_modules/unplugin-vue-macros/dist/vite.mjs";
import vueJsx from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.3.1+vue@3.4.30/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import removeConsole from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/vite-plugin-remove-console@2.2.0/node_modules/vite-plugin-remove-console/dist/index.mjs";
import { child_process } from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/vite-plugin-child-process@1.0.6/node_modules/vite-plugin-child-process/dist/vite-plugin-child-process.js";
import VueRouter from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/unplugin-vue-router@0.10.2_kcbv6gmdscus6d5uhrijy35tem/node_modules/unplugin-vue-router/dist/vite.js";
import { VueRouterAutoImports } from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/unplugin-vue-router@0.10.2_kcbv6gmdscus6d5uhrijy35tem/node_modules/unplugin-vue-router/dist/index.js";
import chalk from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/chalk@5.3.0/node_modules/chalk/source/index.js";
import dayjs from "file:///Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main/node_modules/.pnpm/dayjs@1.11.7/node_modules/dayjs/dayjs.min.js";

// project.config.json
var project_config_default = {
  appCode: "${appCode}",
  hideSystemMenu: false,
  childPort: 8989,
  tg: {
    open: true,
    server: "http://192.168.0.85:8989",
    jwt: "",
    project_id: ""
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/huqiliang/Documents/lvyun/my-vitesse-app/vitesse-main";
var prefixDir = project_config_default.appCode.includes("$") ? "appCode" : project_config_default.appCode;
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, `${process.cwd()}/env`);
  console.log(`${chalk.grey(dayjs().format("HH:MM:DD"))} ${chalk.blue("[\u73AF\u5883]")}${chalk.green(` \u6A21\u5F0F:${mode} \u5E03\u5C40:${env.VITE_LAYOUT}`)}`);
  const nativePlugins = mode === "native" ? [VueDevTools(), child_process({
    name: "tg-local-server",
    command: ["node", "./vite/tg/app.js"],
    watch: ["vite/tg/*"]
  })] : [];
  const productionPlugins = mode === "production" ? [removeConsole()] : [];
  return {
    base: `/${prefixDir}/`,
    envDir: "env",
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BASE_URL,
          changeOrigin: true
          // rewrite: (path: any) => path.replace(/^\/api/, ''),
        },
        "/mock": {
          target: env.VITE_BASE_MOCK,
          changeOrigin: true
        }
      }
      // watch: {
      //   ignored: ['**/project.config.json'], // 忽略对project.config.json的监听
      // },
    },
    resolve: {
      alias: {
        "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
      }
    },
    plugins: [
      // Preview(),
      // https://github.com/posva/unplugin-vue-router
      VueRouter({
        extensions: [".vue"],
        dts: false
      }),
      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/]
            // reactivityTransform: true,
          })
        }
      }),
      vueJsx(),
      // https://github.com/hannoeru/vite-plugin-pages
      // Pages({
      //   extensions: ['vue'],
      // }),
      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts({
        defaultLayout: env.VITE_LAYOUT
      }),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ["vue", "vue-router", VueRouterAutoImports, "vue-i18n", "vue/macros", "@vueuse/head", "@vueuse/core"],
        dts: "src/auto-imports.d.ts",
        dirs: ["src/stores"],
        vueTemplate: true
      }),
      // https://github.com/antfu/unplugin-vue-components
      Components({
        extensions: ["vue"],
        include: [/\.vue$/, /\.vue\?vue/],
        dts: "src/components.d.ts"
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),
      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__vite_injected_original_dirname, "locales/**")]
      }),
      ...nativePlugins,
      // 本地插件
      ...productionPlugins
    ],
    build: {
      minify: mode !== "development",
      sourcemap: mode === "development",
      outDir: `dist/${prefixDir}`
    },
    // https://github.com/vitest-dev/vitest
    test: {
      include: ["test/**/*.test.ts"],
      environment: "jsdom",
      deps: {
        inline: ["@vue", "@vueuse", "vue-demi"]
      }
    },
    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ["workbox-window", /vue-i18n/]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicHJvamVjdC5jb25maWcuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9odXFpbGlhbmcvRG9jdW1lbnRzL2x2eXVuL215LXZpdGVzc2UtYXBwL3ZpdGVzc2UtbWFpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2h1cWlsaWFuZy9Eb2N1bWVudHMvbHZ5dW4vbXktdml0ZXNzZS1hcHAvdml0ZXNzZS1tYWluL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9odXFpbGlhbmcvRG9jdW1lbnRzL2x2eXVuL215LXZpdGVzc2UtYXBwL3ZpdGVzc2UtbWFpbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXG5cbi8vIGltcG9ydCBQcmV2aWV3IGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1jb21wb25lbnQtcHJldmlldydcbmltcG9ydCBWdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuLy8gaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBWdWVJMThuIGZyb20gJ0BpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuL3ZpdGUnXG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCBWdWVNYWNyb3MgZnJvbSAndW5wbHVnaW4tdnVlLW1hY3Jvcy92aXRlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHJlbW92ZUNvbnNvbGUgZnJvbSAndml0ZS1wbHVnaW4tcmVtb3ZlLWNvbnNvbGUnXG5pbXBvcnQgeyBjaGlsZF9wcm9jZXNzIH0gZnJvbSAndml0ZS1wbHVnaW4tY2hpbGQtcHJvY2VzcydcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlci92aXRlJ1xuaW1wb3J0IHsgVnVlUm91dGVyQXV0b0ltcG9ydHMgfSBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyJ1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xuaW1wb3J0IF8gZnJvbSBcImxvZGFzaC1lc1wiXG5cbmltcG9ydCBwcm9qZWN0IGZyb20gJy4vcHJvamVjdC5jb25maWcuanNvbidcblxuY29uc3QgcHJlZml4RGlyID0gcHJvamVjdC5hcHBDb2RlLmluY2x1ZGVzKCckJykgPyAnYXBwQ29kZScgOiBwcm9qZWN0LmFwcENvZGVcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIGAke3Byb2Nlc3MuY3dkKCl9L2VudmApXG4gIGNvbnNvbGUubG9nKGAke2NoYWxrLmdyZXkoZGF5anMoKS5mb3JtYXQoJ0hIOk1NOkREJykpfSAke2NoYWxrLmJsdWUoJ1tcdTczQUZcdTU4ODNdJyl9JHtjaGFsay5ncmVlbihgIFx1NkEyMVx1NUYwRjoke21vZGV9IFx1NUUwM1x1NUM0MDoke2Vudi5WSVRFX0xBWU9VVH1gKX1gKVxuXG4gIGNvbnN0IG5hdGl2ZVBsdWdpbnMgPSBtb2RlID09PSBcIm5hdGl2ZVwiID8gW1Z1ZURldlRvb2xzKCksIGNoaWxkX3Byb2Nlc3Moe1xuICAgIG5hbWU6ICd0Zy1sb2NhbC1zZXJ2ZXInLFxuICAgIGNvbW1hbmQ6IFsnbm9kZScsICcuL3ZpdGUvdGcvYXBwLmpzJ10sXG4gICAgd2F0Y2g6IFsndml0ZS90Zy8qJ10sXG4gIH0pXSA6IFtdO1xuXG4gIGNvbnN0IHByb2R1Y3Rpb25QbHVnaW5zID0gbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gW3JlbW92ZUNvbnNvbGUoKV0gOiBbXTtcblxuICByZXR1cm4ge1xuICAgIGJhc2U6IGAvJHtwcmVmaXhEaXJ9L2AsXG4gICAgZW52RGlyOiAnZW52JyxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHByb3h5OiB7XG4gICAgICAgICcvYXBpJzoge1xuICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfQkFTRV9VUkwsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIC8vIHJld3JpdGU6IChwYXRoOiBhbnkpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcbiAgICAgICAgfSxcbiAgICAgICAgJy9tb2NrJzoge1xuICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfQkFTRV9NT0NLLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAvLyB3YXRjaDoge1xuICAgICAgLy8gICBpZ25vcmVkOiBbJyoqL3Byb2plY3QuY29uZmlnLmpzb24nXSwgLy8gXHU1RkZEXHU3NTY1XHU1QkY5cHJvamVjdC5jb25maWcuanNvblx1NzY4NFx1NzZEMVx1NTQyQ1xuICAgICAgLy8gfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICd+Lyc6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKX0vYCxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIHBsdWdpbnM6IFtcbiAgICAgIC8vIFByZXZpZXcoKSxcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3N2YS91bnBsdWdpbi12dWUtcm91dGVyXG4gICAgICBWdWVSb3V0ZXIoe1xuICAgICAgICBleHRlbnNpb25zOiBbJy52dWUnXSxcbiAgICAgICAgZHRzOiBmYWxzZSxcbiAgICAgIH0pLFxuXG4gICAgICBWdWVNYWNyb3Moe1xuICAgICAgICBwbHVnaW5zOiB7XG4gICAgICAgICAgdnVlOiBWdWUoe1xuICAgICAgICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLFxuICAgICAgICAgICAgLy8gcmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgdnVlSnN4KCksXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vaGFubm9lcnUvdml0ZS1wbHVnaW4tcGFnZXNcbiAgICAgIC8vIFBhZ2VzKHtcbiAgICAgIC8vICAgZXh0ZW5zaW9uczogWyd2dWUnXSxcbiAgICAgIC8vIH0pLFxuXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vSm9obkNhbXBpb25Kci92aXRlLXBsdWdpbi12dWUtbGF5b3V0c1xuICAgICAgTGF5b3V0cyh7XG4gICAgICAgIGRlZmF1bHRMYXlvdXQ6IGVudi5WSVRFX0xBWU9VVCxcbiAgICAgIH0pLFxuXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tYXV0by1pbXBvcnRcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgVnVlUm91dGVyQXV0b0ltcG9ydHMsICd2dWUtaTE4bicsICd2dWUvbWFjcm9zJywgJ0B2dWV1c2UvaGVhZCcsICdAdnVldXNlL2NvcmUnXSxcbiAgICAgICAgZHRzOiAnc3JjL2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICAgICAgZGlyczogWydzcmMvc3RvcmVzJ10sXG4gICAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgICAgfSksXG5cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50c1xuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIGV4dGVuc2lvbnM6IFsndnVlJ10sXG4gICAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvXSxcbiAgICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXG4gICAgICB9KSxcblxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3Vub2Nzc1xuICAgICAgLy8gc2VlIHVub2Nzcy5jb25maWcudHMgZm9yIGNvbmZpZ1xuICAgICAgVW5vY3NzKCksXG5cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9pbnRsaWZ5L2J1bmRsZS10b29scy90cmVlL21haW4vcGFja2FnZXMvdW5wbHVnaW4tdnVlLWkxOG5cbiAgICAgIFZ1ZUkxOG4oe1xuICAgICAgICBydW50aW1lT25seTogdHJ1ZSxcbiAgICAgICAgY29tcG9zaXRpb25Pbmx5OiB0cnVlLFxuICAgICAgICBmdWxsSW5zdGFsbDogdHJ1ZSxcbiAgICAgICAgaW5jbHVkZTogW3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdsb2NhbGVzLyoqJyldLFxuICAgICAgfSksXG4gICAgICAuLi5uYXRpdmVQbHVnaW5zLCAvLyBcdTY3MkNcdTU3MzBcdTYzRDJcdTRFRjZcbiAgICAgIC4uLnByb2R1Y3Rpb25QbHVnaW5zLFxuICAgIF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIG1pbmlmeTogbW9kZSAhPT0gJ2RldmVsb3BtZW50JyxcbiAgICAgIHNvdXJjZW1hcDogbW9kZSA9PT0gJ2RldmVsb3BtZW50JyxcbiAgICAgIG91dERpcjogYGRpc3QvJHtwcmVmaXhEaXJ9YCxcbiAgICB9LFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlc3QtZGV2L3ZpdGVzdFxuICAgIHRlc3Q6IHtcbiAgICAgIGluY2x1ZGU6IFsndGVzdC8qKi8qLnRlc3QudHMnXSxcbiAgICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgICAgZGVwczoge1xuICAgICAgICBpbmxpbmU6IFsnQHZ1ZScsICdAdnVldXNlJywgJ3Z1ZS1kZW1pJ10sXG4gICAgICB9LFxuICAgIH0sXG4gICAgc3NyOiB7XG4gICAgICAvLyBUT0RPOiB3b3JrYXJvdW5kIHVudGlsIHRoZXkgc3VwcG9ydCBuYXRpdmUgRVNNXG4gICAgICBub0V4dGVybmFsOiBbJ3dvcmtib3gtd2luZG93JywgL3Z1ZS1pMThuL10sXG4gICAgfSxcbiAgfVxufSlcbiIsICJ7XG4gIFwiYXBwQ29kZVwiOiBcIiR7YXBwQ29kZX1cIixcbiAgXCJoaWRlU3lzdGVtTWVudVwiOiBmYWxzZSxcbiAgXCJjaGlsZFBvcnRcIjogODk4OSxcbiAgXCJ0Z1wiOiB7XG4gICAgXCJvcGVuXCI6IHRydWUsXG4gICAgXCJzZXJ2ZXJcIjogXCJodHRwOi8vMTkyLjE2OC4wLjg1Ojg5ODlcIixcbiAgICBcImp3dFwiOiBcIlwiLFxuICAgIFwicHJvamVjdF9pZFwiOiBcIlwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1csT0FBTyxVQUFVO0FBQ3ZYLFNBQVMsY0FBYyxlQUFlO0FBR3RDLE9BQU8sU0FBUztBQUVoQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGVBQWU7QUFDdEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sZUFBZTtBQUN0QixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxXQUFXOzs7QUNuQmxCO0FBQUEsRUFDRSxTQUFXO0FBQUEsRUFDWCxnQkFBa0I7QUFBQSxFQUNsQixXQUFhO0FBQUEsRUFDYixJQUFNO0FBQUEsSUFDSixNQUFRO0FBQUEsSUFDUixRQUFV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
