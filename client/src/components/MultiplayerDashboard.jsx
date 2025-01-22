import React, { useEffect, useContext } from "react";
import ShowPlayers from "./ShowPlayers";
import context from "../context/context";
import toast from "react-hot-toast";
const MultiplayerInterface = () => {
  const { socket, room, setRoom, players, setPlayers, gameStarted } =
    useContext(context);

  useEffect(() => {
    // Listen for updates to the player list
    socket.on("playerList", (playerList) => {
      if (playerList.length <= 4) {
        setPlayers(playerList);
      } else {
        toast.error("The room is full! Please try joining another room.");
      }
    });

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
    socket.emit("joinRoom", room);
    toast.success(`${socket.id} joined room ${room}`);
  };

  return (
    <div className="h-[70vh] w-[18vw] rounded-l-3xl bg-[#a8dfee] border-4 border-[#268da9]">
      <div className="font-bold pt-4 pl-2">Your ID: {socket.id}</div>
      {!gameStarted && (
        <form onSubmit={handleJoinRoom}>
          <div className="flex gap-4 mb-4">
            <div>
              <input
                className="border-2 border-black rounded-md"
                type="text"
                placeholder="  Room name"
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
      {room && <ShowPlayers players={players} />}
    </div>
  );
};

export default MultiplayerInterface;
