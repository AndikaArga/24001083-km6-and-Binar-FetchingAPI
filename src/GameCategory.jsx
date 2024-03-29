import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GameCategory = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");
  const [gamesPopular, setGamesPopular] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://free-to-play-games-database.p.rapidapi.com/api/games",
          {
            params: {
              platform: platform || undefined,
              category: category || undefined,
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load games. Please try again later.");
        setLoading(false); // Set loading to false even if error occurs
      }
    };

    fetchGames();
  }, [platform, category]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://free-to-play-games-database.p.rapidapi.com/api/games",
          {
            params: {
              platform: platform || undefined,
              category: category || undefined,
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
  }, [platform, category]);

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#272A2F]">
      <div className="flex gap-4 py-4 px-4 bg-[#32383E] mb-2">
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
      <div className="px-4 pb-3 text-[#AAAAAA] text-[30px] font-bold">
        Popular {platform} {category} Games 2024
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mb-4">
        {gamesPopular && gamesPopular.length > 0 ? (
          gamesPopular.slice(0, 3).map((game) => (
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
          ))
        ) : (
          <p className="text-gray-600">No games found.</p>
        )}
      </div>
      <div className="flex gap-4 pb-4 px-4">
        <select
          className="p-2 border bg-gray-400 border-gray-400 text-[#32383E] font-semibold rounded-md"
          value={platform}
          onChange={handlePlatformChange}
        >
          <option value="">Select Platform</option>
          <option value="pc">PC</option>
          <option value="browser">Web Browser</option>
        </select>
        <select
          className="p-1 border bg-gray-400 border-gray-400 text-[#32383E] font-semibold rounded-md"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          <option value="mmorpg">MMORPG</option>
          <option value="shooter">Shooter</option>
          <option value="strategy">Strategy</option>
          <option value="moba">MOBA</option>
          <option value="racing">Racing</option>
          <option value="sports">Sports</option>
          <option value="social">Social</option>
          <option value="sandbox">Sandbox</option>
          <option value="open-world">Open World</option>
          <option value="survival">Survival</option>
          <option value="pvp">PvP</option>
          <option value="pve">PvE</option>
          <option value="pixel">Pixel</option>
          <option value="voxel">Voxel</option>
          <option value="zombie">Zombie</option>
          <option value="turn-based">Turn-Based</option>
          <option value="first-person">First Person</option>
          <option value="third-person">Third Person</option>
          <option value="top-down">Top-Down</option>
          <option value="tank">Tank</option>
          <option value="space">Space</option>
          <option value="sailing">Sailing</option>
          <option value="side-scroller">Side-Scroller</option>
          <option value="superhero">Superhero</option>
          <option value="permadeath">Permadeath</option>
          <option value="card">Card</option>
          <option value="battle-royale">Battle Royale</option>
          <option value="mmo">MMO</option>
          <option value="mmofps">MMOFPS</option>
          <option value="mmotps">MMOTPS</option>
          <option value="3d">3D</option>
          <option value="2d">2D</option>
          <option value="anime">Anime</option>
          <option value="fantasy">Fantasy</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="fighting">Fighting</option>
          <option value="action-rpg">Action RPG</option>
          <option value="action">Action</option>
          <option value="military">Military</option>
          <option value="martial-arts">Martial Arts</option>
          <option value="flight">Flight</option>
          <option value="low-spec">Low Spec</option>
          <option value="tower-defense">Tower Defense</option>
          <option value="horror">Horror</option>
          <option value="mmorts">MMORTS</option>
        </select>
      </div>
      {loading && (
        <div className="flex justify-center items-center h-screen bg-[#272A2F]">
          <div className=" text-gray-500">Loading...</div>
        </div>
      )}
      {!loading && error && <p className="text-center text-red-600">{error}</p>}
      {!loading && games.length === 0 && (
        <p className="text-center text-gray-600">No games found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {games && games.length > 0 ? (
          games.map((game) => (
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
                  <p className="mt-2 inline-block text-sm bg-gray-400 text-[#32383E] p-1 rounded-md font-semibold">
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
          ))
        ) : (
          <p className=" text-gray-600">No games found.</p>
        )}
      </div>
    </div>
  );
};

export default GameCategory;
