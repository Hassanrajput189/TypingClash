import { useContext, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Note from './Note';
import TypingInterface from './TypingInterface';
import MultiplayerDashboard from './MultiplayerDashboard';
import Footer from './Footer';
import context from '../context/context';

const Home = () => {
  const { isMultiplayer } = useContext(context);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    if (isMultiplayer) {
      setShowDashboard(true);
      setShowNote(true);
    } else {
      setShowDashboard(false);
      setShowNote(false);
    }
  }, [isMultiplayer]);

  return (
    <div className="h-screen flex items-center flex-col ">
      <Navbar />
      <div className={`mt-[120px] flex w-full gap-16 h-[80vh] ${isMultiplayer ? "justify-end" : "justify-center"}`}>
        
          <div
            className={`transition-all duration-500 ease-in-out ${showNote ? 'translate-x-0' : 'translate-x-[-100%]'} `}
          >
            <Note />
          </div>
        
        <TypingInterface />
        
          <div
            className={`transition-all duration-500 ease-in-out ${showDashboard ? 'translate-x-0' : 'translate-x-[100%]'} `}
          >
            <MultiplayerDashboard />
          </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default Home;