import fs from 'node:fs'
import { join } from 'node:path'

// 首字母大写
export function firstUpperCase(value: string): string {
  return value.replace(/\b(\w)(\w*)/g, ($0, $1, $2) => {
    return $1.toUpperCase() + $2
  })
}

// 横杠转驼峰
export function toCamel(str: string): string {
  return str.replace(/([^-])(?:-+([^-]))/g, ($0, $1, $2) => {
    return $1 + $2.toUpperCase()
  })
}

// 创建目录
export function createDir(path: string) {
  if (!fs.existsSync(path))
    fs.mkdirSync(path)
}

// 读取文件
export function readFile(name: string) {
  try {
    return fs.readFileSync(name, 'utf8')
  }
  catch (e) {}

  return ''
}

// 解析body
export function parseJson(req: any): Promise<any> {
  return new Promise((resolve) => {
    let d = ''
    req.on('data', (chunk: any) => {
      d += chunk
    })
    req.on('end', () => {
      try {
        resolve(JSON.parse(d))
      }
      catch {
        resolve({})
      }
    })
  })
}

// 深度创建目录
export function mkdirs(path: string) {
  const arr = path.split('/')
  let p = ''

  arr.forEach((e) => {
    const t = join(p, e)

    try {
      fs.statSync(t)
    }
    catch (err) {
      try {
        fs.mkdirSync(t)
      }
      catch (error) {
        console.error(error)
      }
    }
    p = t
  })

  return p
}
