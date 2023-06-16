import { join } from 'node:path'
import fs from 'node:fs'
import express from 'express'
import cors from 'cors'
import nunjucks from 'nunjucks'
import prettier from 'prettier'
import { findUsablePort } from './libs/port.js'
import { createPage } from './libs/page.js'
import { parseJson } from './libs/tools.js'

const app = express()
const port = await findUsablePort(8989)
app.use(cors())
// app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World 2222!')
})
app.post('/saveLocal', async (req, res) => {
  const config = await parseJson(req)
  const code = nunjucks.render(join('./vite/tg/view/tpl.nj'), { config })
  createPage({ code })
  res.send({ code: 0 })
})

app.listen(port, () => {
  const data = fs.readFileSync('project.config.json', 'utf8') //读取json文件
  let config = JSON.parse(data) //将数据解析为json对象
  config.childPort = port;
  const content = prettier.format(JSON.stringify(config), {
    parser: 'json',
  })
  fs.writeFile('project.config.json', content, 'utf8', err => {
    if (err) throw err
  })
  console.log(`天工端口监听:${port}`)
})
