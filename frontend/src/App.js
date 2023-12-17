import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import UserChoice from './pages/UserChoice';
import TeacherPortal from './pages/Teacher/TeacherPortal';
import StudentPortal from './pages/Student/StudentPortal';
import StudentList from './pages/Teacher/StudentList';
import StudentLogin from './pages/Student/StudentLogin';
import StudentRegister from './pages/Student/StudentRegister';
import TeacherLogin from './pages/Teacher/TeacherLogin';
import TeacherRegister from './pages/Teacher/TeacherRegister';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserChoice/>} />
        <Route path="/TeacherPortal" element={<TeacherPortal/>} />
        <Route path="/StudentPortal" element={<StudentPortal/>} />
        <Route path="/StudentList" element={<StudentList/>} />
        <Route path="/StudentLogin" element={<StudentLogin/>} />
        <Route path="/StudentRegister" element={<StudentRegister/>} />
        <Route path="/TeacherLogin" element={<TeacherLogin/>} />
        <Route path="/TeacherRegister" element={<TeacherRegister/>} />
      </Routes>
    </Router>
  );
}

export default App;