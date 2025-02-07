import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiData } from "../../services/api";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // To get window size for confetti

const Summary = () => {
  const [questions, setQuestions] = useState([]);
  const [userResponses, setUserResponses] = useState({});
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize(); // Get window size for confetti
  const navigate = useNavigate();

  // Medal image URLs from Unsplash
  const goldMedal =
    "https://plus.unsplash.com/premium_photo-1713102864696-e44ae2503d6e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29sZCUyMG1lZGFsfGVufDB8fDB8fHww";
  const silverMedal =
    "https://plus.unsplash.com/premium_photo-1713836956439-42423f6ffd75?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D";
  const bronzeMedal =
    "https://plus.unsplash.com/premium_photo-1713967593127-b9596c772306?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnJvbnplJTIwbWVkYWx8ZW58MHx8MHx8fDA%3D";

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
      const selectedOption = question.options.find(
        (opt) => opt.id === responses[question.id]
      );
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

    // Determine achievements based on correct answers
    const newAchievements = [];
    if (correct >= 9) {
      newAchievements.push({
        text: "Gold Medal! 🎉",
        medal: goldMedal,
        quote: "Hurray! You're a genius! Keep shining!",
      });
      setShowConfetti(true); // Show confetti for gold medal
    } else if (correct >= 6) {
      newAchievements.push({
        text: "Silver Medal! 🥈",
        medal: silverMedal,
        quote: "Great job! You're on the right track!",
      });
      setShowConfetti(true); // Show confetti for silver medal
    } else if (correct >= 4) {
      newAchievements.push({
        text: "Bronze Medal! 🥉",
        medal: bronzeMedal,
        quote: "Good effort! Keep pushing forward!",
      });
    } else {
      newAchievements.push({
        text: "Keep Trying!",
        medal: null,
        quote: "Every master was once a beginner. Don't give up!",
      });
    }
    setAchievements(newAchievements);
  }, []);

  const toggleDetails = (index) => {
    setShowDetails((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleMedalClick = () => {
    setTimeout(() => setShowConfetti(false), 10000); // Hide confetti after 10 seconds
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      {showConfetti && <Confetti width={width} height={height} />}
      <h1 className="text-4xl font-bold mb-6 text-blue-800">🎯 Quiz Summary</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Your Score: {score}
      </h2>
      <div className="mb-6">
        <p className="text-lg text-green-600">
          Correct Answers: {correctCount}
        </p>
        <p className="text-lg text-red-600">
          Incorrect Answers: {incorrectCount}
        </p>
      </div>

      {achievements.length > 0 && (
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Achievements:
          </h3>
          <ul className="list-none">
            {achievements.map((achievement, index) => (
              <li
                key={index}
                className="text-lg text-blue-600 mb-4"
                onClick={handleMedalClick}
                style={{ cursor: "pointer" }}
              >
                {achievement.medal && (
                  <img
                    src={achievement.medal}
                    alt="medal"
                    className="w-16 h-16 mx-auto"
                  />
                )}
                <p className="mt-2">{achievement.text}</p>
                <p className="mt-1 text-gray-600">{achievement.quote}</p> {/* Display the quote */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {questions.map((question, index) => {
        const selectedOption = question.options.find(
          (opt) => opt.id === userResponses[question.id]
        );
        const correctOption = question.options.find((opt) => opt.is_correct);

        return (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md mb-4 w-full max-w-3xl"
          >
            <p className="font-bold text-lg mb-2">
              {index + 1}. {question.description}
            </p>
            <p className="text-green-600 mb-1">
              ✅ Correct Answer: {correctOption.description}
            </p>
            <p
              className={`mt-2 ${
                selectedOption?.is_correct ? "text-green-600" : "text-red-600"
              }`}
            >
              🎯 Your Answer:{" "}
              {selectedOption ? selectedOption.description : "Not Answered"}
            </p>
            <button
              onClick={() => toggleDetails(index)}
              className="mt-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              {showDetails[index] ? "Hide Details" : "Show Detailed Solution"}
            </button>
            {showDetails[index] && (
              <p className="mt-4 text-gray-700 bg-gray-50 p-4 rounded-lg">
                {question.detailed_solution}
              </p>
            )}
          </div>
        );
      })}

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
      >
        Retake Quiz
      </button>
    </div>
  );
};

export default Summary;
