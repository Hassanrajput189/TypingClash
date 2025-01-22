import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import context from "../context/context";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { text1, text2, text3, setCurrentText, setIsMultiplayer, setIsLogedIn } =
    useContext(context);
  const navigate = useNavigate();

  const [isModesOpen, setIsModesOpen] = useState(false);
  const [isLevelsOpen, setIsLevelsOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/users/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsLogedIn(false);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Unknown error");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center bg-[#a8dfee] shadow-lg w-[95vw] p-3 border-2 border-black rounded-full mt-6">
      <div className="pl-6">
        <img src="vite.svg" alt="Typing Clash" />
      </div>
      <div className="flex justify-end w-[90%] gap-10">
        <div
          className="rounded-full bg-[#fc8124] border-2 border-black px-2 py-1 font-semibold transition-transform duration-300 transform hover:bg-[#ffad5c] hover:scale-105 hover:border-[#00000080] cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </div>
        {/* Modes Dropdown */}
        <div id="modes" className="relative group cursor-pointer">
          <div
            className="rounded-full bg-[#fc8124] border-2 border-black px-2 py-1 font-semibold transition-transform duration-300 transform hover:bg-[#ffad5c] hover:scale-105 hover:border-[#00000080]"
            onClick={() => setIsModesOpen(!isModesOpen)}
          >
            Modes
          </div>
          {isModesOpen && (
            <ul className="absolute flex-col gap-2 mt-1 list-none bg-[#fc8124] rounded-lg shadow-lg z-10 cursor-pointer border border-black">
              <li
                className="hover:bg-[#ffad5c] px-4 py-2 pr-10 border-b border-black rounded transition-all duration-300 ease-in-out"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMultiplayer(false);
                  setIsModesOpen(false); // Close the menu after clicking
                  toast.success("Singleplayer mode selected")
                }}
              >
                Singleplayer
              </li>
              <li
                className="hover:bg-[#ffad5c] px-4 py-2 pr-10 border-b border-black rounded transition-all duration-300 ease-in-out"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMultiplayer(true);
                  setIsModesOpen(false); // Close the menu after clicking
                  toast.success("Multiplayer mode selected")
                }}
              >
                Multiplayer
              </li>
            </ul>
          )}
        </div>
        {/* Levels Dropdown */}
        <div id="levels" className="relative group cursor-pointer">
          <div
            className="rounded-full bg-[#fc8124] border-2 border-black px-2 py-1 font-semibold transition-transform duration-300 transform hover:bg-[#ffad5c] hover:scale-105 hover:border-[#00000080]"
            onClick={() => setIsLevelsOpen(!isLevelsOpen)}
          >
            Levels
          </div>
          {isLevelsOpen && (
            <ul className="absolute flex-col gap-2 mt-1 list-none bg-[#fc8124] rounded-lg shadow-lg z-10 cursor-pointer border border-black">
              <li
                className="hover:bg-[#ffad5c] px-4 py-2 pr-10 border-b border-black rounded transition-all duration-300 ease-in-out"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentText(text1);
                  setIsLevelsOpen(false); // Close the menu after clicking
                }}
              >
                level 1
              </li>
              <li
                className="hover:bg-[#ffad5c] px-4 py-2 pr-10 border-b border-black rounded transition-all duration-300 ease-in-out"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentText(text2);
                  setIsLevelsOpen(false); // Close the menu after clicking
                }}
              >
                level 2
              </li>
              <li
                className="hover:bg-[#ffad5c] px-4 py-2 pr-10 border-b border-black rounded transition-all duration-300 ease-in-out"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentText(text3);
                  setIsLevelsOpen(false); // Close the menu after clicking
                }}
              >
                level 3
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;