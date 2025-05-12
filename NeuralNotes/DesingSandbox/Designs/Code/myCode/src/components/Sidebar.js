import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const [activePage, setActivePage] = useState('home');

  // Listen for navigation events to update active page
  useEffect(() => {
    const handleNavigation = (event) => {
      if (event.detail && event.detail.destination) {
        setActivePage(event.detail.destination);
      }
    };
    
    document.addEventListener('navigate', handleNavigation);
    return () => document.removeEventListener('navigate', handleNavigation);
  }, []);

  // Handle navigation click
  const handleNavClick = (page) => {
    setActivePage(page);
    document.dispatchEvent(new CustomEvent('navigate', { detail: { destination: page } }));
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button 
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-black text-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -60 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`${darkMode ? 'bg-black' : 'bg-gray-900'} text-gray-300 w-[60px] transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-10 flex flex-col border-r border-gray-800`}
      >
        {/* App Icon */}
        <div className="p-4 flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-1 rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col items-center py-4 space-y-6">
          {/* Home */}
          <div className="relative">
            {activePage === 'home' && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.button 
              onClick={() => handleNavClick('home')} 
              className={`flex items-center justify-center w-full py-2 ${activePage === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-200`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </motion.button>
          </div>

          {/* Notes */}
          <div className="relative">
            {activePage === 'notes' && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.button 
              onClick={() => handleNavClick('notes')} 
              className={`flex items-center justify-center w-full py-2 ${activePage === 'notes' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-200`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </motion.button>
          </div>

          {/* Canvas */}
          <div className="relative">
            {activePage === 'canvas' && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 w-1 h-8 bg-yellow-500 rounded-r-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.button 
              onClick={() => handleNavClick('canvas')} 
              className={`flex items-center justify-center w-full py-2 ${activePage === 'canvas' ? 'text-yellow-500' : 'text-gray-400 hover:text-white'} transition-colors duration-200`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </motion.button>
          </div>
          
          {/* To-Do */}
          <div className="relative">
            {activePage === 'todo' && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.button 
              onClick={() => handleNavClick('todo')} 
              className={`flex items-center justify-center w-full py-2 ${activePage === 'todo' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-200`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </motion.button>
          </div>
          
          {/* Calendar */}
          <div className="relative">
            {activePage === 'calendar' && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.button 
              onClick={() => handleNavClick('calendar')} 
              className={`flex items-center justify-center w-full py-2 ${activePage === 'calendar' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors duration-200`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </motion.button>
          </div>
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;
