import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import '../assets/css/pages/UserChoice.css';
import woodPlate from '../assets/images/wooden-plate.png';
import choicePlate from '../assets/images/choice.png';

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


    <div className="btn-container">
      <img src={choicePlate} alt="" />
      <p className='plate-text left'>
        <Link to="/StudentLogin">Student</Link>
      </p>
      <img src={choicePlate} alt="" />
      <p className='plate-text right'>
        <Link to="/TeacherPortal">Teacher</Link>
      </p>
    </div>

    </div>
    </body>
    </>
  );
}

export default UserChoice;
