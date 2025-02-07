import React, { useState } from "react";
import { apiData } from "../../services/api";
import { Link } from "react-router-dom";

const StartQuiz = () => {
  const quizDetails = apiData[0];
  
  // State to track the clicked section
  const [activeSection, setActiveSection] = useState(null);

  const handleClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1557989048-03456d01a26e?q=80&w=2448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="backdrop-blur-lg bg-white/40 p-6 rounded-3xl shadow-2xl w-full max-w-lg text-center transform transition-all hover:scale-105 duration-300 border border-white/10">
        
        {/* Heading Section */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-shadow-md leading-tight">
          🎯 <span className="text-indigo-600">Ready to Test Your</span> <span  className="text-indigo-600">Quiz Knowledge?</span>
        </h1>

        {/* Quiz Details */}
        {quizDetails && (
          <div className="space-y-4">
            <div
              onClick={() => handleClick("topic")}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${activeSection === "topic" ? "bg-indigo-100 shadow-lg scale-105" : "bg-white/70"}`}
            >
              <p className="text-lg font-semibold text-gray-800">
                📌 <span className="font-bold text-indigo-600">Topic:</span> {quizDetails?.topic}
              </p>
            </div>
            <div
              onClick={() => handleClick("duration")}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${activeSection === "duration" ? "bg-indigo-100 shadow-lg scale-105" : "bg-white/70"}`}
            >
              <p className="text-lg font-semibold text-gray-800">
                ⏳ <span className="font-bold text-indigo-600">Duration:</span> {quizDetails?.duration} mins
              </p>
            </div>
            <div
              onClick={() => handleClick("release")}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${activeSection === "release" ? "bg-indigo-100 shadow-lg scale-105" : "bg-white/70"}`}
            >
              <p className="text-lg font-semibold text-gray-800">
                📅 <span className="font-bold text-indigo-600">Release Date:</span> {quizDetails?.daily_date || "Not specified"}
              </p>
            </div>
            <div
              onClick={() => handleClick("questions")}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${activeSection === "questions" ? "bg-indigo-100 shadow-lg scale-105" : "bg-white/70"}`}
            >
              <p className="text-lg font-semibold text-gray-800">
                 <span className="font-bold text-indigo-600">No Of Questions:</span> {quizDetails?.questions_count}
              </p>
            </div>
            <div
              onClick={() => handleClick("correct")}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${activeSection === "correct" ? "bg-green-100 shadow-lg scale-105" : "bg-white/70"}`}
            >
              <p className="text-lg font-semibold text-green-800">
                ✅ <span className="font-bold text-green-600">Correct Answer:</span> +{quizDetails?.correct_answer_marks} pts
              </p>
            </div>
            <div
              onClick={() => handleClick("negative")}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${activeSection === "negative" ? "bg-red-100 shadow-lg scale-105" : "bg-white/70"}`}
            >
              <p className="text-lg font-semibold text-red-800">
                ❌ <span className="font-bold text-red-600">Negative Marking:</span> {quizDetails?.negative_marks} pts
              </p>
            </div>
          </div>
        )}
        
        {/* Start Quiz Button */}
        <Link to="/quiz" className="block mt-8">
          <button className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 transition-transform transform hover:scale-110 cursor-pointer animate-pulse">
            🚀 Start Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StartQuiz;
