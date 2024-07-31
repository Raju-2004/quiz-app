const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Quiz = require('../models/QuizSchema')
const User = require('../models/UserSchema')

// Assuming you have a middleware to authenticate the user and set req.user
router.post('/create-quiz', async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  console.log(req)

  try {
    const email = req.email
    const quizData = req.body

    const existedUser = await User.findOne({ email })

    if (!existedUser) {
      throw new Error('User not found')
    }

    const { _id: userId } = existedUser

    const quiz = new Quiz({
      ...quizData,
      creator: userId,
    })

    await quiz.save({ session })

    existedUser.CreatedQuizzes.push(quiz._id)
    await existedUser.save({ session })

    await session.commitTransaction()
    session.endSession()

    res.status(201).json({ message: 'Quiz created successfully', quiz })
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.error(error)
    res.status(500).json({ message: 'An error occurred while creating the quiz', error: error.message })
  }
})

router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find()
    res.status(200).json(quizzes)
  } catch (err) {
    console.error('Error fetching quizzes:', err) // Log the error with context
    res.status(500).json({ message: 'An error occurred while fetching quizzes.' }) // Send a user-friendly error response
  }
})

router.get('/quizzes/:id', async (req, res) => {
  try {
    const id = req.params.id
    const quiz = await Quiz.findById(id)
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }
    console.log(quiz)
    res.status(200).json(quiz)
  } catch (err) {
    console.error('Error fetching quizzes:', err)
    res.status(500).json({ message: 'An error occurred while fetching quizzes.' })
  }
})

module.exports = router
