const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {timestamps: true})

const User = mongoose.model('users', schema)

module.exports = { User, schema }
