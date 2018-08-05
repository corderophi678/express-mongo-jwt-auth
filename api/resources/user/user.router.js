const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = require('express').Router()

const { validators } = require('../../utils/validators')
const { User } = require('./user.model')
const JWT_SECRET = process.env.JWT_SECRET

router.post('/register', (req, res) => {
  const { email, password, password2 } = req.body
  const { errors, isValid } = validators.registerInput({
    email,
    password,
    password2
  })
  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
    } else {
      const newUser = new User({
        email,
        passwordHash: password
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.passwordHash, salt, (err, hash) => {
          if (err) throw new Error(err)
          newUser.passwordHash = hash
          newUser
            .save()
            .then(user => {
              const returnedUser = {
                _id: user._id,
                email: user.email
              }
              res.json(returnedUser)
            })
            .catch(err => console.log(err))
        })
      })
    }
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  const { errors, isValid } = validators.loginInput({ email, password })

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors)
    }
    bcrypt.compare(password, user.passwordHash).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id
        }
        jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
          if (!err) {
            res.json({
              success: true,
              token: `Bearer ${token}`
            })
          }
        })
      } else {
        errors.password = 'Password Incorrect'
        return res.status(400).json(errors)
      }
    })
  })
})

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let user = {
      id: req.user.id,
      email: req.user.email
    }
    res.json(user)
  }
)

module.exports = { router }
