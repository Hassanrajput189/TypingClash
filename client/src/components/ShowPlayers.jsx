
const ShowPlayers = ({ players }) => {
  
  return (
  
      <div className="grid md:grid-cols-2 gird-cols-1 gap-y-4 gap-x-10">
        {players.map((player, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow flex flex-col"
          >
            <div className="font-medium text-base mb-2">
              Player ID: {player.id}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-blue-100 px-2 py-1 rounded text-center">
                {player.wpm !== undefined ? `WPM: ${player.wpm}` : "WPM: -"}
              </div>
              <div className="bg-green-100 px-2 py-1 rounded text-center">
                {player.cpm !== undefined ? `CPM: ${player.cpm}` : "CPM: -"}
              </div>
              <div className="bg-red-100 px-2 py-1 rounded text-center">
                {player.mistakes !== undefined
                  ? `Mistakes: ${player.mistakes}`
                  : "Mistakes: -"}
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};

export default ShowPlayers;


