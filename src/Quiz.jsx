import React, { useState, useEffect } from 'react'
import QuizQuestion from './QuizQuestion'
import { useHistory } from 'react-router-dom'
import './css/QuizComponent.css'

const Quiz = ({ jsonData }) => {
  const [userAnswers, setUserAnswers] = useState({})
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [unattendedQuestions, setUnattendedQuestions] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [details, setDetails] = useState('')
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showConfirmationBox, setShowConfirmationBox] = useState(false)
  const [accuracyPercentage, setAccuracyPercentage] = useState(0)
  const [jumpQuestionNumber, setJumpQuestionNumber] = useState('')
  const history = useHistory()

  useEffect(() => {
    if (jsonData && jsonData.data) {
      setUnattendedQuestions(jsonData.data.length)
      setCorrectAnswers(0)
      setWrongAnswers(0)
      setUserAnswers({})
      setShowFeedback(false)
      setDetails('')
      setDetailsVisible(false)
      setCurrentQuestionIndex(0)
      setShowConfirmationBox(false)
      setAccuracyPercentage(0)
    }
  }, [jsonData])

  const updateResults = () => {
    let correct = 0
    let wrong = 0
    let unattended = 0

    for (let i = 0; i < jsonData.data.length; i++) {
      if (userAnswers[i] === jsonData.data[i].answer) {
        correct++
      } else if (userAnswers[i] !== undefined) {
        wrong++
      } else {
        unattended++
      }
    }

    const totalQuestions = jsonData.data.length
    const accuracy = (correct / totalQuestions) * 100
    setCorrectAnswers(correct)
    setWrongAnswers(wrong)
    setUnattendedQuestions(unattended)
    setAccuracyPercentage(accuracy.toFixed(2))
  }

  useEffect(updateResults, [userAnswers, jsonData])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === 'ArrowRight' &&
        currentQuestionIndex < jsonData.data.length - 1
      ) {
        handleNextQuestion()
      } else if (event.key === 'ArrowLeft' && currentQuestionIndex > 0) {
        handlePrevQuestion()
      } else if (event.key === 'Tab') {
        event.preventDefault()
        focusNextElement()
      }
    }

    const focusNextElement = () => {
      const focusableElements = document.querySelectorAll(
        'button, input, [tabindex]:not([tabindex="-1"])'
      )
      const currentIndex = Array.from(focusableElements).findIndex(
        (element) => element === document.activeElement
      )
      const nextElement =
        focusableElements[(currentIndex + 1) % focusableElements.length]
      nextElement?.focus()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentQuestionIndex, jsonData])

  const handleAnswerClick = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedAnswer,
    }))
  }

  const handleNextQuestion = () => {
    setDetailsVisible(false)
    if (currentQuestionIndex < jsonData.data.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    } else {
      setShowFeedback(true)
      setDetailsVisible(false)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
      setShowFeedback(false)
      setDetailsVisible(false)
    }
  }

  const handleJumpToQuestion = () => {
    const questionNumber = parseInt(jumpQuestionNumber, 10)
    if (questionNumber > 0 && questionNumber <= jsonData.data.length) {
      setCurrentQuestionIndex(questionNumber - 1)
      setDetailsVisible(false)
      setShowFeedback(false)
    } else {
      alert('Invalid question number.')
    }
    setJumpQuestionNumber('') // Clear the input field
  }

  const handleShowDetails = () => {
    setDetails(jsonData.data[currentQuestionIndex].moreDetails || '')
    setDetailsVisible(true)
  }

  const handleCloseDetails = () => {
    setDetailsVisible(false)
  }

  const handleSubmit = () => {
    setShowConfirmationBox(true)
  }

  const handleConfirmSubmission = () => {
    setUserAnswers({})
    setCurrentQuestionIndex(0)
    setShowFeedback(false)
    setShowConfirmationBox(false)
  }

  const handleCancelSubmission = () => {
    setShowConfirmationBox(false)
    history.push('/')
  }

  const handleCloseConfirmationBox = () => {
    setShowConfirmationBox(false)
  }

  return (
    <div>
      <div className="quiz-container">
        <div className="quiz-content">
          {jsonData &&
          jsonData.data &&
          currentQuestionIndex < jsonData.data.length ? (
            <div>
              <p>
                Question {currentQuestionIndex + 1}/{jsonData.data.length} -{' '}
                <span style={{ color: 'blue' }}>
                  Unattended-{unattendedQuestions} ,{' '}
                </span>
                <span style={{ color: 'green' }}>
                  Correct-{correctAnswers},{' '}
                </span>
                <span style={{ color: 'red' }}>Wrong-{wrongAnswers} </span>
              </p>

              <QuizQuestion
                questionData={{
                  ...jsonData.data[currentQuestionIndex],
                  index: currentQuestionIndex,
                  options: jsonData.data[currentQuestionIndex].arr,
                }}
                userAnswer={userAnswers[currentQuestionIndex]}
                onAnswerClick={handleAnswerClick}
              />
            </div>
          ) : showFeedback ? (
            <div>
              <p>Quiz Feedback or Result</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          {jsonData &&
            jsonData.data &&
            currentQuestionIndex < jsonData.data.length && (
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
                  disabled={
                    currentQuestionIndex === jsonData.data.length - 1 ||
                    showFeedback
                  }
                >
                  Next Question
                </button>
              </div>
            )}
          <div className="jump-to-question">
            <input
              type="number"
              placeholder="Jump to question #"
              value={jumpQuestionNumber}
              onChange={(e) => setJumpQuestionNumber(e.target.value)}
              tabIndex="0"
            />
            <button onClick={handleJumpToQuestion} tabIndex="0">
              Go
            </button>
          </div>
        </div>
        {detailsVisible && (
          <div className="details-container" style={{ width: '75%' }}>
            <button
              className="close-details-button"
              onClick={handleCloseDetails}
            >
              ✕
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
        {showConfirmationBox && (
          <>
            <div className="overlay" onClick={handleCloseConfirmationBox} />
            <div className="confirmation-box">
              <p>Total Questions: {jsonData.data.length}</p>
              <p>Correct Answers: {correctAnswers}</p>
              <p>Wrong Answers: {wrongAnswers}</p>
              <p>Unattended Questions: {unattendedQuestions}</p>
              <button onClick={handleConfirmSubmission}>Repeat Quiz</button>
              <button onClick={handleCancelSubmission}>Back to Home</button>
              <button onClick={handleCloseConfirmationBox}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Quiz
