import React, { useEffect, useContext, useState } from "react";
import context from "../context/context";
import toast from "react-hot-toast";

const MultiplayerInput = () => {
  const { socket, room, setRoom, setPlayers, gameStarted, gameEnded } =
    useContext(context);
  const [socketId, setSocketId] = useState(socket.id);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("playerList", (playerList) => {
      if (playerList.length <= 4) {
        setPlayers(playerList);
      } else {
        toast.error("The room is full! Please try joining another room.");
      }
    });

    socket.on('message', (message) => {
      toast.success(message)
    });

    socket.on("playerStats", (stats) => {
      setPlayers((prevPlayers) => {
        return prevPlayers.map((player) =>
          player.id === stats.id ? { ...player, ...stats } : player
        );
      });
    });

    return () => {
      socket.off("playerList");
      socket.off("playerStats");
    };
  }, [socket]);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!room.trim()) {
      toast.error("Room name cannot be empty.");
      return;
    }
    socket.emit("joinRoom", { room, message: `${socketId} joined room ${room}` });
  };

  const handleCheckWinner = (e) => {
    e.preventDefault();
    socket.emit('checkWinner', room);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <div className="space-y-4">
          {/* Player ID Display */}
          <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
            <span className="text-sm font-medium text-gray-300">Your ID:</span>
            <span className="font-mono text-sm text-indigo-400">{socketId}</span>
          </div>

          {/* Game Controls */}
          <div className="space-y-4">
            {gameEnded && (
              <button
                onClick={handleCheckWinner}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Check Winner
              </button>
            )}

            {!gameStarted && (
              <form onSubmit={handleJoinRoom} className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Enter room name"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Join Room
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerInput;




