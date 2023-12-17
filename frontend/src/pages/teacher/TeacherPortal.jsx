import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/style.css';
import woodPlate from '../../assets/images/wooden-plate.png';
import axios from 'axios';

const TeacherPortal = () => {
  const [gameCode, setGameCode] = useState('Game Code');
  const [buttonStyle, setButtonStyle] = useState({ cursor: 'not-allowed', color: 'gray' });

  const generateRandomCode = async () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    setGameCode(randomCode.toString());
    setButtonStyle({ cursor: 'pointer', color: 'black' });
  
    try {
      const response = await axios.post('http://localhost:8000/api/game-codes', { code: randomCode });
      console.log('here')
      if (response.status === 201) {
        console.log('Code submitted successfully!');
      } else {
        console.error('Error submitting code:', response.data.message);
      }
    } catch (error) {
      console.error('Error submitting code:', error);
    }
  };

  return (
    <div className="bg-forest">
      <div className="heading-container">
        <img src={woodPlate} alt="" className='heading-plate' />
        <div className="wooden-text">
          <div>Teacher</div>
          <div className="small">Portal</div>
        </div>
      </div>

      {/* Code generation field and button  */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <input type="text" className='wood-border' value={gameCode} style={{ maxWidth: '30vw', cursor: 'not-allowed' }} />
        <input type="button" className="wood-button" value="Generate Code" onClick={generateRandomCode} />
      </div>

      <div className="arrow-btn">
        <p className="arrow-text" >
            <Link to="/StudentPortal" style={buttonStyle}>Start Quiz</Link>
        </p>
      </div>
    </div>
  );
};

export default TeacherPortal;
