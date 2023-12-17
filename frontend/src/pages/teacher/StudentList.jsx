import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Replace this with your actual logic to fetch the list of students based on the generated code.
    // This is just a demo using a fake API call.
    fetch('/api/students?code=YOUR_GENERATED_CODE')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.students);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setIsLoading(false);
      });
  }, []);

  const startQuiz = async () => {
    // Implement your logic here to send a request to the server to start the quiz.
    // You might need to send the generated code again or any other relevant data.
    // Consider displaying a loading indicator or confirmation message while the request is pending.

    // On successful quiz start, redirect the teacher to the desired page (e.g., quiz dashboard).
    await fetch('/api/quiz/start', {
      method: 'POST',
      body: JSON.stringify({ code: 'YOUR_GENERATED_CODE' }),
    })
      .then((response) => response.json())
      .then(() => navigate('/quiz-dashboard'));
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
              <li key={student.id}>{student.name}</li>
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
