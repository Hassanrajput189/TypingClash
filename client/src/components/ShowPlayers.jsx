const ShowPlayers = ({ players }) => {
  return (
    <div>
      <p className="text-lg font-medium mb-4">Players in Room:</p>
      <ul className="space-y-4">
        {players.map((player, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
            <div className="font-medium text-base mb-2">
              Player ID: {player.id}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-blue-100 px-2 py-1 rounded">
                {player.wpm !== undefined ? `WPM: ${player.wpm}` : "WPM: -"}
              </div>
              <div className="bg-green-100 px-2 py-1 rounded">
                {player.cpm !== undefined ? `CPM: ${player.cpm}` : "CPM: -"}
              </div>
              <div className="bg-red-100 px-2 py-1 rounded">
                {player.mistakes !== undefined
                  ? `Mistakes: ${player.mistakes}`
                  : "Mistakes: -"}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowPlayers;
