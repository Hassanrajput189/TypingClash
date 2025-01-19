import "./App.css";
import Home from "./components/Home"
import { useState, useEffect,useContext } from "react";
import toast from 'react-hot-toast'
import context from "./context/context"
import axios from "axios";


function App() {

  const {socket, setText1, setText2,setText3,setCurrentText} = useContext(context);
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id.toString());
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`http://localhost:5000/api/users/text`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setText1(response.data.text1);
        setText2(response.data.text2);
        setText3(response.data.text3);
        setCurrentText(response.data.text1); // Set initial text for typing interface
      } catch (error) {
        console.log(error.message);
        if (error.response) {
          toast.error(error.response.data.message || "Unknown error");
        } else if (error.request) {
          toast.error("No response from server. Please try again.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    };

    fetchData();
  },[]); 

  return (
    <div >
      <Home/>
    </div>
  );
}

export default App;
