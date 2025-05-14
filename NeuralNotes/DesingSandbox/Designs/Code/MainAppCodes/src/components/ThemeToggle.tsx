import { motion } from 'framer-motion';
import useTheme from '../hooks/useTheme';

/**
 * Tema değiştirme butonu bileşeni
 * Karanlık/açık tema arasında geçiş yapmak için kullanılır
 */
const ThemeToggle = () => {
  const { toggleTheme, isDarkTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 focus:outline-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isDarkTheme ? 'Açık temaya geç' : 'Karanlık temaya geç'}
      aria-label={isDarkTheme ? 'Açık temaya geç' : 'Karanlık temaya geç'}
    >
      {isDarkTheme ? (
        // Güneş ikonu (açık tema)
        <svg 
          className="w-4 h-4 text-yellow-400" 
          fill="none"
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
          />
        </svg>
      ) : (
        // Ay ikonu (karanlık tema)
        <svg 
          className="w-4 h-4 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
          />
        </svg>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
