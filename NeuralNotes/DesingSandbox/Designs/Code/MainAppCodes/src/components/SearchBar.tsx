import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Arama çubuğu bileşeni
 * Notlar içinde arama yapmak için kullanılır
 */
const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <motion.input
          type="search"
          className="w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder={t('notes.searchNotes')}
          value={searchTerm}
          onChange={onSearchChange}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      {searchTerm && (
        <motion.button
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          onClick={() => {
            // Arama alanını temizlemek için boş bir event oluştur
            const mockEvent = {
              target: { value: '' }
            } as ChangeEvent<HTMLInputElement>;
            onSearchChange(mockEvent);
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default SearchBar;
