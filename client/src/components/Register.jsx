import {useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"
const Register = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/users/register`,
        {
          name,
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
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl text-center font-bold mb-4">Welcome <br /> to  <br />Typing Clash</h1>
      <p className="text-xl mb-8">Please Sign up to continue</p>
      <div className="border-4 border-[#268da9] bg-[#a8dfee] md:w-[30vw] w-[80vw] p-8 flex flex-col items-center rounded-xl ">
        <h2 className="text-3xl font-bold mb-6">Sign up</h2>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4 w-full">
        <div>
            <input
              type="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
              className="py-2 px-3 rounded-md w-full border border-black"
            />
          </div>
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
              Sign up
            </button>
          </div>
        </form>
        <div className="mt-6">
          <p className="text-lg">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
