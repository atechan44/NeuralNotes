import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
}

/**
 * Arama çubuğu bileşeni
 * Notlar içinde arama yapmak için kullanılır
 */
const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, onClearSearch }) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full sm:max-w-xs">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-neutral-400 dark:text-neutral-500" />
        </div>
        <input
          type="search"
          className="w-full p-3 pl-10 text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-700 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 placeholder-neutral-400 dark:placeholder-neutral-500 transition-colors duration-200"
          placeholder={t('notes.searchNotes', 'Search notes...')}
          value={searchTerm}
          onChange={onSearchChange}
        />
        {searchTerm && (
          <motion.button
            onClick={onClearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={t('common.clearSearch', 'Clear search')}
          >
            <X size={18} />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default SearchBar;
