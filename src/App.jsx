import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import StartQuiz from './components/StartQuiz/StartQuiz';
import QuizQuestion from './components/QuizQuestion/QuizQuestion';
import QuizSummary from './components/QuizQuestion/QuizSummary';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartQuiz />} />
        <Route path="/quiz" element={<QuizQuestion />} />
        <Route path="/summary" element={<QuizSummary  />} />
      </Routes>
    </Router>
  );
};

export default App;