const hapi = require('@hapi/hapi')
const routes = require('./routes/routes')

const initServer = async() => {
    const server = hapi.server({
        port: 9000,
        host: 'localhost',
    })

    server.route(routes)

    await server.start()
    console.log(`Server berhalaan di url ${server.info.uri}`)
}

initServer()