const express = require('express')

const { User } = require('./api/resources/user/user.model')
const { router: userRouter } = require('./api/resources/user/user.router')
const { setupMiddleware } = require('./middleware')
const { connect } = require('./db')

const app = express()
connect()
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(e => console.warn('Error connecting to MongoDB', e))

setupMiddleware(app)

app.use('/api/users', userRouter)
app.use('*', (req, res) => {
  res.json({ ok: true })
})

module.exports = { app }
