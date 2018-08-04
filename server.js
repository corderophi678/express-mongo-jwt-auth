const express = require('express')

const { setupMiddleware } = require('./middleware')
const { connect } = require('./db')

const app = express()
setupMiddleware(app)
connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch(e => console.warn('Error connecting to MongoDB', e))

app.use('*', (req, res) => {
  res.json({ ok: true })
})

module.exports = { app }
