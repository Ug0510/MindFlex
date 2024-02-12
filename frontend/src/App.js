import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import UserChoice from "./pages/UserChoice";
import TeacherPortal from "./pages/teacher/TeacherPortal";
import StudentPortal from "./pages/student/StudentPortal";
import StudentList from "./pages/teacher/StudentList";
import StudentLogin from "./pages/student/StudentLogin";
import StudentRegister from "./pages/student/StudentRegister";
import TeacherLogin from "./pages/teacher/TeacherLogin";
import TeacherRegister from "./pages/teacher/TeacherRegister";
import WaitingPage from "./pages/student/WaitingPage";
import QuizPage from "./pages/student/QuizPage";
import StudentScoreboard from "./pages/student/StudentScoreboard";
import QuizDashboard from "./pages/teacher/QuizDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserChoice />} />
        <Route path="/TeacherPortal" element={<TeacherPortal />} />
        <Route path="/StudentPortal" element={<StudentPortal />} />
        <Route path="/StudentList" element={<StudentList />} />
        <Route path="/StudentLogin" element={<StudentLogin />} />
        <Route path="/StudentRegister" element={<StudentRegister />} />
        <Route path="/TeacherLogin" element={<TeacherLogin />} />
        <Route path="/TeacherRegister" element={<TeacherRegister />} />
        <Route path="/WaitingPage" element={<WaitingPage />} />
        <Route path="/QuizPage" element={<QuizPage />} />
        <Route path="/StudentScoreboard" element={<StudentScoreboard />} />
        <Route path="/QuizDashboard" element={<QuizDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
