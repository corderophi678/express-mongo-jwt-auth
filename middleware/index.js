const bodyParser = require('body-parser')
const logger = require('morgan')
const passport = require('passport')

const { passportConfig } = require('./passport')

function setupMiddleware(app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  passportConfig(passport)
  if (process.env.NODE_ENV !== 'production') {
    app.use(logger('combined'))
  }
}

module.exports = { setupMiddleware }
