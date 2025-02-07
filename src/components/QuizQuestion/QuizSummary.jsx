import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiData } from "../../services/api";

const Summary = () => {
  const [questions, setQuestions] = useState([]);
  const [userResponses, setUserResponses] = useState({});
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (apiData && apiData.length > 0) {
      setQuestions(apiData[0].questions);
    }
    const responses = JSON.parse(localStorage.getItem("userResponses")) || {};
    setUserResponses(responses);
    
    let totalScore = 0;
    let correct = 0;
    let incorrect = 0;
    apiData[0].questions.forEach((question) => {
      const selectedOption = question.options.find(opt => opt.id === responses[question.id]);
      if (selectedOption) {
        if (selectedOption.is_correct) {
          totalScore += 4;
          correct++;
        } else {
          totalScore -= 1;
          incorrect++;
        }
      }
    });
    setScore(totalScore);
    setCorrectCount(correct);
    setIncorrectCount(incorrect);

    // Determine achievements
    const newAchievements = [];
    if (correct === questions.length) {
      newAchievements.push("Perfect Score!");
    }
    if (correct >= questions.length / 2) {
      newAchievements.push("Halfway There!");
    }
    if (incorrect === 0) {
      newAchievements.push("No Mistakes!");
    }
    setAchievements(newAchievements);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">🎯 Quiz Summary</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Score: {score}</h2>
      <div className="mb-6">
        <p className="text-lg text-green-600">Correct Answers: {correctCount}</p>
        <p className="text-lg text-red-600">Incorrect Answers: {incorrectCount}</p>
      </div>

      {achievements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Achievements:</h3>
          <ul className="list-disc list-inside">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-lg text-blue-600">{achievement}</li>
            ))}
          </ul>
        </div>
      )}

      {questions.map((question, index) => {
        const selectedOption = question.options.find(opt => opt.id === userResponses[question.id]);
        const correctOption = question.options.find(opt => opt.is_correct);

        return (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-4 w-full max-w-3xl">
            <p className="font-bold text-lg mb-2">{index + 1}. {question.description}</p>
            <p>
              {question.detailed_solution}
            </p>
            <p className="text-green-600 mb-1">✅ Correct Answer: {correctOption.description}</p>
            <p className={`mt-2 ${selectedOption?.is_correct ? "text-green-600" : "text-red-600"}`}>
              🎯 Your Answer: {selectedOption ? selectedOption.description : "Not Answered"}
            </p>
          </div>
        );
      })}

      <button onClick={() => navigate("/")} className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer">
        Retake Quiz
      </button>
    </div>
  );
};

export default Summary;
