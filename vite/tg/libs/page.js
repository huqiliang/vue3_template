import { join } from 'node:path'
import prettier from 'prettier'
import { $ } from 'execa'
import { saveFile } from './tools.js'

// 创建文件
export async function createPage(options) {
  // 格式化内容
  const content = prettier.format(options.code, {
    parser: 'vue',
    semi: false,
    singleQuote: true,
    printWidth: 300,
    trailingComma: 'none',
    arrowParens: 'avoid',
  })
  // 文件名
  const fname = `${options.name || 'demo'}.vue`

  // 目录路径
  const path = './src/pages'
  const file = join(path, fname)
  // 创建文件
  // , {
  //   flags: 'w',
  // }
  try {
    await saveFile(file, content)
  }
  catch (err) {
    console.log(err.stack)
  }
  await $`npx eslint --fix ${file}`
}

export function changeProjectConfig() {

}
