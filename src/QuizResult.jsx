// QuizResult.js
import React from 'react'

const QuizResult = ({ userAnswers, jsonData }) => {
  // Perform any additional processing or calculations with userAnswers and jsonData

  return (
    <div>
      <h1>Quiz Results</h1>
      <pre>{JSON.stringify(userAnswers, null, 2)}</pre>
      {/* Add any other components or information you want to display */}
    </div>
  )
}

export default QuizResult
