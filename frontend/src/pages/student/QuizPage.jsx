import React, { useState, useEffect } from 'react';
import WoodInput from '../../components/WoodInput'; 
import axios from 'axios';
import { useWordChecker } from 'react-word-checker';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/style.css';
import Timer from '../../assets/images/clock.png'

const QuizPage = () => {

  const  navigate = useNavigate();

  const generateRandomLetters = () => {
    // Logic to generate random letters
    // You can customize this based on your requirements
    const vowels = 'AEIOU';
    const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
    const getRandomChar = (str) => str[Math.floor(Math.random() * str.length)];

    const randomLetters = [];
    randomLetters.push(getRandomChar(vowels));
    randomLetters.push(getRandomChar(vowels));
    for (let i = 0; i < 4; i++) {
      randomLetters.push(getRandomChar(consonants));
    }

    return randomLetters;
  };

  const [letters, setLetters] = useState(generateRandomLetters());
  const [inputWord, setInputWord] = useState('');
  const [correctWords, setCorrectWords] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds

  const { words, isLoading, wordExists } = useWordChecker('en');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      endQuiz();
    }
  }, [timer]);

  const handleInputChange = (event) => {
    setInputWord(event.target.value.toUpperCase());
  };

  const handleWordSubmit = () => {
    // Validate the word (you may need to implement a function or use a library)
    // For simplicity, we'll just check if the word is not empty and only uses provided letters
    console.log('here');
    const usedLetters = new Set([...inputWord]);
    console.log('now');
    let validWord = [...inputWord].every((letter) => letters.includes(letter) );
    validWord = validWord && !(correctWords.includes(inputWord));
    console.log(validWord,inputWord);
    if (inputWord.trim() !== '' && validWord) {
      if (wordExists(inputWord)) {
        setCorrectWords((prevWords) => [...prevWords, inputWord]);
        setScore((prevScore) => prevScore + inputWord.length);
        setInputWord('');
      } else {
        console.log('Invalid word. Make sure to use only the provided letters.');
      }
    } else {
      console.log('Please enter a valid word using only the provided letters.');
    }
  };
  

  const endQuiz = async () => {
    // Assuming you have a backend API endpoint to save the score
    const studentId = localStorage.getItem('studentId');
    const response = await axios.post('/api/student/save-score', { studentId, score });
    console.log(response.data); // Handle the response as needed

    const code = localStorage.getItem('studentGameCode');
    //giving status to change state to finish quiz
    const response2 = await axios.post('/api/quiz/finish-quiz',{code:code});
    console.log(response2.data);

    // Redirect to the scoreboard page
    navigate('/StudentScoreboard');
  };

  return (
    <div className='bg-forest' style={{display:'flex',justifyContent:'center',alignItems:'start',padding:'10vh 0 0 15vw',flexDirection:'column'}}>
      <div style={{marginLeft:'1.5vw',marginBottom:'4vh'}}>
        {/* Display letters */}
        {letters.map((letter, index) => (
          <div key={index} id='letter-block' style={{ display: 'inline-block', margin: '5px', fontSize: '20px' }}>
            <span>{letter}</span>
          </div>
        ))}
      </div>
      <div>
        {/* Display timer, score, and input field */}
        <div id='timer'><span>
          {/* <img src={Timer} alt="" style={{width:'40px'}}/> */}
          {timer}<span className='s'>s</span></span></div>
        <div id='quiz-score'>Score: {score}</div>
        <WoodInput
          placeholder="Enter your word"
          value={inputWord}
          onChange={handleInputChange}
          onEnter={handleWordSubmit}
          style={{maxWidth:'40vw',width:"40vw"}}
        />
        <button onClick={handleWordSubmit} className='wood-button' style={{marginTop:'5vh'}}>Submit</button>
      </div>
      <div id='corrected-words'>
        {/* Display correct words */}
        <span className='heading'>Correct Words:</span>
        <ul>
          {correctWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizPage;
