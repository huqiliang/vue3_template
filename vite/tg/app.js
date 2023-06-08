import express from 'express'
import { findUsablePort } from './utils/port.js'

const app = express()

const port = await findUsablePort(3000)

app.get('/', (req, res) => {
  res.send('Hello World 2222!')
})

app.listen(port, () => {
  console.log(`天工端口监听:${port}`)
})
