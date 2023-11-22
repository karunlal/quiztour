// Quiz.js
import React, { useState, useEffect } from 'react'
import QuizQuestion from './QuizQuestion'
import './QuizComponent.css'

const Quiz = ({ jsonData }) => {
  const [userAnswers, setUserAnswers] = useState({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [lastAnsweredQuestion, setLastAnsweredQuestion] = useState(null)

  useEffect(() => {
    setCurrentQuestionIndex(0)
    setShowFeedback(false)
    setUserAnswers({})
    setLastAnsweredQuestion(null)
  }, [jsonData])

  const handleAnswerClick = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedAnswer,
    }))
    setLastAnsweredQuestion(currentQuestionIndex)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < jsonData.data.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    } else {
      setShowFeedback(true)
    }
  }

  const handlePrevQuestion = () => {
    const prevIndex = Math.max(currentQuestionIndex - 1, 0)

    setCurrentQuestionIndex(prevIndex)
    setShowFeedback(false)
  }

  return (
    <div>
      {jsonData && currentQuestionIndex < jsonData.data.length ? (
        <QuizQuestion
          questionData={{
            ...jsonData.data[currentQuestionIndex],
            index: currentQuestionIndex,
            options: jsonData.data[currentQuestionIndex].arr,
          }}
          userAnswer={userAnswers[currentQuestionIndex]}
          onAnswerClick={handleAnswerClick}
        />
      ) : showFeedback ? (
        <div>
          <h1>Quiz Results</h1>
          {/* Display quiz results */}
          <pre>{JSON.stringify(userAnswers, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {jsonData && currentQuestionIndex < jsonData.data.length && (
        <div>
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0 || showFeedback}
          >
            Previous Question
          </button>
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  )
}

export default Quiz
