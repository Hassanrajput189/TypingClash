import { useContext } from 'react';
import Navbar from './Navbar';
import TypingInterface from './TypingInterface';
import MultiplayerDashboard from './MultiplayerDashboard';
import Footer from './Footer';
import context from '../context/context';


const Home = () => {
  const { isMultiplayer } = useContext(context);
  
  return (
    <div className="h-screen flex items-center flex-col ">
      <Navbar />
      <div className={`flex w-[90vw] gap-10 h-[80vh] items-center ${isMultiplayer ? "justify-end" : "justify-center"}`}>
        <TypingInterface />
        {/* Conditionally render MultiplayerDashboard if isMultiplayer is true */}
        {isMultiplayer && <MultiplayerDashboard />}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

