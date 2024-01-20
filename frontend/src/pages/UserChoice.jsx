import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const UserChoice = () => {
  return (
    <>
    <body>
    <div className='bg-forest'>
    <div className="heading-container">
      <div className="wooden-text">
        <div>Ultimate</div>
       <div className="small">Genius</div>
      </div>
    </div>


    <div className="container">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="choice-btn my-4">
        <span><Link to="/StudentLogin">Student</Link></span>
        </div>
        <div className="choice-btn my-4">
        <span><Link to="/TeacherLogin">Teacher</Link></span>
        </div>
      </div>
    </div>


    {/* <div className="btn-container">
      <img src={choicePlate} alt="" className='wplate'/>
      <p className='plate-text left'>
        <Link to="/StudentLogin">Student</Link>
      </p>
      <img src={choicePlate} alt="" className='wplate'/>
      <p className='plate-text right'>
        <Link to="/TeacherLogin">Teacher</Link>
      </p>
    </div> */}

    </div>
    </body>
    </>
  );
}

export default UserChoice;
