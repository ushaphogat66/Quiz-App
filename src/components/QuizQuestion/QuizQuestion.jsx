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
    <div className=" min-h-screen p-4">
      {/* Timer */}
      <div className="mb-4 text-lg font-bold text-red-600">
        Time Left: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </div>

      {/* Question Card */}
      <div className="w-full bg-white p-6 md:p-8 rounded-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          🎯 Question {currentQuestionIndex + 1}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mt-3">
          {currentQuestion.description}
        </p>

        {/* Options */}
        <div className="mt-6 space-y-4">
          {currentQuestion.options.map((option) => (
            <label
              key={option.id}
              className={`flex w-[400px] items-center space-x-3 cursor-pointer p-2 rounded-md transition duration-200 ${
                userResponses[currentQuestion.id] === option.id
                  ? "bg-blue-100"
                  : ""
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                checked={userResponses[currentQuestion.id] === option.id}
                onChange={() =>
                  handleOptionSelect(currentQuestion.id, option.id)
                }
                className="hidden"
              />
              <div
                className={`w-5 h-5 border-2 rounded-full flex justify-center items-center ${
                  userResponses[currentQuestion.id] === option.id
                    ? "border-blue-600"
                    : "border-gray-400"
                }`}
              >
                {userResponses[currentQuestion.id] === option.id && (
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                )}
              </div>
              <span className="text-gray-800 text-lg">
                {option.description}
              </span>
            </label>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex  absolute bottom-10 right-10 space-x-4">
          {" "}
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-5 py-2 rounded-lg text-white font-semibold ${
              currentQuestionIndex === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-900"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-800 text-white font-semibold"
          >
            {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
