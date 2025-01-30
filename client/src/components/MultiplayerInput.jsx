import React, { useEffect, useContext, useState } from "react";
import context from "../context/context";
import toast from "react-hot-toast";
const MultiplayerInterface = () => {
  const { socket, room, setRoom, setPlayers, gameStarted } =
    useContext(context);
    const [socketId, setSocketId]= useState(socket.id);

    useEffect(() => {
      socket.on("connect", () => {
        setSocketId(socket.id);
      });
      
    }, []);    
  useEffect(() => {
    // Listen for updates to the player list
    socket.on("playerList", (playerList) => {
      if (playerList.length <= 4) {
        setPlayers(playerList);
      } else {
        toast.error("The room is full! Please try joining another room.");
      }
    });
    socket.on('joinMessage',(message)=>{
      toast.success(message)
    })
    // Listen for player stats updates
    socket.on("playerStats", (stats) => {
      setPlayers((prevPlayers) => {
        return prevPlayers.map((player) =>
          player.id === stats.id ? { ...player, ...stats } : player
        );
      });
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      socket.off("playerList");
      socket.off("playerStats");
    };
  }, [socket]);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("joinRoom", { room, message: `${socketId} joined room ${room}` });
  };

  return (
    
    <div className=" flex flex-col items-center  rounded-2xl bg-[#a8dfee] border-4 border-[#268da9]  h-[80px] w-[350px]">
      <div className="font-semibold pt-2 ">Your ID: {socketId}</div>
      {!gameStarted && (
        <form onSubmit={handleJoinRoom}>
          <div className="flex  gap-2 ">
            <div>
              <input
                className="border-2 border-black rounded-md"
                type="text"
                placeholder=" Room name"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                
              />
            </div>
            <div className="bg-green-500 rounded-md text-sm border border-black py-1 px-2">
              <button type="submit">Join Room</button>
            </div>
          </div>
        </form>
      )}
    </div>

  );
};

export default MultiplayerInterface;
