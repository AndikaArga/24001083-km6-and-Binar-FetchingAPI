import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function GameDetails() {
  let location = useLocation();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          "https://free-to-play-games-database.p.rapidapi.com/api/game",
          {
            params: { id: location.state.id },
            headers: {
              "X-RapidAPI-Key":
                "7ed3d33c1cmshbe8f8583a0efa6cp1629a1jsncf6bf4dabdb6",
              "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
          }
        );

        setGame(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load game details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [location.state.id]);

  return (
    <div className="min-h-screen bg-[#272A2F]">
      <div className="flex gap-4 py-4 px-4 bg-[#32383E] mb-4">
        <button
          className=" text-[#AAAAAA] font-bold"
          onClick={() => navigate("/")}
        >
          HOME
        </button>
        <button
          className=" text-[#AAAAAA] font-bold"
          onClick={() => navigate("/Game-Category")}
        >
          CATEGORY
        </button>
      </div>
      {loading && (
        <div className="flex justify-center items-center h-screen bg-[#272A2F]">
          <div className="text-gray-500">Loading...</div>
        </div>
      )}
      {!loading && error && (
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-red-600">{error}</p>
        </div>
      )}
      {!loading && !error && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-[#AAAAAA] mb-4">
            Game Details
          </h2>
          <div className="bg-[#32383E] shadow-md rounded px-8 py-6 flex gap-4 max-lg:flex-col">
            <div className="">
              <img
                src={game?.thumbnail}
                alt={game?.title}
                className="rounded-lg mb-4 w-[600px] max-lg:w-full"
              />

              <p className="text-gray-400 mb-4">
                <a
                  href={game?.game_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" bg-[#4799EB] py-2 flex justify-center rounded-md text-white font-bold"
                >
                  Play Now
                </a>
              </p>
            </div>
            <div>
              <p className="text-lg font-bold mb-2 text-gray-300">
                {game?.title}
              </p>
              <p className="text-gray-400 mb-4">
                Description: {game?.short_description}
              </p>
              <p className="text-gray-400 mb-4">Developer: {game?.developer}</p>
              <p className="text-gray-400 mb-4">Publisher: {game?.publisher}</p>
              <p className="text-gray-400 mb-4">Genre: {game?.genre}</p>
              <p className="text-gray-400 mb-4">Platform: {game?.platform}</p>
              <p className="text-gray-400 mb-4">
                Release Date: {game?.release_date}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
