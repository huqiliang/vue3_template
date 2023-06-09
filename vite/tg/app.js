import { join } from 'node:path'
import express from 'express'
import cors from 'cors'
import nunjucks from 'nunjucks'
import { findUsablePort } from './libs/port.js'
import { createPage } from './libs/page.js'
import { parseJson } from './libs/tools.js'

const app = express()
const port = await findUsablePort(3000)
app.use(cors())
// app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World 2222!')
})
app.post('/saveLocal', async (req, res) => {
  const config = await parseJson(req)
  const code = nunjucks.render(join('./vite/tg/view/tpl.nj'),
    { config },
  )
  createPage({ code })
  res.send({ code: 0 })
})

app.listen(port, () => {
  console.log(`天工端口监听:${port}`)
})
