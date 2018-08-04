require('dotenv').config()
const http = require('http')
const { app } = require('./server')

const server = http.createServer()

const PORT = process.env.PORT || 3001

server.on('request', app)
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
