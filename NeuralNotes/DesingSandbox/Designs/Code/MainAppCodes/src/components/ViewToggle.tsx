import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Görünüm tipleri
type ViewType = 'grid' | 'list';

interface ViewToggleProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

/**
 * Görünüm değiştirme bileşeni
 * Notların grid veya liste görünümü arasında geçiş yapmak için kullanılır
 */
const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
      <motion.button
        className={`p-2 ${
          currentView === 'grid'
            ? 'bg-primary-500 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        onClick={() => onViewChange('grid')}
        whileHover={currentView !== 'grid' ? { backgroundColor: '#f3f4f6' } : {}}
        whileTap={{ scale: 0.95 }}
        title={t('notes.viewAs.grid', 'Grid görünümü')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </motion.button>

      <motion.button
        className={`p-2 ${
          currentView === 'list'
            ? 'bg-primary-500 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        onClick={() => onViewChange('list')}
        whileHover={currentView !== 'list' ? { backgroundColor: '#f3f4f6' } : {}}
        whileTap={{ scale: 0.95 }}
        title={t('notes.viewAs.list', 'Liste görünümü')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default ViewToggle; 