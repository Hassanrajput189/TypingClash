import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import context from "../context/context"

const TypingInterface = () => {
  const maxTime = 60;
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [mistakes, setMistakes] = useState(0);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const charRef = useRef([]);
  const [correctWrong, setCorrectWrong] = useState([]);
  const { socket, currentText,setGameStarted,isMultiplayer,players } = useContext(context);

  useEffect(() => {
    setCorrectWrong(Array(currentText.length).fill(''));
  }, [currentText]); // Add currentText as a dependency
  
  useEffect(() => {
    let interval;
    
    if (isTyping) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            setIsTyping(false); // Stop typing when time runs out
            return 0;
          }
        });
      }, 1000);
    }
  
    return () => clearInterval(interval);
  }, [isTyping]); // Timer logic only depends on isTyping
  
  useEffect(() => {
    if (timeLeft === 0 || charIndex === currentText.length) {
      setIsTyping(false); // Stop typing if time is up or text is complete
    }
    let wpm,cpm;
    const correctChars = charIndex - mistakes;
    const timeElapsed = maxTime - timeLeft;
    if (timeElapsed > 0) {
      cpm = (correctChars / timeElapsed) * 60;
      wpm = Math.round((correctChars / 5 / timeElapsed) * 60);
      setCPM(cpm > 0 ? parseInt(cpm, 10) : 0);
      setWPM(wpm > 0 ? wpm : 0);
    }
    socket.emit('updateStats', { wpm, cpm: parseInt(cpm, 10), mistakes });
  }, [timeLeft, charIndex,socket]);
  
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const inputLength = inputValue.length;
  
    if (timeLeft > 0) {
      if (!isTyping) {
        setIsTyping(true); // Start typing
      }
  
      const newCorrectWrong = [...correctWrong];
  
      for (let i = 0; i < currentText.length; i++) {
        if (i < inputLength) {
          newCorrectWrong[i] = inputValue[i] === currentText[i] ? "correct" : "wrong";
        } else {
          newCorrectWrong[i] = ""; // Reset for untyped characters
        }
      }
  
      const newMistakes = newCorrectWrong.filter((status) => status === "wrong").length;
  
      setCharIndex(inputLength);
      setMistakes(newMistakes);
      setCorrectWrong(newCorrectWrong);
  
      if (inputLength === currentText.length) {
        setIsTyping(false); // Stop typing if input matches text length
      }
    }
  };
  
    const handleInput = () => {
      document.body.addEventListener("mouseover", () => {
        inputRef.current.focus();
      });
    };
    
  
  const resetGame = () => {
    setCorrectWrong(Array(currentText.length).fill(''));
    handleInput();
    setIsTyping(false);
    setTimeLeft(maxTime);
    setCharIndex(0);
    setMistakes(0);
    setCPM(0);
    setWPM(0);

    if(isMultiplayer && players.length){
      setGameStarted(true);
    }

    // Reset charRef
    charRef.current.forEach((charSpan) => {
    
      if (charSpan) {
        charSpan.className = ''; // Remove all classes
      }
      
    });
  
    // Clear input field
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="bg-[#a8dfee] border-4 border-[#268da9] w-[60vw] h-[50vh] rounded-lg text-[#024a61] font-bold overflow-hidden ">
      <div className="p-4">
        <p id="textPara" className="text-3xl h-80 overflow-hidden select-none">
          {currentText.split("").map((char, index) => (
            <span 
              key={index}
              className={`${index === charIndex ? "border-b-4 border-[#fc8124]" : ""} ${correctWrong[index]}`}  
              ref={(e) => charRef.current[index] = e}
            >
              {char}
            </span>
          ))}
        </p>
        <div id="inputField">
          <input
            className="opacity-0 z-[-999] absolute"
            type="text"
            id="textInput"
            ref={inputRef}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-around items-center pt-4">
          <p>
            Time Left: <strong>{timeLeft}</strong>
          </p>
          <p>
            Mistakes: <strong>{mistakes}</strong>
          </p>
          <p>
            WPM: <strong>{WPM}</strong>
          </p>
          <p>
            CPM: <strong>{CPM}</strong>
          </p>
          <button className="bg-[#fc8124] border-4 border-[#e36e07] rounded-full text-black px-2 py-1 font-semibold transition-transform duration-300 transform hover:bg-[#ffad5c] hover:scale-105" onClick={resetGame}>
            {isTyping ? "Try Again" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypingInterface;
