import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/style.css';
import WoodInput from '../../components/WoodInput';
import woodPlate from '../../assets/images/wooden-plate.png';

const StudentRegister = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

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

  const handleRegister = async () => {
    try {
      // Basic client-side validation
      if (!fullName || !email || !password || !confirmPassword) {
        console.log('Please fill in all fields');
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        console.log('Passwords do not match');
        return;
      }

      // Make API call to register the student
      const response = await axios.post('/api/student/register', {
        fullName,
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Student registered successfully');
        // Handle success
        navigate('/StudentLogin');
      } else {
        console.log('Registration failed:', response.data.message);
        // Handle failure
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="bg-forest">
      <div className="heading-container">
       <img src={woodPlate} className='heading-plate'/>
        <div className="wooden-text">
          <div>Student</div>
          <div className="small">Register</div>
        </div>
      </div>

      {/* Registration form */}
      <div className='input-div'>
        <WoodInput
          value={fullName}
          onChange={handleFullNameChange}
          placeholder="Full Name"
        />
        <WoodInput
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          style={{ marginTop: '5px' }}
        />
        <WoodInput
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          style={{ marginTop: '5px' }}
        />
        <WoodInput
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm Password"
          style={{ marginTop: '5px' }}
        />

        <input type="button" className="wood-button" value="Register" style={{ marginTop: '20px' }} onClick={handleRegister} />

        <p style={{ marginTop: '5px' }} className='p-text'>
          Already have an account? <Link to="/StudentLogin">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default StudentRegister;
