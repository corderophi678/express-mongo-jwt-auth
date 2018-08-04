const bodyParser = require('body-parser')
const logger = require('morgan')

function setupMiddleware(app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  if (process.env.NODE_ENV !== 'production') {
    app.use(logger('combined'))
  }
}

module.exports = { setupMiddleware }
