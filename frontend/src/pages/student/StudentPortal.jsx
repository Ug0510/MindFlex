import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/style.css';
import woodPlate from '../../assets/images/wooden-plate.png';

const StudentPortal = () => {
  const [gameCode, setGameCode] = useState(''); // Store the entered code
  const [buttonStyle, setButtonStyle] = useState({ cursor: 'not-allowed', color: 'gray' }); // Initial button state
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // Update button style based on input length
  const handleInputChange = (event) => {
    setGameCode(event.target.value);
    setButtonStyle({
      cursor: event.target.value.length === 6 ? 'pointer' : 'not-allowed',
      color: event.target.value.length === 6 ? 'black' : 'gray',
    });
  };

  const handleEnterQuiz = async () => {
    try {
     
      // Check if the game code is 6 characters long
      if (gameCode.length !== 6) {
        console.log('Invalid game code. Please enter a 6-digit code.');
        return;
      }
      const studentId = localStorage.getItem('studentId');
      // Make an API call to verify the game code on the server
      const response = await axios.post('/api/game-codes/join', { code: gameCode, studentId:studentId},{headers});

      if (response.status === 200) {
        console.log('Game code verified successfully!');
        // Redirect to the waiting page or the next step in your flow
        navigate('/WaitingPage'); // Update the route accordingly
      } else {
        console.log('Invalid game code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying game code:', error);
    }
  };

  return (
    <div className="bg-forest">
      <div className="heading-container">
        <img src={woodPlate} alt="" className="heading-plate" />
        <div className="wooden-text">
          <div>Student</div>
          <div className="small">Portal</div>
        </div>
      </div>

      {/* Code input field and button */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <input
          type="text"
          className="wood-border"
          style={{ maxWidth: '30vw' }}
          placeholder="Enter Game Code"
          value={gameCode}
          onChange={handleInputChange}
        />
        <input
          type="button"
          className="wood-button"
          value="Enter Quiz"
          style={{ marginTop: '20px' }}
          onClick={handleEnterQuiz}
        />
      </div>

      <div className="arrow-btn">
        <p className="arrow-text">
          <Link to="/StudentPortal1" style={buttonStyle} onClick={handleEnterQuiz}>
            Enter Quiz
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StudentPortal;
