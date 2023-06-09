import fs, { createWriteStream } from 'node:fs'
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

// 根据文件流保存文件
export function saveFile(filePath, fileData) {
  return new Promise((resolve, reject) => {
    // 块方式写入文件
    const wstream = createWriteStream(filePath, { flags: 'w' })

    wstream.on('open', () => {
      const blockSize = 128
      const nbBlocks = Math.ceil(fileData.length / (blockSize))
      for (let i = 0; i < nbBlocks; i += 1) {
        const currentBlock = fileData.slice(
          blockSize * i,
          Math.min(blockSize * (i + 1), fileData.length),
        )
        wstream.write(currentBlock)
      }

      wstream.end()
    })
    wstream.on('error', (err) => { reject(err) })
    wstream.on('finish', () => { resolve(true) })
  })
}
export default {
  mkdirs, saveFile,
}
