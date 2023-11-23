// QuizQuestion.jsx
import React, { useEffect, useState } from 'react'
import './QuizQuestion.css'
import { shuffleArray } from './QuizUtils'

const QuizQuestion = ({ questionData, userAnswer, onAnswerClick }) => {
  const [shuffledOptions, setShuffledOptions] = useState([])

  useEffect(() => {
    // Shuffle options when questionData changes
    setShuffledOptions(shuffleArray(questionData.options))
  }, [questionData])

  const handleOptionClick = (option) => {
    if (!userAnswer) {
      onAnswerClick(option)
    }
  }

  return (
    <div className="quiz-question">
      <h1 className="question-header">
        Quiz Question {questionData.index + 1}
      </h1>
      <p className="question-text">{questionData.question}</p>
      <ul className="options-list">
        {shuffledOptions.map((option, optionIndex) => (
          <li
            key={`${questionData.index}-${option}`} // Ensure a stable key
            onClick={() => handleOptionClick(option)}
            className={`
              ${userAnswer === option ? 'selected' : ''}
              ${
                userAnswer === option && userAnswer === questionData.answer
                  ? 'correct'
                  : ''
              }
              ${
                userAnswer !== questionData.answer &&
                questionData.answer === option &&
                userAnswer
                  ? 'correct'
                  : ''
              }
              ${
                userAnswer !== questionData.answer && userAnswer === option
                  ? 'incorrect'
                  : ''
              }
            `}
            style={{ cursor: 'pointer' }}
          >
            <span className="option-text">{option}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuizQuestion
