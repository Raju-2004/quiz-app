export type Question = {
  question: string
  options: string[]
  correctAnswer: string
}

export type Quiz = {
  title: string
  questions: Question[]
}

export type Result = {
  correct: number
  total: number
  percentage: number
}
