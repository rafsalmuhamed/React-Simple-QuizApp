import React, { useState, useEffect } from 'react';
import './QuizApp.css'; // Assuming you have a CSS file for styling

function QuizApp() {
  const questions = [
    {
      id: 1,
      question: 'Which country is known as the Land of the Rising Sun?',
      options: ['China', 'Japan', 'South Korea', 'Vietnam'],
      answer: 'Japan'
    },
    {
      id: 2,
      question: 'What is the capital city of Australia?',
      options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
      answer: 'Canberra'
    },
    {
      id: 3,
      question: 'Which country is famous for the Great Wall?',
      options: ['China', 'India', 'Russia', 'Egypt'],
      answer: 'China'
    },
    {
      id: 4,
      question: 'Which European country is known as the Netherlands?',
      options: ['Germany', 'France', 'Italy', 'Netherlands'],
      answer: 'Netherlands'
    },
    {
      id: 5,
      question: 'What is the currency of Brazil?',
      options: ['Peso', 'Real', 'Dollar', 'Euro'],
      answer: 'Real'
    },
    {
      id: 6,
      question: 'Which country is known for its pyramids?',
      options: ['Greece', 'Italy', 'Egypt', 'Mexico'],
      answer: 'Egypt'
    },
    {
      id: 7,
      question: 'What is the largest country by land area?',
      options: ['China', 'USA', 'Russia', 'Canada'],
      answer: 'Russia'
    },
    {
      id: 8,
      question: 'What is the national animal of India?',
      options: ['Tiger', 'Lion', 'Elephant', 'Rhinoceros'],
      answer: 'Tiger'
    },
    {
      id: 9,
      question: 'Which city is known as the City of Love?',
      options: ['Paris', 'Rome', 'Venice', 'Barcelona'],
      answer: 'Paris'
    },
    {
      id: 10,
      question: 'What is the official language of Argentina?',
      options: ['Portuguese', 'Spanish', 'Italian', 'German'],
      answer: 'Spanish'
    },
    
  ];
  

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [seconds, setSeconds] = useState(10); // Countdown timer
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (timerRunning && seconds > 0) {
      const countdown = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else if (seconds === 0) {
      handleAnswerButtonClick(); // Automatically move to next question when time runs out
    }
  }, [timerRunning, seconds]);

  const handleAnswerButtonClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSeconds(10); // Reset timer for the next question
    } else {
      setShowScore(true);
    }
  };

  const handleStartButtonClick = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSeconds(10);
    setTimerRunning(true);
  };

  return (
    <>
    
    <div className='bg'>
      <div className="quiz-app">
      <h2>Country Quiz</h2>
        {showScore ? (
          <div className="score-section">
            <h2>Your Score: {score} / {questions.length}</h2>
            <button  className='startbtn' onClick={handleStartButtonClick}>Start Again</button>
          </div>
        ) : (
          <div>
            <button className='startbtn' onClick={handleStartButtonClick}>Start</button>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
              {currentQuestion + 1} : {questions[currentQuestion].question}
              </div>
              <div className="timer">Time Remaining: <span className='seconds'>{seconds}</span> s</div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].options.map((option, index) => (
                <button className='btn' key={index} onClick={() => handleAnswerButtonClick(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
  
}

export default QuizApp;
