import React from "react";
import "./css/QuizQuestion.css";

const QuizQuestion = React.memo(({ questionData, userAnswer, onAnswerClick }) => {
  if (!questionData) {
    return <div>Loading question...</div>;
  }

  // Split the question into title and options parts
  const formatQuestion = (questionText) => {
    const lines = questionText.split(/(?=\d\))/);
    return lines.map((line, index) => (
      <div key={index} className="question-line">
        {line.trim()}
      </div>
    ));
  };

  // Convert comma-separated string to array of numbers
  const parseOptions = (optionString) => {
    if (!optionString) return [];
    return optionString.split(',').map(num => parseInt(num.trim()));
  };

  const handleOptionClick = (option) => {
    if (!userAnswer) {
      onAnswerClick(option);
    }
  };

  return (
    <div className="quiz-question">
      <div className="question-container">
        {formatQuestion(questionData.question)}
      </div>
      
      <div className="options-container">
        {parseOptions(questionData.currentOptions).map((option) => {
          const isSelected = userAnswer === option;
          const isCorrect = option === questionData.answer;
          const showCorrect = userAnswer && isCorrect;
          const showIncorrect = userAnswer && isSelected && !isCorrect;
          
          return (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`option
                ${isSelected ? 'selected' : ''}
                ${showCorrect ? 'correct' : ''}
                ${showIncorrect ? 'incorrect' : ''}
              `}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default QuizQuestion;
