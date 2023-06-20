import React from 'react';
import Quiz from './quiz';
import { QuizProvider } from './QuizProvider';
import { Wrapper } from './quiz';
import BottomNavBar from './BottomNavBar';
import HomePage from './HomePage';
import ProgressPage from './ProgressPage';
import AccountPage from './AccountPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Wrapper>
        <QuizProvider>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </QuizProvider>
        <BottomNavBar />
      </Wrapper>
    </Router>
  );
}

export default App;
