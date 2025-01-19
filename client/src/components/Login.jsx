import { useState, useContext, useEffect } from "react";
import context from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setIsLogedIn } = useContext(context);

  const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`http://localhost:5000/api/users/login`,
            {
              email,
              password,
            },
            {
              headers: {
                "Content-Type": "application/json"
              },
              withCredentials: true
            }
            
          );
          toast.success(response.data.message);
          setIsLogedIn(true);
          navigate("/");
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

      useEffect(()=>{
      const fetchLoginInfo = async()=>{
        try {
          const response = await axios.get(`http://localhost:5000/api/users/loginInfo`,
            {
              headers: {
                "Content-Type": "application/json"
              },
              withCredentials: true
            }
          );

          const success = response.data.success;
          if(success){
            toast.success(response.data.message);
            setIsLogedIn(true);
            navigate("/");
          }
    
        } catch (error) {
          if (error.response) {
            toast.error(error.response.data.message || "Unknown error");
          } else if (error.request) {
            toast.error("No response from server. Please try again.");
          } else {
            toast.error("An error occurred. Please try again.");
          }
        }
      }
      fetchLoginInfo();
    },[])

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Typing Clash</h1>
      <p className="text-xl mb-8">Please Login to continue</p>
      <div className="border-4 border-[#268da9] bg-[#a8dfee] w-[30vw] p-8 flex flex-col items-center rounded-xl">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
          <div>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="py-2 px-3 rounded-md w-full border border-black"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="py-2 px-3 rounded-md w-full border border-black"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-[#fc8124] border-2 border-black px-4 py-2 rounded-full font-semibold transition-transform duration-300 transform hover:bg-[#ffad5c] hover:scale-105 hover:border-[#00000080]"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6">
          <p className="text-lg">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;