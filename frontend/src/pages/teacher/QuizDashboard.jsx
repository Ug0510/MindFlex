// QuizDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizDashboard = () => {
  const [gameCode, setGameCode] = useState(localStorage.getItem('game-code'));
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        // Fetch scores from the server using the game code
        const response = await axios.get(`/api/quiz/scores?gameCode=849690`);
        console.log(response.data);

        // Extract scores from the response
        const { scores } = response.data;

        if(scores !== -1)
        {
            // Set the scores state
        setScores(scores);

        // Set loading to false
        setIsLoading(false);


        //stoping the loop to reload again
        clearInterval(intervalId);
        }
      } catch (error) {
        console.error('Error fetching scores:', error);

        // Set loading to false
        setIsLoading(false);
      }
    };

    // Check scores every 5 seconds until the quiz is finished
    const intervalId = setInterval(() => {
      fetchScores();
    }, 2000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [gameCode]);

  return (
    <div>
      <h1>Quiz Dashboard</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Scores</h2>
          <ul>
            {scores.map((score) => (
              <li key={score._id}>
                Student Name: {score.fullName}, Email: {score.email}, Score: {score.score} points
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizDashboard;
