import React, { useMemo } from "react";

const QuizQuestion = React.memo(({ questionData, userAnswer, onAnswerClick }) => {
  const shuffledOptions = useMemo(() => shuffleArray(questionData.options), [
    questionData.options,
  ]);

  const handleOptionClick = (option) => {
    if (!userAnswer) {
      onAnswerClick(option);
    }
  };

  return (
    <div className="quiz-question">
      <h1 className="question-header" style={{ lineHeight: "1.5" }}>
        {questionData.index + 1}){" "}
        {questionData.question.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </h1>

      <ul className="options-list">
        {shuffledOptions.map((option, optionIndex) => (
          <li
            key={`${questionData.index}-${option}`}
            onClick={() => handleOptionClick(option)}
            className={`${
              userAnswer === option ? "selected" : ""
            } ${
              userAnswer === option && userAnswer === questionData.answer
                ? "correct"
                : ""
            } ${
              userAnswer !== questionData.answer &&
              questionData.answer === option &&
              userAnswer
                ? "correct"
                : ""
            } ${
              userAnswer !== questionData.answer && userAnswer === option
                ? "incorrect"
                : ""
            }`}
            style={{ cursor: "pointer" }}
          >
            <span className="option-text">{option}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default QuizQuestion;
