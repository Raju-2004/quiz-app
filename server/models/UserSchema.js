const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  Password: {
    type: String,
    required: true,
  },
  CreatedQuizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      default: [],
    },
  ],
  AttemptedQuizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attempt',
      default: [],
    },
  ],
})

const User = mongoose.model('User', UserSchema)
module.exports = User
