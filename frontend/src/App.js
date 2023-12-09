import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Home from './pages/Homepage';
import UserChoice from './pages/UserChoice';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserChoice/>} />
      </Routes>
    </Router>
  );
}

export default App;