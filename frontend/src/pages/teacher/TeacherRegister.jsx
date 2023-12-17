import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/style.css';
import WoodInput from '../../components/WoodInput';
import woodPlate from '../../assets/images/wooden-plate.png';

const TeacherRegister = () => {
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

      // Make API call to register the teacher
      const response = await axios.post('/api/teacher/register', {
        fullName,
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Teacher registered successfully');
        // Handle success
        navigate('/TeacherLogin');
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
        <img src={woodPlate} alt="" className="heading-plate" />
        <div className="wooden-text">
          <div>Teacher</div>
          <div className="small">Register</div>
        </div>
      </div>

      {/* Registration form */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'end', height: '100vh', paddingBottom: '50px' }}>
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
          Already have an account? <Link to="/TeacherLogin">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default TeacherRegister;
