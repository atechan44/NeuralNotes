import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const UserAccountIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { darkMode } = useTheme();

  // Mock user data - in a real app, this would come from authentication context
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle navigation
  const handleNavigation = (destination) => {
    // In a real app, this would use a router
    console.log(`Navigating to: ${destination}`);
    document.dispatchEvent(new CustomEvent('navigate', { 
      detail: { destination } 
    }));
    setIsOpen(false);
  };

  // Handle sign out
  const handleSignOut = () => {
    console.log('Signing out');
    // In a real app, this would clear auth tokens, etc.
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Icon Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
          darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
        }`}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {user.avatar ? (
          <motion.img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <motion.div 
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              darkMode ? 'bg-yellow-600 text-white' : 'bg-yellow-500 text-gray-900'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {user.name.charAt(0).toUpperCase()}
          </motion.div>
        )}
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg ${
              darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
            }`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="py-1 rounded-md">
              {/* User Info */}
              <div className="px-4 py-3">
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.name}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {user.email}
                </p>
              </div>
              
              <hr className={darkMode ? 'border-gray-800' : 'border-gray-200'} />
              
              {/* Navigation Items */}
              <motion.button
                onClick={() => handleNavigation('profile')}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  darkMode 
                    ? 'text-gray-300 hover:bg-gray-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Profile
              </motion.button>
              
              <motion.button
                onClick={() => handleNavigation('settings')}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  darkMode 
                    ? 'text-gray-300 hover:bg-gray-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Settings
              </motion.button>
              
              <hr className={darkMode ? 'border-gray-800' : 'border-gray-200'} />
              
              {/* Sign Out */}
              <motion.button
                onClick={handleSignOut}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  darkMode 
                    ? 'text-red-400 hover:bg-gray-800' 
                    : 'text-red-600 hover:bg-gray-100'
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Sign out
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserAccountIcon;