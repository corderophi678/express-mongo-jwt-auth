const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const connect = () => {
  console.log('db_uri is, ', process.env)
  return mongoose.connect(process.env.DB_URI, {useNewUrlParser: true})
}

module.exports = { connect }
