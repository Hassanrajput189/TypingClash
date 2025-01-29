import { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import TypingInterface from "./TypingInterface";
import MultiplayerDashboard from "./MultiplayerInput";
import Footer from "./Footer";
import context from "../context/context";
import ShowPlayers from "./ShowPlayers";

const Home = () => {
  const { room, players, isMultiplayer } = useContext(context);
  const [showMultiFunc, setShowMultiFunc] = useState(false);

  useEffect(() => {
    isMultiplayer ? setShowMultiFunc(true) : setShowMultiFunc(false);
  }, [isMultiplayer]);

  return (
    <div className="flex flex-col items-center w-full gap-4 min-h-screen">
      <Navbar />
      <div className={`flex flex-col items-center w-full gap-4 flex-grow`}>
        {/* Multiplayer Dashboard */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            showMultiFunc
              ? "translate-y-0 opacity-100 "
              : "translate-y-[-100%] opacity-0 z-[-999] "
          } `}
        >
          <MultiplayerDashboard />
        </div>

        {/* Typing Interface */}
        <div className="block ">
          <TypingInterface />
        </div>

        {/* Show Players (Only in multiplayer mode) */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            showMultiFunc
              ? "translate-y-0 opacity-100 "
              : "translate-y-[100%] opacity-0 z-[-999]"
          } `}
        >
          <div className="h-full max-h-[200px] overflow-y-auto w-full">
            {/* Ensure ShowPlayers content is scrollable */}
            {room && <ShowPlayers players={players} />}
            {/* <ShowPlayers/> */}
          </div>
        </div>
      </div>
      <div className="relative bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
