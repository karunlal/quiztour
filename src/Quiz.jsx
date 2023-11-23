// Quiz.js
import React, { useState, useEffect } from 'react'
import QuizQuestion from './QuizQuestion'
import QuizResult from './QuizResult' // Import the new QuizResult component
import { useHistory } from 'react-router-dom'
import './Styles.css'

const Quiz = ({ jsonData }) => {
  const [userAnswers, setUserAnswers] = useState({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [details, setDetails] = useState('')
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [lastAnsweredQuestion, setLastAnsweredQuestion] = useState(null)
  const history = useHistory()

  useEffect(() => {
    setCurrentQuestionIndex(0)
    setShowFeedback(false)
    setUserAnswers({})
    setDetails('')
    setDetailsVisible(false)
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
    const prevIndex =
      lastAnsweredQuestion !== null ? lastAnsweredQuestion - 1 : 0

    if (prevIndex >= 0 && prevIndex < jsonData.data.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
      setShowFeedback(false)
    }
  }

  const handleShowDetails = () => {
    setDetails(jsonData.data[currentQuestionIndex].moreDetails || '')
    setDetailsVisible(true)
  }

  const handleCloseDetails = () => {
    setDetailsVisible(false)
  }

  const handleSubmit = () => {
    setShowFeedback(true)
  }

  return (
    <div>
      <div className="quiz-container">
        <div className="quiz-content">
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
            <QuizResult userAnswers={userAnswers} jsonData={jsonData} />
          ) : (
            <p>Loading...</p>
          )}
          {jsonData && currentQuestionIndex < jsonData.data.length && (
            <div className="quiz-navigation">
              <button
                onClick={handlePrevQuestion}
                className="next-question-button"
                disabled={currentQuestionIndex === 0 || showFeedback}
              >
                Previous Question
              </button>
              <button
                onClick={handleShowDetails}
                className={
                  jsonData.data[currentQuestionIndex].moreDetails
                    ? 'show-details-button available'
                    : 'show-details-button'
                }
              >
                Show Details
              </button>
              <button
                onClick={handleNextQuestion}
                className="next-question-button"
                disabled={showFeedback}
              >
                {currentQuestionIndex === jsonData.data.length - 1
                  ? 'Submit'
                  : 'Next Question'}
              </button>
            </div>
          )}
        </div>
        {detailsVisible && (
          <div className="details-container" style={{ width: '30%' }}>
            <button
              className="close-details-button"
              onClick={handleCloseDetails}
            >
              <span
                style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'red' }}
              >
                ✕
              </span>
            </button>
            <div style={{ width: '100%' }}>
              <h2 style={{ fontSize: '1.5rem' }}>Details</h2>
              <pre
                style={{
                  whiteSpace: 'pre-wrap',
                  width: '100%',
                  lineHeight: '1.5',
                }}
              >
                {details}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Quiz
