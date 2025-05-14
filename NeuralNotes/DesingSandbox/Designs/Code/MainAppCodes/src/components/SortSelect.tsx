import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { SortOption } from '../hooks/useNotes';

interface SortSelectProps {
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
}

/**
 * Sıralama seçenekleri bileşeni
 * Notların farklı kriterlere göre sıralanmasını sağlar
 */
const SortSelect = ({ sortBy, onSortChange }: SortSelectProps) => {
  const { t } = useTranslation();

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: t('notes.sortBy.newest') },
    { value: 'oldest', label: t('notes.sortBy.oldest') },
    { value: 'alphabetical', label: t('notes.sortBy.alphabetical') },
    { value: 'lastUpdated', label: t('notes.sortBy.lastUpdated') },
  ];

  return (
    <div className="relative">
      <label htmlFor="sort-select" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {t('notes.sortBy.title')}
      </label>
      <motion.select
        id="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </motion.select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-5">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SortSelect; 