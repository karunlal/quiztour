import React, { useEffect, useState } from 'react';

const shuffleArray = (array) => {
  if (!Array.isArray(array)) return [];
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const QuizQuestion = React.memo(({ 
  questionData = { 
    index: 0,
    question: '',
    options: [],
    answer: ''
  }, 
  userAnswer = null, 
  onAnswerClick = () => {} 
}) => {
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    if (questionData?.options) {
      setShuffledOptions(shuffleArray(questionData.options));
    }
  }, [questionData?.options]);

  const handleOptionClick = (option) => {
    if (!userAnswer && onAnswerClick) {
      onAnswerClick(option);
    }
  };

  if (!questionData) {
    return null;
  }

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 leading-normal">
        {(questionData.index + 1)}) {questionData.question}
      </h1>
      
      <ul className="space-y-4 w-full">
        {shuffledOptions.map((option) => {
          const isSelected = userAnswer === option;
          const isCorrect = questionData.answer === option;
          const showCorrect = userAnswer && isCorrect;
          const showIncorrect = userAnswer === option && !isCorrect;
          
          return (
            <li
              key={`${questionData.index}-${option}`}
              onClick={() => handleOptionClick(option)}
              className={`
                p-4 rounded-lg border transition-all cursor-pointer
                ${!userAnswer ? 'hover:bg-gray-50 border-gray-200' : ''}
                ${isSelected ? 'border-blue-500' : 'border-gray-200'}
                ${showCorrect ? 'bg-green-100 border-green-500 text-green-800' : ''}
                ${showIncorrect ? 'bg-red-100 border-red-500 text-red-800' : ''}
              `}
            >
              <span className="block text-lg">{option}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default QuizQuestion;
