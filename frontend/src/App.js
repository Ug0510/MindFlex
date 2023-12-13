import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Home from './pages/Homepage';
import UserChoice from './pages/UserChoice';
import TeacherPortal from './pages/TeacherPortal';
import StudentPortal from './pages/StudentPortal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserChoice/>} />
        <Route path="/TeacherPortal" element={<TeacherPortal/>} />
        <Route path="/StudentPortal" element={<StudentPortal/>} />
      </Routes>
    </Router>
  );
}

export default App;