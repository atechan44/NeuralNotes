import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { DEFAULT_TAGS } from '../config/constants';

interface TagFilterProps {
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

/**
 * Etiket filtreleme bileşeni
 * Notları etiketlere göre filtrelemek için kullanılır
 */
const TagFilter = ({ selectedTag, onSelectTag }: TagFilterProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex space-x-2 pb-1 w-full">
      <motion.button
        key="all"
        onClick={() => onSelectTag('all')}
        className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
          selectedTag === 'all'
            ? 'bg-primary-500 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {t('tags.all', 'All')}
      </motion.button>

      {DEFAULT_TAGS.filter(tag => tag.id !== 'all').map((tag) => (
        <motion.button
          key={tag.id}
          onClick={() => onSelectTag(tag.id)}
          className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
            selectedTag === tag.id
              ? `bg-gray-700 text-white`
              : `bg-gray-800 text-gray-300 hover:bg-gray-700`
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t(`tags.${tag.id}`, tag.label)}
        </motion.button>
      ))}
    </div>
  );
};

export default TagFilter;
