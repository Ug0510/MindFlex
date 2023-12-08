import React from 'react';
// import './Homepage.css';
import '../assets/css/pages/Homepage.css';

const Homepage = () => {
  return (
    <>
    <div className="homepage-container">
      {/* Stars */}
      <div class="stars"></div>
      <div class="twinkling"></div>
      
      {/* Section heading */}
      <h1 className='section-heading'>Welcome to the Quiz App</h1>
    </div>
    </>
  );
}

export default Homepage;
