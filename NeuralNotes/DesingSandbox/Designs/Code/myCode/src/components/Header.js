import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAI } from '../contexts/AIContext';

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { toggleAI } = useAI();

  // Handle theme toggle event from keyboard shortcut
  React.useEffect(() => {
    const handleToggleTheme = () => toggleTheme();
    document.addEventListener('toggleTheme', handleToggleTheme);
    return () => document.removeEventListener('toggleTheme', handleToggleTheme);
  }, [toggleTheme]);

  // Handle AI toggle event from keyboard shortcut
  React.useEffect(() => {
    const handleToggleAI = () => toggleAI();
    document.addEventListener('toggleAI', handleToggleAI);
    return () => document.removeEventListener('toggleAI', handleToggleAI);
  }, [toggleAI]);

  return (
    <header className={`py-2 px-4 flex items-center justify-between border-b ${darkMode ? 'border-dark-secondary' : 'border-gray-200'}`}>
      <div className="flex items-center">
        <div className="hidden md:block">
          <h1 className="text-xl font-bold flex items-center">
            <span className={`mr-2 text-2xl ${darkMode ? 'text-dark-accent' : 'text-light-accent'}`}>
              ✦
            </span>
            NeuralNotes
          </h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleAI}
          className={`p-2 rounded-full transition-colors ${
            darkMode 
              ? 'hover:bg-dark-secondary text-dark-text' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          data-shortcut="Ctrl+/"
          title="AI Assistant (Ctrl+/)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.94 7.94a.75.75 0 00-1.06 1.06L9.94 11l-2.06 2.06a.75.75 0 101.06 1.06L11 12.06l2.06 2.06a.75.75 0 101.06-1.06L12.06 11l2.06-2.06a.75.75 0 00-1.06-1.06L11 9.94 8.94 7.94z" clipRule="evenodd" />
          </svg>
        </button>
        
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${
            darkMode 
              ? 'hover:bg-dark-secondary text-dark-text' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          data-shortcut="Ctrl+D"
          title="Toggle Theme (Ctrl+D)"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
