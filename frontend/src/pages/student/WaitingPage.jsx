import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StandingBoard from '../../assets/images/standing-board.png';
import woodPlate from '../../assets/images/wooden-plate.png';
import "../../assets/css/components/greenboard.css";

const WaitingPage = () => {
  const navigate = useNavigate();
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [students, setStudents] = useState([]);
  const gameCode = String(localStorage.getItem('studentGameCode'));

  useEffect(() => {
    const checkQuizStatus = async () => {
      try {
        const response = await axios.post('/api/quiz/is-started', { code: gameCode });
        setIsQuizStarted(response.data.isQuizStarted);
      } catch (error) {
        console.error('Error checking quiz status:', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await axios.get(`/api/game-codes/students?code=${gameCode}`);
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    const intervalId = setInterval(() => {
      checkQuizStatus();
      fetchStudents();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(intervalId);
  }, [gameCode]);

  useEffect(() => {
    if (isQuizStarted) {
      navigate('/QuizPage');
    }
  }, [isQuizStarted, navigate]);

  return (
    <div className="bg-forest">
      <div className="heading-container">
        <img src={woodPlate} alt="" className="heading-plate" />
        <div className="wooden-text">
          <div>Waiting</div>
          <div className="small">Room</div>
        </div>
      </div>

      {/* <img src={StandingBoard} alt="" id='instruction-board'/> */}

      <div className="greenboard-body" contentEditable={true} style={{ maxWidth: "80vw", maxHeight: "60vh", marginTop: "250px" }}>
        Wait till others come.....
        <br />
        {/* Display the list of students */}
        {students.length > 0 ? (
          <>
          <br />
            <p style={{fontSize:'30px',fontWeight:'bold',color:'yellow'}}>Students who joined:</p>
            <ul>
              {students.map(student => (
                <li key={student._id}>{student.fullName}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>No students have joined yet.</p>
        )}
      </div>
    </div>
  );
};

export default WaitingPage;
