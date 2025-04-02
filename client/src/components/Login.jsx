import { useState, useContext, useEffect } from "react";
import context from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLogedIn, setUserName } = useContext(context);

  useEffect(() => {
    const fetchLoginInfo = async () => {
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
        if (success) {
          toast.success(response.data.message);
          setIsLogedIn(true);
          setUserName(response.data.user.name);
          navigate("/");
        }
      } catch (error) {
        setIsLogedIn(false);
        navigate("/login");
      }
    }
    fetchLoginInfo();
  }, [])

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
      setUserName(response.data.user.name);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-400 mb-2">
            Typing Clash
          </h1>
          <p className="text-gray-300 text-lg">
            Test your typing speed and compete with others
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">
            Welcome Back
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
