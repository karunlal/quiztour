import React, { useEffect, useState } from "react";
import "./css/QuizQuestion.css";

const QuizQuestion = React.memo(({ questionData, userAnswer, onAnswerClick }) => {
  // Use stable state for options instead of shuffling on every render
  const [options, setOptions] = useState([]);
  
  // Only shuffle options when the question changes, not on every render
  useEffect(() => {
    if (questionData?.options) {
      // Create a new array to shuffle instead of mutating the original
      const newOptions = [...questionData.options];
      // Simple Fisher-Yates shuffle
      for (let i = newOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newOptions[i], newOptions[j]] = [newOptions[j], newOptions[i]];
      }
      setOptions(newOptions);
    }
  }, [questionData?.options]); // Only depend on options changing

  const handleOptionClick = (option) => {
    if (!userAnswer) {
      onAnswerClick(option);
    }
  };

  // Guard clause for when questionData is not yet loaded
  if (!questionData) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="quiz-question">
      <h2 className="question-header">
        {questionData.index + 1}) {questionData.question}
      </h2>
      
      <ul className="options-list">
        {options.map((option) => {
          const isSelected = userAnswer === option;
          const isCorrect = option === questionData.answer;
          const showCorrect = userAnswer && isCorrect;
          const showIncorrect = userAnswer && isSelected && !isCorrect;
          
          return (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`option
                ${isSelected ? 'selected' : ''}
                ${showCorrect ? 'correct' : ''}
                ${showIncorrect ? 'incorrect' : ''}
              `}
              style={{ 
                cursor: userAnswer ? 'default' : 'pointer',
                pointerEvents: userAnswer ? 'none' : 'auto'
              }}
            >
              <span className="option-text">{option}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default QuizQuestion;
