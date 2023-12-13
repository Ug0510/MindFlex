import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../assets/css/style.css';
import woodPlate from '../assets/images/wooden-plate.png';

const TeacherPortal = () => {
  const [gameCode, setGameCode] = useState('Game Code');

  const generateRandomCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit code
    setGameCode(randomCode.toString());
  };

  return (
    <div className="bg-forest">
        <div className="heading-container">
      <img src={woodPlate} alt="" className='heading-plate' />
      <div class="wooden-text">
        <div>Teacher</div>
       <div class="small">Portal</div>
      </div>
    </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      
      <input type="text" className='wood-border' value={gameCode} style={{maxWidth:'30vw'}} />
      <input type="button" className="wood-button" value="Generate Code" onClick={generateRandomCode}/>
      
    </div>
    </div>
  );
};

export default TeacherPortal;
