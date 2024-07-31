// src/components/QuizResults.tsx

import React from 'react'
import { Result } from '../../types'

const QuizResults: React.FC<{ result: Result }> = ({ result }) => {
  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Correct: {result.correct}</p>
      <p>Total: {result.total}</p>
      <p>Percentage: {result.percentage.toFixed(2)}%</p>
    </div>
  )
}

export default QuizResults
