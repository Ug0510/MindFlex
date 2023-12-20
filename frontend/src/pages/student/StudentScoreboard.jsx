import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentScoreboard = () => {
  const [score, setScore] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStudentScore = async () => {
      try {
        // Assume you have the student ID stored in localStorage
        const studentId = localStorage.getItem('studentId');

        // Fetch the student's score from the server
        const response = await axios.post('/api/student/get-score', { studentId });

        // Extract the score from the response
        const { score } = response.data;

        // Set the score state
        setScore(score);

        // Set an amusing message based on the score
        setMessage(getAmusingMessage(score));
      } catch (error) {
        console.error('Error fetching student score:', error);
        setMessage('Oops! Something went wrong. Try again later.');
      }
    };

    fetchStudentScore();
  }, []);

  const getAmusingMessage = (score) => {
    if (score >= 15) {
      return "Congratulations, you're a genius! 🎉 Thanks for playing and enjoy your victory!";
    } else if (score >= 10) {
      return "Great job! You're pretty smart! 🚀 Thanks for playing, hope you had fun!";
    } else {
      return "Nice try! Even the best have off days. 😅 Thanks for playing, and better luck next time!";
    }
  };

  return (
    <div>
      <h1>Your Score: {score !== null ? `${score} points` : 'Loading...'}</h1>
      <p>{message}</p>
    </div>
  );
};

export default StudentScoreboard;
