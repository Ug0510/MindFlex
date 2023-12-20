// QuizDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/css/style.css';
import woodPlate from '../../assets/images/wooden-plate.png';
import pillar from '../../assets/images/pillar-big-space.png';

const QuizDashboard = () => {
  const [gameCode, setGameCode] = useState(localStorage.getItem('game-code'));
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const code = localStorage.getItem('teachersGameCode');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        // Fetch scores from the server using the game code
        const response = await axios.get(`/api/quiz/scores?gameCode=${code}`);
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
    <div className='bg-forest'>
       <div className="heading-container">
        <img src={woodPlate} alt="" className='heading-plate' />
        <div className="wooden-text">
          <div>Quiz Result</div>
        </div>
      </div>
      <div style={{position:'absolute',height:'70vh',bottom:'0',left:'0',width:'100vw',display:'flex',justifyContent:'center',alignItems:'end'}}>
        
        <div className="broad-pillar">
        {isLoading ? (
             <>
             <div className="pillar-board-container">
              <div className="pillar-board" style={{width:'100%'}}>
                <p style={{paddingTop:'30px',marginLeft:'-20px'}}>Quiz is Live...</p>
                <p style={{marginLeft:'-25px'}}>(Wait for Result)</p>
              </div>
             </div>
             </>
           ):(
          <>
            <div className="pillar-board-container">
              <div className="pillar-board">
                <p className='heading'>Student</p>
              </div>
              {scores.map((score) => (
                <div key={score._id} className='pillar-board'>
                  <p>{score.fullName}</p>
                  <p>{score.email}</p>
                </div>
              ))}
            </div>
            <div className="pillar-board-container">
                <div className="pillar-board">
                  <p className='heading'>Score</p>
                </div>
                {scores.map((score) => (
                  <div key={score._id} className='pillar-board'>
                    <p className='score'>{score.score}</p>
                  </div>
                ))}
            </div>
          </>
          )}
             
        </div>
      </div>
    </div>
  );
};

export default QuizDashboard;
