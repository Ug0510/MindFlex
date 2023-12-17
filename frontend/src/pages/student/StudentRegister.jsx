import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/style.css';
import WoodInput from '../../components/WoodInput';
import woodPlate from '../../assets/images/wooden-plate.png';

const StudentRegister = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = () => {
    // Implement your registration logic here
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    // Add your registration logic, e.g., calling an API
  };

  return (
    <div className="bg-forest">
      <div className="heading-container">
        <img src={woodPlate} alt="" className="heading-plate" />
        <div className="wooden-text">
          <div>Student</div>
          <div className="small">Register</div>
        </div>
      </div>

      {/* Registration form */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'end', height: '100vh',paddingBottom:'50px' }}>
        <WoodInput
          value={fullName}
          onChange={handleFullNameChange}
          placeholder="Full Name"
        />
        <WoodInput
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          style={{ marginTop: '20px' }}
        />
        <WoodInput
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          style={{ marginTop: '20px' }}
        />
        <WoodInput
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm Password"
          style={{ marginTop: '20px' }}
        />

        <input type="button" className="wood-button" value="Register" style={{ marginTop: '20px' }} onClick={handleRegister} />

        <p style={{ marginTop: '20px' }}>
          Already have an account? <Link to="/StudentLogin">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default StudentRegister;
