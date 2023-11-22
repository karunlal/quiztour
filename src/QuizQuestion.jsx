// QuizQuestion.jsx
import React, { useEffect, useState } from 'react'
import './QuizQuestion.css'
import { shuffleArray } from './QuizUtils'

const QuizQuestion = ({ questionData, userAnswer, onAnswerClick }) => {
  const [shuffledOptions, setShuffledOptions] = useState([])

  useEffect(() => {
    // Shuffle options when questionData changes
    console.log('Shuffling options...')
    setShuffledOptions(shuffleArray(questionData.options))
  }, [questionData])

  const handleOptionClick = (option) => {
    if (!userAnswer) {
      onAnswerClick(option)
    }
  }

  return (
    <div>
      <h1>Quiz Question {questionData.index + 1}</h1>
      <p>{questionData.question}</p>
      <ul>
        {shuffledOptions.map((option, optionIndex) => (
          <li
            key={`${questionData.index}-${optionIndex}`} // Ensure a stable key
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
            {option}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuizQuestion
