import React, { useState, useEffect } from 'react';
import WoodInput from '../../components/WoodInput'; // Assume you have a WoodInput component
import axios from 'axios';
import { useWordChecker } from 'react-word-checker';
import { useNavigate } from 'react-router-dom';


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
  const [timer, setTimer] = useState(20); // 2 minutes in seconds

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
    const validWord = [...inputWord].every((letter) => letters.includes(letter) );
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

    const code = localStorage.getItem('gameCode');
    //giving status to change state to finish quiz
    const response2 = await axios.post('/api/quiz/finish-quiz',{code:code});
    console.log(response2.data);

    // Redirect to the scoreboard page
    navigate('/StudentScoreboard');
  };

  return (
    <div>
      <div>
        {/* Display letters */}
        {letters.map((letter, index) => (
          <div key={index} style={{ display: 'inline-block', margin: '5px', fontSize: '20px' }}>
            {letter}
          </div>
        ))}
      </div>
      <div>
        {/* Display timer, score, and input field */}
        <div>Timer: {timer}s</div>
        <div>Score: {score}</div>
        <WoodInput
          placeholder="Enter your word"
          value={inputWord}
          onChange={handleInputChange}
          onEnter={handleWordSubmit}
        />
        <button onClick={handleWordSubmit}>Submit</button>
      </div>
      <div>
        {/* Display correct words */}
        <div>Correct Words:</div>
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
