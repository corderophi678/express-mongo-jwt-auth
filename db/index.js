const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const connect = () => {
  return mongoose.connect(process.env.DB_URI, {useNewUrlParser: true})
}

module.exports = { connect }
