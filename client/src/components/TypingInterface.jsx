import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import context from "../context/context";
import toast from "react-hot-toast";
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
  const { socket, currentText,players, isMultiplayer,setGameStarted,setGameEnded } = useContext(context);

  useEffect(() => {
    if (currentText && isMultiplayer !== undefined) {
        resetGame();
    }
}, [currentText, isMultiplayer]);


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
            setGameEnded(true);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {

      clearInterval(interval);
    }
  }, [isTyping]); // Timer logic only depends on isTyping

  useEffect(() => {
    if (timeLeft === 0) {
      setIsTyping(false); // Stop typing if time is up or text is complete
      setGameEnded(true); 
    }
    let wpm, cpm;
    const correctChars = charIndex - mistakes;
    const timeElapsed = maxTime - timeLeft;
    if (timeElapsed > 0) {
      cpm = (correctChars / timeElapsed) * 60;
      wpm = Math.round((correctChars / 5 / timeElapsed) * 60);
      setCPM(cpm > 0 ? parseInt(cpm, 10) : 0);
      setWPM(wpm > 0 ? wpm : 0);
    }
    socket.emit("updateStats", { wpm, cpm: parseInt(cpm, 10), mistakes });
  }, [timeLeft, charIndex, socket]);

  const handleChange = (e) => {
    const inputChar = e.target.value; // Get the current character typed
    const inputLength = inputChar.length;

    if (timeLeft > 0 && inputLength > 0) {
      if (!isTyping) {
        setIsTyping(true); // Start the typing timer
      }

      const currentChar = inputChar[inputChar.length - 1]; // Get the last typed character
      const newCorrectWrong = [...correctWrong];

      // Compare the current character with the corresponding character in currentText
      if (currentText[charIndex] === currentChar) {
        newCorrectWrong[charIndex] = "correct";
      } else {
        newCorrectWrong[charIndex] = "wrong";
      }

      const newMistakes = newCorrectWrong.filter(
        (status) => status === "wrong"
      ).length;

      setCharIndex((prevIndex) => prevIndex + 1);
      setMistakes(newMistakes);
      setCorrectWrong(newCorrectWrong);

      // Stop typing when reaching the end of the text
      if (charIndex + 1 === currentText.length) {
        setIsTyping(false);
        setGameEnded(true);
      }
    }

    e.target.value = ""; // Clear the input field after processing
  };

  const focusInput = () => {
    if (inputRef.current) {
        inputRef.current.focus();
    }
   };
  const resetGame = () => {
    setCorrectWrong(Array(currentText.length).fill(""));
    setIsTyping(false);
    setTimeLeft(maxTime);
    setCharIndex(0);
    setMistakes(0);
    setCPM(0);
    setWPM(0);

    // Reset charRef
    let charSpan = charRef.current;
    charSpan.forEach(() => {
      charSpan.className = ""; // Remove all classes
    });
    charSpan.className = "border-b-4 border-[#fc8124]";

    // Clear input field
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const startGame = () => {
    if (isMultiplayer &&  players.length === 0) {
      toast.error("You must be in a multiplayer room to start the game.");
      
    }
    else if (isMultiplayer  && players.length < 2 && players.length >= 1) {
      toast.error("There should be a minimum of 2 players in the room.");
      
    }
    else {
      setGameStarted(true);
      setGameEnded(false);
      resetGame();
      focusInput();
      toast.success("Game started!");
    }
    
    
  };

  return (
    <div className="bg-[#a8dfee] border-4 border-[#268da9] md:w-[60vw] w-[95vw]  h-[50vh]  rounded-2xl text-[#024a61] font-bold overflow-hidden">
      <div className="p-4">
        <p
        
          id="textPara"
          className=" h-72 overflow-hidden select-none md:text-2xl sm:text-xl text-lg"
        >
          
          {currentText.split("").map((char, index) => (
            <span
              key={index}
              className={`${
                index === charIndex ? "border-b-4 border-[#fc8124]" : ""
              } ${correctWrong[index]}`}
              ref={(e) => (charRef.current[index] = e)}
            >
              {char}
            </span>
          ))}
        </p>
          
        <div id="inputField">
          <input
            className="z-[-999] opacity-0 absolute"
            type="text"
            id="textInput"
            ref={inputRef}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-around items-center pt-4 md:text-lg text-sm">
        
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

          <button
            id="button"
            className="w-fit h-fit text-sm bg-[#fc8124] border border-black rounded-full text-black px-2 py-1 font-semibold transition-transform duration-300 transform hover:bg-[#ffad5c] hover:scale-105"
            onClick={startGame}
          >
            {isTyping ? "Try Again" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypingInterface;
