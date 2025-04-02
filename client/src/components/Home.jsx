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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          {/* Multiplayer Dashboard */}
          <div
            className={`w-full transition-all duration-500 ease-in-out transform ${
              showMultiFunc
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0 pointer-events-none"
            }`}
          >
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <MultiplayerDashboard />
            </div>
          </div>

          {/* Typing Interface */}
          <div className="w-full">
            <TypingInterface />
          </div>

          {/* Show Players (Only in multiplayer mode) */}
          <div
            className={`w-full transition-all duration-500 ease-in-out transform ${
              showMultiFunc
                ? " opacity-100"
                : " opacity-0 pointer-events-none"
            }`}
          >
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <div className="h-[200px] overflow-y-auto">
                {room && <ShowPlayers players={players} />}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;



