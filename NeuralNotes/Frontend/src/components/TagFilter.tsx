import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Tag {
  id: string;
  label: string;
}

interface TagFilterProps {
  availableTags: Tag[];
  selectedTags: string[];
  onSelectTag: (tagId: string) => void;
}

/**
 * Etiket filtreleme bileşeni
 * Notları etiketlere göre filtrelemek için kullanılır
 */
const TagFilter: React.FC<TagFilterProps> = ({ availableTags, selectedTags, onSelectTag }) => {
  const { t } = useTranslation();

  if (availableTags.length === 0) {
    return null; // Don't render if no tags are available
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mr-2">
        {t('tags.filterBy', 'Filter by:')}
      </span>
      {availableTags.map((tag) => {
        const isSelected = selectedTags.includes(tag.id);
        return (
          <motion.button
            key={tag.id}
            onClick={() => onSelectTag(tag.id)}
            className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-all duration-200 ease-in-out font-medium
              ${
                isSelected
                  ? 'bg-primary-500 text-white shadow-md ring-2 ring-primary-300 dark:ring-primary-600'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600'
              }`}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: Math.random() * 0.3 }}
          >
            {tag.label}
          </motion.button>
        );
      })}
    </div>
  );
};

export default TagFilter;
