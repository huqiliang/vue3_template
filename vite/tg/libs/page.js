import { createWriteStream } from 'node:fs'
import { join } from 'node:path'
import prettier from 'prettier'
import { mkdirs } from './tools.js'

// 创建文件
export async function createPage(options) {
  // 格式化内容
  const content = prettier.format(options.code, {
    parser: 'babel',
    semi: false,
    singleQuote: true,
    printWidth: 300,
    trailingComma: 'none',
    arrowParens: 'avoid',
  })

  // 目录路径
  const dir = (options.viewPath || '').split('/')
  console.log('dir', dir)

  // 文件名
  const fname = dir.pop()

  // 创建目录
  const path = mkdirs(`./src/${dir.join('/')}`)

  // 创建文件
  createWriteStream(join(path, fname || 'demo'), {
    flags: 'w',
  }).write(content)
}

export function changeProjectConfig() {

}
