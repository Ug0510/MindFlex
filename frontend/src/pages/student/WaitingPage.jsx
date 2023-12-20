import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StandingBoard from '../../assets/images/standing-board.png';
import woodPlate from '../../assets/images/wooden-plate.png';
import "../../assets/css/components/greenboard.css";

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
    <div className="bg-forest">
      <div className="heading-container">
        <img src={woodPlate} alt="" className="heading-plate" />
        <div className="wooden-text">
          <div>Waiting</div>
          <div className="small">Room</div>
        </div>
      </div>

      {/* <img src={StandingBoard} alt="" id='instruction-board'/> */}

      <div className="greenboard-body" contentEditable={true} style={{maxWidth:"80vw",maxHeight:"60vh",marginTop:"250px"}}>
      Wait till others come.....
      <br />
      <ol>
        <li>only requires an HTML tag and body tag</li>
        <li>
          thanks to{' '}
          <a
            href="http://stackoverflow.com/a/19258938/1654250"
            target="_blank"
            title="Stackoverflow Link"
            contentEditable={false}
          >
            RhinoWalrus
          </a>{' '}
          for his help :)
        </li>
        <li>
          thanks to{' '}
          <a
            href="https://codepen.io/HugoGiraudel/pen/layxv"
            target="_blank"
            title="CodePen Link"
            contentEditable={false}
          >
            HugoGiraudel
          </a>{' '}
          for his awesome work :)
        </li>
      </ol>
      <br />
    </div>
</div>
  );
};

export default WaitingPage;
