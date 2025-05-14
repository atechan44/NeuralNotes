import { motion } from 'framer-motion';

interface SidebarToggleProps {
  onClick: () => void;
}

/**
 * Kenar çubuğu açma/kapama butonu bileşeni
 */
const SidebarToggle = ({ onClick }: SidebarToggleProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed top-3 left-3 z-20 p-1.5 rounded-full bg-gray-800 text-white shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      aria-label="Toggle sidebar"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </motion.button>
  );
};

export default SidebarToggle;
