import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import woodPlate from '../../assets/images/wooden-plate.png';

const StudentList = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const gameCode = localStorage.getItem('teachersGameCode');
  const [buttonStyle, setButtonStyle] = useState({ cursor: 'pointer', color: 'black' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/game-codes/students?code=${gameCode}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStudents(response.data.students);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setIsLoading(false);
      }
    };

    // Fetch data initially
    fetchData();

    // Set up an interval to fetch data every 2 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [gameCode, token]);


  const startQuiz = async () => {
    try {
      // Send a request to the server to start the quiz
      const response = await axios.post('/api/quiz/start', { code: gameCode });
  
      // Check if the quiz started successfully
      if (response.status === 200) {
        console.log('Quiz started successfully');
        // Redirect the teacher to the desired page (e.g., quiz dashboard)
        navigate('/QuizDashboard');
      } else {
        console.error('Error starting quiz:', response.data.message);
        // Handle failure or display an error message
      }
    } catch (error) {
      console.error('Error starting quiz:', error.message);
      // Handle failure or display an error message
    }
  };

  return (
    <>
    <div className="bg-forest">
    <div className="heading-container">
        <img src={woodPlate} alt="" className='heading-plate' />
        <div className="wooden-text">
          <div>Quiz Players</div>
        </div>
    </div>
      <div style={{position:'absolute',height:'70vh',bottom:'0',left:'0',width:'100vw',display:'flex',justifyContent:'center',alignItems:'end'}}>
      <div className="both-side-pillar">
        {students.length === 0 ? (
             <>
             <div className="pillar-board-container">
              <div className="pillar-board" style={{width:'100%',marginTop:'15px'}}>
                <p style={{paddingTop:'30px',marginLeft:'-20px'}}>Noone Join yet...</p>
                <p style={{marginLeft:'-25px'}}>(Distribute quiz code)</p>
              </div>
             </div>
             </>
           ):(
          <>
            <div className="pillar-board-container">
              <div className="pillar-board">
                <p className='heading'>Students</p>
              </div>
              {students.map((student) => (
                <div key={student._id} className='pillar-board'>
                  <p>{student.fullName}</p>
                  <p>{student.email}</p>
                </div>
              ))}
            </div>
              </>
            )}
             
        </div>
      </div>
      

      <div className="arrow-btn" style={{left:'auto',right:'10px'}}>
        <p className="arrow-text">
          <Link to={''} style={buttonStyle} onClick={startQuiz} disabled={students.length === 0}>Start Quiz</Link>
        </p>
      </div>
    </div>

    </>
  );
};

export default StudentList;
