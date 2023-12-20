import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentList = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const gameCode = localStorage.getItem('teachersGameCode');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/game-codes/students?code=${gameCode}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStudents(response.data.students);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setIsLoading(false);
      }
    };

    // Fetch data initially
    fetchData();

    // Set up an interval to fetch data every 2 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [gameCode, token]);


  const startQuiz = async () => {
    try {
      // Send a request to the server to start the quiz
      const response = await axios.post('/api/quiz/start', { code: gameCode });
  
      // Check if the quiz started successfully
      if (response.status === 200) {
        console.log('Quiz started successfully');
        // Redirect the teacher to the desired page (e.g., quiz dashboard)
        navigate('/QuizDashboard');
      } else {
        console.error('Error starting quiz:', response.data.message);
        // Handle failure or display an error message
      }
    } catch (error) {
      console.error('Error starting quiz:', error.message);
      // Handle failure or display an error message
    }
  };

  return (
    <div className="student-list-container">
      <h3>Students Joining Quiz</h3>
      {isLoading ? (
        <p>Loading students...</p>
      ) : (
        students.length === 0 ? (
          <p>No students have joined yet.</p>
        ) : (
          <ul>
            {students.map((student) => (
              <li key={student._id}>{student.fullName}</li>
            ))}
          </ul>
        )
      )}
      <button onClick={startQuiz} disabled={students.length === 0}>
        Start Quiz
      </button>
    </div>
  );
};

export default StudentList;
