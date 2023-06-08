import net from 'node:net'

function checkPortUsable(port) {
  return new Promise((resolve, reject) => {
    const server = net.createConnection({ port })
    server.on('connect', () => {
      server.end()
      reject(port)
    })
    server.on('error', () => {
      resolve(port)
    })
  })
}

function randomNumByRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function findUsablePort(port, minPort = 10000, maxPort = 65536) {
  const retry = () => {
    const port = randomNumByRange(minPort, maxPort)
    return findUsablePort(port, minPort, maxPort)
  }
  return checkPortUsable(port)
    .then(() => port)
    .catch(retry)
}

export default { findUsablePort }
// module.exports = {
//   findUsablePort,
//   checkPortUsable,
// }
