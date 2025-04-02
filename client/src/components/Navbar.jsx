import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import context from "../context/context";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { text1, text2, text3, setCurrentText, setIsMultiplayer, setIsLogedIn, userName } =
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-indigo-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="ml-3">
              <span className="text-indigo-400 font-semibold">Typing Clash</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* User Name Display */}
            <div className="text-gray-300 font-medium">
              Welcome, {userName}
            </div>

            {/* Modes Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsModesOpen(!isModesOpen)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                Modes
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isModesOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <button
                      onClick={() => {
                        setIsMultiplayer(false);
                        setIsModesOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                    >
                      Single Player
                    </button>
                    <button
                      onClick={() => {
                        setIsMultiplayer(true);
                        setIsModesOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                    >
                      Multiplayer
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Levels Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLevelsOpen(!isLevelsOpen)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                Levels
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isLevelsOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <button
                      onClick={() => {
                        setCurrentText(text1);
                        setIsLevelsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                    >
                      Easy
                    </button>
                    <button
                      onClick={() => {
                        setCurrentText(text2);
                        setIsLevelsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => {
                        setCurrentText(text3);
                        setIsLevelsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                    >
                      Hard
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



