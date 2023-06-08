import type { Plugin } from 'vite'

// import { VitePluginNode } from 'vite-plugin-node'
import { parseJson } from './utils'
import { createPage } from './lib'

export default function tg(): Plugin {
  return {
    name: 'vite-tg',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        function done(data: any) {
          res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' })
          res.end(JSON.stringify(data))
        }

        if (req.url?.includes('__tg')) {
          const body = await parseJson(req)
          let next: any

          switch (req.url) {
            // 快速创建菜单
            case '/__tg_createPage':
              console.log('create', body)
              next = createPage(body)
              break
            case '/__tg_tgConfig':
              next = createPage(body)
              break
          }

          if (next) {
            next.then((data: any) => {
              done({
                code: 1000,
                data,
              })
            }).catch((err: Error) => {
              done({
                code: 1001,
                message: err.message,
              })
            })
          }
          else {
            done({
              code: 1000,
            })
          }
        }
        else {
          next()
        }
      })
    },
    // ...VitePluginNode({
    //   // Nodejs native Request adapter
    //   // currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
    //   // you can also pass a function if you are using other frameworks, see Custom Adapter section
    //   adapter: 'express',

    //   // tell the plugin where is your project entry
    //   appPath: './app.ts',

    //   // Optional, default: 'viteNodeApp'
    //   // the name of named export of you app from the appPath file
    //   exportName: 'viteNodeApp',

    //   // Optional, default: 'esbuild'
    //   // The TypeScript compiler you want to use
    //   // by default this plugin is using vite default ts compiler which is esbuild
    //   // 'swc' compiler is supported to use as well for frameworks
    //   // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
    //   // you need to INSTALL `@swc/core` as dev dependency if you want to use swc
    //   tsCompiler: 'esbuild',

    //   // Optional, default: {
    //   // jsc: {
    //   //   target: 'es2019',
    //   //   parser: {
    //   //     syntax: 'typescript',
    //   //     decorators: true
    //   //   },
    //   //  transform: {
    //   //     legacyDecorator: true,
    //   //     decoratorMetadata: true
    //   //   }
    //   // }
    //   // }
    //   // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
    //   swcOptions: {},
    // }),
  }
}
