import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GameList = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [gamesPopular, setGamesPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://free-to-play-games-database.p.rapidapi.com/api/games",
          {
            params: {
              "sort-by": selectedSort,
            },
            headers: {
              "X-RapidAPI-Key":
                "7ed3d33c1cmshbe8f8583a0efa6cp1629a1jsncf6bf4dabdb6",
              "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
          }
        );
        console.log("Response data:", response.data);
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load games. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [selectedSort]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://free-to-play-games-database.p.rapidapi.com/api/games",
          {
            params: {
              "sort-by": "popularity",
            },
            headers: {
              "X-RapidAPI-Key":
                "7ed3d33c1cmshbe8f8583a0efa6cp1629a1jsncf6bf4dabdb6",
              "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
          }
        );
        console.log("Response data:", response.data);
        setGamesPopular(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load games. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.trim();
    setSearchTerm(term);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#272A2F]">
      <div className=" flex gap-4 py-4 px-4 bg-[#32383E] mb-2">
        <button
          className=" text-[#AAAAAA] font-bold"
          onClick={() => {
            navigate("/");
          }}
        >
          HOME
        </button>
        <button
          className=" text-[#AAAAAA] font-bold"
          onClick={() => {
            navigate("/Game-Category");
          }}
        >
          CATEGORY
        </button>
      </div>

      <div className="px-4 pb-3 text-[#AAAAAA] text-[30px] font-bold">
        Popular Games 2024
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mb-4">
        {gamesPopular.slice(0, 3).map((game) => (
          <div
            key={game.id}
            onClick={() => {
              navigate("/Game-Details", { state: { id: game.id } });
            }}
            className="bg-[#32383E] rounded-lg overflow-hidden shadow-lg flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="flex-1">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4 flex justify-between">
              <div>
                <p className="font-semibold text-md text-gray-400">
                  {game.title}
                </p>
                <p className=" mt-2 inline-block text-sm bg-gray-400 text-[#32383E] p-1 rounded-md font-semibold">
                  {game.genre}
                </p>
              </div>
              <div>
                {game.platform.includes("PC") && (
                  <div className=" bg-blue-500 text-white px-1 py-1 text-xs font-semibold rounded-md">
                    PC
                  </div>
                )}
                {game.platform === "Web Browser" && (
                  <div className=" bg-blue-500 text-white px-1 py-1 text-xs font-semibold rounded-md">
                    Web
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 flex justify-between px-4">
        <input
          type="text"
          placeholder="Search by game name..."
          className="p-2 border border-gray-300 rounded-md w-full mr-2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={selectedSort}
          onChange={handleSortChange}
        >
          <option value="">All</option>
          <option value="release-date">Release Date</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="popularity">popularity</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-screen bg-[#272A2F]">
          <div className=" text-gray-500">Loading...</div>
        </div>
      )}
      {!loading && filteredGames.length === 0 && (
        <p className="text-center font-bold text-gray-600">No games found...</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => {
              navigate("/Game-Details", { state: { id: game.id } });
            }}
            className="bg-[#32383E] rounded-lg overflow-hidden shadow-lg flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="flex-1">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4 flex justify-between">
              <div>
                <p className="font-semibold text-md text-gray-400">
                  {game.title}
                </p>
                <p className=" mt-2 inline-block text-sm bg-gray-400 text-[#32383E] p-1 rounded-md font-semibold">
                  {game.genre}
                </p>
              </div>
              <div className="">
                {game.platform.includes("PC") && (
                  <div className=" bg-blue-500 text-white px-1 py-1 text-xs font-semibold rounded-md">
                    PC
                  </div>
                )}
                {game.platform === "Web Browser" && (
                  <div className=" bg-blue-500 text-white px-1 py-1 text-xs font-semibold rounded-md">
                    Web
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
