import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PaperClip, MediaImage, Send } from 'iconoir-react';

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
          <PaperClip height={16} width={16} />
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
          <Send height={20} width={20} />
        </motion.button>
      )}
    </div>
  );
};

export default SearchBar;
