import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/style.css';
import WoodInput from '../../components/WoodInput';
import woodPlate from '../../assets/images/wooden-plate.png';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // Add your authentication logic, e.g., calling an API
  };

  return (
    <div className="bg-forest">
      <div className="heading-container">
        <img src={woodPlate} alt="" className="heading-plate" />
        <div className="wooden-text">
          <div>Student</div>
          <div className="small">Login</div>
        </div>
      </div>

      {/* Code generation field and button  */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <WoodInput
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter Email"
        />
        <WoodInput
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter Password"
          style={{ marginTop: '20px' }}
        />

        <input type="button" className="wood-button" value="Login" style={{ marginTop: '20px' }} onClick={handleLogin} />
      </div>
    </div>
  );
};

export default StudentLogin;
