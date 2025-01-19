import React, { useEffect, useState } from "react";
import "./css/QuizQuestion.css";

const QuizQuestion = React.memo(({ questionData, userAnswer, onAnswerClick }) => {
  const [options, setOptions] = useState([]);
  
  useEffect(() => {
    if (questionData?.options) {
      const newOptions = [...questionData.options];
      for (let i = newOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newOptions[i], newOptions[j]] = [newOptions[j], newOptions[i]];
      }
      setOptions(newOptions);
    }
  }, [questionData?.options]);

  // Format the question text to maintain line breaks
  const formatQuestionText = (text) => {
    if (!text) return '';
    
    // Split the question number and content
    const match = text.match(/^(\d+\))(.*)/);
    if (!match) return text;

    const [, number, content] = match;
    
    // Format the content to preserve natural line breaks
    // Break at question marks, specific keywords, or long sentences
    const formattedContent = content
      .replace(/\?/g, '?\n')
      .replace(/(Following|Which|What|Where|When|How|Why)(\s+[A-Z])/g, '$1\n$2')
      .replace(/(\d\))/g, '\n$1')
      .trim();

    return (
      <div className="question-text">
        <span className="question-number">{number}</span>
        {formattedContent.split('\n').map((line, index) => (
          <div key={index} className="question-line">
            {line.trim()}
          </div>
        ))}
      </div>
    );
  };

  if (!questionData) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="quiz-question">
      <div className="question-header">
        {formatQuestionText(questionData.question)}
      </div>
      
      <ul className="options-list">
        {options.map((option) => {
          const isSelected = userAnswer === option;
          const isCorrect = option === questionData.answer;
          const showCorrect = userAnswer && isCorrect;
          const showIncorrect = userAnswer && isSelected && !isCorrect;
          
          return (
            <li
              key={option}
              onClick={() => !userAnswer && handleOptionClick(option)}
              className={`option
                ${isSelected ? 'selected' : ''}
                ${showCorrect ? 'correct' : ''}
                ${showIncorrect ? 'incorrect' : ''}
              `}
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
