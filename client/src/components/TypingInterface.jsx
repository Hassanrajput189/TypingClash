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
  const { socket, currentText, players, isMultiplayer, setGameStarted, setGameEnded } = useContext(context);

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
            setIsTyping(false);
            setGameEnded(true);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    }
  }, [isTyping]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsTyping(false);
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
    const inputChar = e.target.value;
    const inputLength = inputChar.length;

    if (timeLeft > 0 && inputLength > 0) {
      if (!isTyping) {
        setIsTyping(true);
      }

      const currentChar = inputChar[inputChar.length - 1];
      const newCorrectWrong = [...correctWrong];

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

      if (charIndex + 1 === currentText.length) {
        setIsTyping(false);
        setGameEnded(true);
      }
    }

    e.target.value = "";
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

    let charSpan = charRef.current;
    charSpan.forEach(() => {
      charSpan.className = "";
    });
    charSpan.className = "border-b-4 border-indigo-500";

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const startGame = () => {
    if (isMultiplayer && players.length === 0) {
      toast.error("You must be in a multiplayer room to start the game.");
    } else if (isMultiplayer && players.length < 2 && players.length >= 1) {
      toast.error("There should be a minimum of 2 players in the room.");
    } else {
      setGameStarted(true);
      setGameEnded(false);
      resetGame();
      focusInput();
      toast.success("Game started!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="relative">
        {/* Background Effects */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-30"></div>
        <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/10 via-transparent to-emerald-500/10 rounded-3xl blur-2xl opacity-20"></div>
        
        {/* Main Container */}
        <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50">
          {/* Typing Area */}
          <div className="relative p-8">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 via-transparent to-gray-800/50 pointer-events-none"></div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <p
                  id="textPara"
                  className="min-h-[180px] overflow-hidden select-none text-xl md:text-2xl leading-relaxed text-gray-300 font-mono"
                >
                  {currentText.split("").map((char, index) => (
                    <span
                      key={index}
                      className={`${
                        index === charIndex 
                          ? "border-b-4 border-indigo-500 bg-indigo-500/10 rounded-sm" 
                          : ""
                      } ${
                        correctWrong[index] === "correct"
                          ? "text-emerald-400"
                          : correctWrong[index] === "wrong"
                          ? "text-rose-400"
                          : "text-gray-300"
                      }`}
                      ref={(e) => (charRef.current[index] = e)}
                    >
                      {char}
                    </span>
                  ))}
                </p>
                <input
                  className="absolute inset-0 w-full h-full opacity-0 cursor-text"
                  type="text"
                  id="textInput"
                  ref={inputRef}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Stats Display */}
          <div className="relative px-8 pb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/90 to-gray-800/70 border-t border-gray-700/50"></div>
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-indigo-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="text-sm text-indigo-400 font-medium mb-1">Time Left</div>
                  <div className="text-3xl font-bold text-indigo-300">{timeLeft}s</div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-rose-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="text-sm text-rose-400 font-medium mb-1">Mistakes</div>
                  <div className="text-3xl font-bold text-rose-300">{mistakes}</div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-emerald-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="text-sm text-emerald-400 font-medium mb-1">WPM</div>
                  <div className="text-3xl font-bold text-emerald-300">{WPM}</div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="text-sm text-blue-400 font-medium mb-1">CPM</div>
                  <div className="text-3xl font-bold text-blue-300">{CPM}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Control Button */}
          <div className="p-6 flex justify-center">
            <button
              id="button"
              onClick={startGame}
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/20"
            >
              <span className="relative z-10">{isTyping ? "Try Again" : "Start"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingInterface;
