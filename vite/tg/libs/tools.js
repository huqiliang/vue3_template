import fs from 'node:fs'
import { join } from 'node:path'

// 创建目录
export function createDir(path) {
  if (!fs.existsSync(path))
    fs.mkdirSync(path)
}

// 读取文件
export function readFile(name) {
  try {
    return fs.readFileSync(name, 'utf8')
  }
  catch (e) {}

  return ''
}

// 解析body
export function parseJson(req) {
  return new Promise((resolve) => {
    let d = ''
    req.on('data', (chunk) => {
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
export function mkdirs(path) {
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

export default {
  mkdirs,
}
