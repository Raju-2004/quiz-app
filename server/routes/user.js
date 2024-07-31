const express = require('express')
const router = express.Router()
const User = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/signup', async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password } = req.body

    const existingUser = await User.findOne({ Email })
    if (existingUser) {
      return res.status(400).json({ message: 'email already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(Password, 10)

    // Create new user
    const newUser = new User({
      FirstName,
      LastName,
      Email,
      Password: hashedPassword,
    })

    // Save new user to database
    console.log(newUser)
    await newUser.save()
    console.log('created')
    res.status(201).json({ message: 'User created successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const JWT_SECRET = process.env.ACCESS_SECRET_TOKEN || 'secret-key'
const JWT_EXPIRATION = '1m'

const generateToken = (user) => {
  return jwt.sign({ id: user.Email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION })
}

router.post('/login', async (req, res) => {
  try {
    const { UserName, Password } = req.body
    console.log(req.body)

    const user = await User.findOne({ UserName })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const isValidPassword = await bcrypt.compare(Password, user.Password)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid Password' })
    }

    const token = generateToken(user)

    res.status(200).json({ token, message: 'Login successful' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/check-mail', async (req, res) => {
  const { Email } = req.body
  try {
    console.log(Email)
    const userMail = await User.findOne({ Email })
    console.log(userMail)
    if (!userMail) {
      return res.status(400).json({ message: 'email not found' })
    }
    return res.status(200).json({ message: 'email found' })
  } catch (error) {
    console.error('Error checking mail', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/change-password', async (req, res) => {
  const { Email, Password } = req.body
  try {
    const user = await User.findOne({ Email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const hashedPassword = await bcrypt.hash(Password, 10)
    user.Password = hashedPassword
    await user.save()
    return res.status(200).json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('Error changing password:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
