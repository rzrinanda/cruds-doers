const { Server } = require('@hapi/hapi')
// const Hapi = require('@hapi/hapi')
const nuxtPlugin = require('@nuxtjs/hapi')
const Routes = require('./api')
require('dotenv').config()

async function start() {
  const port = process.env.APP_PORT ?? 3000
  const server = new Server({ port })

  await server.register({
    plugin: nuxtPlugin,
    options: {
      edge: true,
      rootDir: __dirname,
    },
  })

  await server.route(Routes)

  await server.start()
  //   console.log('cek port', process.env.PORT, port)
  console.log(`Hapi server listening on http://localhost:${port}`)
}

start().catch(console.error)
