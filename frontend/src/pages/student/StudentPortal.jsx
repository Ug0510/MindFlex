import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/style.css';
import woodPlate from '../../assets/images/wooden-plate.png';

const StudentPortal = () => {
  const [gameCode, setGameCode] = useState(''); // Store the entered code
  const [buttonStyle, setButtonStyle] = useState({ cursor: 'not-allowed', color: 'gray' }); // Initial button state

  // Update button style based on input length
  const handleInputChange = (event) => {
    setGameCode(event.target.value);
    setButtonStyle({
      cursor: event.target.value.length === 6 ? 'pointer' : 'not-allowed',
      color: event.target.value.length === 6 ? 'black' : 'gray',
    });
  };

  return (
    <div className="bg-forest">
      <div className="heading-container">
        <img src={woodPlate} alt="" className="heading-plate" />
        <div class="wooden-text">
          <div>Student</div>
          <div class="small">Portal</div>
        </div>
      </div>

      {/* Code generation field and button  */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <input
          type="text"
          className="wood-border"
          style={{ maxWidth: '30vw' }}
          placeholder="Enter Game Code"
          value={gameCode}
          onChange={handleInputChange}
        />
      </div>

      <div className="arrow-btn">
        <p className="arrow-text">
          <Link to={gameCode.length === 6 ? '/StudentPortal1' : ''} style={buttonStyle}>
            Enter Quiz
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StudentPortal;
