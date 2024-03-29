import React, { useState, useEffect } from "react";
import axios from "axios";

const NowPlaying = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://free-to-play-games-database.p.rapidapi.com/api/games",
          {
            headers: {
              "X-RapidAPI-Key":
                "7ed3d33c1cmshbe8f8583a0efa6cp1629a1jsncf6bf4dabdb6",
              "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
          }
        );
        console.log("Response data:", response.data); // Log the response data
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load games. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Now Playing Games</h1>
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {!loading && games.length === 0 && (
        <p className="text-center text-gray-600">No games found.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full object-cover rounded-t-lg"
                style={{ height: "200px" }}
              />
              <div className="absolute bottom-0 left-0 p-2 bg-black text-white opacity-75">
                <h2 className="text-lg font-semibold">{game.title}</h2>
                <p className="text-sm">{game.genre}</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-700">{game.short_description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowPlaying;
