import React from "react";
import { apiData } from "../../services/api";
import { Link } from "react-router-dom";

const StartQuiz = () => {
  const quizDetails = apiData[0];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-fit text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-nowrap">
          🎯 Ready to Test Your Knowledge?
        </h1>
        {quizDetails && (
          <div className="space-y-3 text-gray-700">
            <p className="text-lg font-medium">
              📌 <span className="font-semibold">Topic:</span>{" "}
              {quizDetails?.topic}
            </p>
            <p className="text-lg font-medium">
              ⏳ <span className="font-semibold">Duration:</span>{" "}
              {quizDetails?.duration} mins
            </p>
            <p className="text-lg font-medium">
              📅 <span className="font-semibold">Release Date:</span>{" "}
              {quizDetails?.daily_date || "Not specified"}
            </p>
            <p className="text-lg font-medium">
              ❓ <span className="font-semibold">Questions:</span>{" "}
              {quizDetails?.questions_count}
            </p>
            <p className="text-lg font-medium text-green-600">
              ✅ <span className="font-semibold">Correct Answer:</span> +
              {quizDetails?.correct_answer_marks} pts
            </p>
            <p className="text-lg font-medium text-red-600">
              ❌ <span className="font-semibold">Negative Marking:</span>{" "}
              {quizDetails?.negative_marks} pts
            </p>
          </div>
        )}
        <Link to="/quiz" className="">
          <button className="mt-6 px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 transition-transform transform hover:scale-105 cursor-pointer">
            🚀 Start Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StartQuiz;
