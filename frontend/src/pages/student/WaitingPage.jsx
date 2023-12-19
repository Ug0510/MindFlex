import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WaitingPage = () => {
  const navigate = useNavigate();
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const gameCode = localStorage.getItem('studentGameCode');

  useEffect(() => {
    const checkQuizStatus = async () => {
      try {
        const response = await axios.post('/api/quiz/is-started',{code:gameCode});
        setIsQuizStarted(response.data.isQuizStarted);
      } catch (error) {
        console.error('Error checking quiz status:', error);
      }
    };

    const intervalId = setInterval(() => {
      checkQuizStatus();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(intervalId);
  }, [gameCode]);

  useEffect(() => {
    if (isQuizStarted) {
      navigate('/quiz');
    }
  }, [isQuizStarted, navigate]);

  return (
    <div>
      <h1>Waiting for Quiz to Start...</h1>
      {/* Add any waiting page content here */}
    </div>
  );
};

export default WaitingPage;
