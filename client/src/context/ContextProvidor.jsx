import { useState, useMemo } from "react";
import io from "socket.io-client";
import UserContext from "./context";
const ContextProvidor = ({ children }) => {
  
  
  const socket = useMemo(() => {
    return io("http://localhost:5000", { 
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });
  }, []); 
  
  const maxTime = 60;
  const [mistakes, setMistakes] = useState(0);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [room, setRoom] = useState("");
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [isMobile,setIsMobile] = useState(false);
  const [isPC,setIsPC] = useState(false);
  const [players, setPlayers] = useState([]);  
  const [userName, setUserName] = useState("");  
  return (
    <UserContext.Provider
      value={{
        socket,
        maxTime,
        text1,
        text2,
        text3,
        WPM,
        CPM,
        mistakes,
        timeLeft,
        currentText,
        isLogedIn,
        isMultiplayer,
        gameStarted,
        gameEnded,
        room,
        isMobile,
        isPC,
        players,
        userName,
        setText1,
        setText2,
        setText3,
        setWPM,
        setCPM,
        setMistakes,
        setTimeLeft,
        setCurrentText,
        setIsLogedIn,
        setIsMultiplayer,
        setGameStarted,
        setGameEnded,
        setRoom,
        setIsMobile,
        setIsPC,
        setPlayers,
        setUserName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvidor;
