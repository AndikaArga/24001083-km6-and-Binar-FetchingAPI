import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GameList from "./GameList.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GameDeatils from "./GameDetails.jsx";
import GameCategory from "./GameCategory.jsx";

const router = createBrowserRouter([
  { path: "/", element: <GameList /> },
  { path: "/Game-Details", element: <GameDeatils /> },
  { path: "/Game-Category", element: <GameCategory /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
