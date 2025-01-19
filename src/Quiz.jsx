import React, { useState, useEffect } from 'react';
import QuizQuestion from './QuizQuestion';
import './QuizComponent.css';

const Quiz = ({ jsonData }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [jumpToQuestion, setJumpToQuestion] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNextQuestion();
      } else if (event.key === 'ArrowLeft') {
        handlePrevQuestion();
      } else if (event.key === 'Tab') {
        event.preventDefault(); // Prevent default tab behavior
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentQuestionIndex, userAnswers, showFeedback]);

  const handleAnswerClick = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedAnswer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < jsonData.data.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowFeedback(true);
    }
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setShowFeedback(false);
  };

  const handleJumpToQuestion = () => {
    const questionNumber = parseInt(jumpToQuestion, 10) - 1;
    if (
      !isNaN(questionNumber) &&
      questionNumber >= 0 &&
      questionNumber < jsonData.data.length
    ) {
      setCurrentQuestionIndex(questionNumber);
      setShowFeedback(false);
    } else {
      alert('Invalid question number. Please enter a valid number.');
    }
  };

  const renderQuestion = () => (
    <QuizQuestion
      questionData={{
        ...jsonData.data[currentQuestionIndex],
        index: currentQuestionIndex,
        options: jsonData.data[currentQuestionIndex].arr,
      }}
      userAnswer={userAnswers[currentQuestionIndex]}
      onAnswerClick={handleAnswerClick}
    />
  );

  const renderFeedback = () => (
    <div>
      <h1>Quiz Results</h1>
      {jsonData.data.map((question, index) => (
        <div key={index}>
          <p>
            <strong>Q{index + 1}: {question.question}</strong>
          </p>
          <p>Your Answer: {userAnswers[index]}</p>
          <p>Correct Answer: {question.answer}</p>
          <p>
            {userAnswers[index] === question.answer ? '✅ Correct' : '❌ Incorrect'}
          </p>
        </div>
      ))}
    </div>
  );

  if (!jsonData || !jsonData.data || jsonData.data.length === 0) {
    return <p>No questions available.</p>;
  }

  return (
    <div>
      {currentQuestionIndex < jsonData.data.length
        ? renderQuestion()
        : showFeedback
        ? renderFeedback()
        : <p>Loading...</p>}

      {currentQuestionIndex < jsonData.data.length && (
        <div>
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous Question
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={!userAnswers[currentQuestionIndex]}
          >
            Next Question
          </button>
        </div>
      )}

      {/* Jump to Question Input */}
      <div style={{ marginTop: '20px' }}>
        <label htmlFor="jumpToInput">Jump to Question: </label>
        <input
          id="jumpToInput"
          type="number"
          value={jumpToQuestion}
          onChange={(e) => setJumpToQuestion(e.target.value)}
          min="1"
          max={jsonData.data.length}
          placeholder="Enter question number"
        />
        <button onClick={handleJumpToQuestion}>Go</button>
      </div>
    </div>
  );
};

export default Quiz;
