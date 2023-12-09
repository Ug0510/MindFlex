import React from 'react';
import '../assets/css/style.css';
import '../assets/css/pages/UserChoice.css';
import Background from '../assets/images/forest-background.png'
import woodPlate from '../assets/images/wooden-plate.png'

const UserChoice = () => {
  return (
    <>
    <body>
    <div className='bg-forest'>
    <div className="heading-container">
      <img src={woodPlate} alt="" className='heading-plate' />
      <div class="wooden-text">
        <div>Ultimate</div>
       <div class="small">Genius</div>
      </div>
    </div>
    </div>
    </body>
    </>
  );
}

export default UserChoice;
