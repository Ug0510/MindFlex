import React from 'react';
// import './Homepage.css';
import '../assets/css/pages/Homepage.css';
import '../assets/css/components/button.css';
import GlowButton from '../components/GlowButton';

const Homepage = () => {
  return (
    <>
    <div className="homepage-container">
      {/* Stars */}
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      {/* Section heading */}
      <div className='absy'>
       <h1 className='section-heading'>Ultimate Genius</h1>

        <div className="glow-btn mybtn">Shine</div>
        <div className="center-container">
        <GlowButton />
      </div>
      </div>
    </div>
    </>
  );
}

export default Homepage;
