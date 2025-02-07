import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { apiData } from "../../services/api";

const QuizQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [timeLeft, setTimeLeft] = useState(
    localStorage.getItem("quiz-timer")
      ? Number(localStorage.getItem("quiz-timer"))
      : 900
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (apiData && apiData.length > 0) {
      setQuestions(apiData[0].questions);
    }
  }, []);

  // Timer Effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem("quiz-timer", newTime); // Store timer in localStorage
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleOptionSelect = (questionId, optionId) => {
    setUserResponses((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem("userResponses", JSON.stringify(userResponses));
    localStorage.removeItem("quiz-timer"); // Clear timer when quiz is submitted
    navigate("/summary");
  };

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-500">
          Loading questions...
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      {/* Timer and Progress Bar */}
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-bold text-red-600 bg-white p-3 rounded-lg shadow-sm">
            ⏳ Time Left: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </div>
          <div className="text-lg font-bold text-gray-700 bg-white p-3 rounded-lg shadow-sm">
            📊 Progress: {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="w-full bg-white p-6 md:p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            🎯 Question {currentQuestionIndex + 1}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            {currentQuestion.description}
          </p>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  userResponses[currentQuestion.id] === option.id
                    ? "bg-blue-50 border-2 border-blue-600"
                    : "bg-white hover:bg-gray-50 border-2 border-gray-200"
                }`}
                onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
              >
                <div
                  className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                    userResponses[currentQuestion.id] === option.id
                      ? "border-blue-600"
                      : "border-gray-400"
                  }`}
                >
                  {userResponses[currentQuestion.id] === option.id && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full transition-all duration-200"></div>
                  )}
                </div>
                <span className="text-gray-800 text-lg">{option.description}</span>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
                currentQuestionIndex === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-900"
              }`}
            >
              ⬅️ Previous
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-800 text-white font-semibold transition-all duration-200"
            >
              {currentQuestionIndex === questions.length - 1
                ? "Submit 🚀"
                : "Next ➡️"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;