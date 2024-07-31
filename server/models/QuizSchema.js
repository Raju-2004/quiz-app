const mongoose = require('mongoose')

const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
})

const QuizSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [QuestionSchema],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Quiz = mongoose.model('Quiz', QuizSchema)
module.exports = Quiz
