import { join } from 'node:path'
import fs from 'node:fs'
import express from 'express'
import cors from 'cors'
import nunjucks from 'nunjucks'
import prettier from 'prettier'
import _ from 'lodash-es'
import { findUsablePort } from './libs/port.js'
import { createPage } from './libs/page.js'
import { parseJson } from './libs/tools.js'

const app = express()
app.use(cors())

const data = fs.readFileSync('project.config.json', 'utf8') // 读取json文件
let config = JSON.parse(data)
const childPort = config.childPort
const port = await findUsablePort(childPort)
if (port !== childPort) {
  // 如果端口被占用 换一个端口
  console.log("端口已被使用 尝试更换");
  await changeJson('childPort', port)
}

function changeJson(key, value, json) {
  const data = fs.readFileSync(json || 'project.config.json', 'utf8') // 读取json文件
  let config = JSON.parse(data) // 将数据解析为json对象
  if (_.isObject(config[key])) {
    config[key] = _.assign(config[key], value)
  } else {
    config[key] = value
  }
  const content = prettier.format(JSON.stringify(config), {
    parser: 'json'
  })
  return fs.promises.writeFile(json || 'project.config.json', content)
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/saveLocal', async (req, res) => {
  const response = await parseJson(req)
  const { page, config } = response
  const code = nunjucks.render(join('./vite/tg/view/tpl.nj'), { config, page })
  createPage({ code, name: page.name })
  res.send({ code: 0 })
})

app.post('/saveNew', async (req, res) => {
  const page = await parseJson(req)
  const { name, title } = page
  const code = nunjucks.render(join('./vite/tg/view/new.nj'), { page })
  createPage({ code, name })
  res.send({ code: 0 })
})

app.post('/saveTGConfig', async (req, res) => {
  const tg = await parseJson(req)
  await changeJson('tg', tg)
  res.send({ code: 0 })
})

app.listen(port, async () => {
  console.log(`天工端口监听:${port}`)
})
