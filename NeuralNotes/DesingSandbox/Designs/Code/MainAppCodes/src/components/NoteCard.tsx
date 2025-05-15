import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/**
 * Not kartı özellikleri
 */
interface NoteCardProps {
  title: string;
  content: string;
  date: string;
  tags?: string[];
  onClick?: () => void;
}

/**
 * Basit not kartı bileşeni
 */
const NoteCard: React.FC<NoteCardProps> = ({
  title,
  content,
  date,
  tags = [],
  onClick,
}) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{
        layout: { type: 'spring', stiffness: 300, damping: 30 },
        y: { type: 'spring', stiffness: 300, damping: 25 }
      }}
      onClick={onClick}
      className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-4 cursor-pointer flex flex-col min-h-[160px] max-w-full relative transition-colors duration-200"
    >
      {/* Favori Yıldızı */}
      <div className="absolute top-3 right-3">
        <button className="text-yellow-500 hover:text-yellow-300">
          ★
        </button>
      </div>
      
      <h3 className="text-lg font-semibold mb-2 pr-6 line-clamp-1">{title}</h3>
      <p className="text-sm text-gray-800 dark:text-gray-300 flex-grow mb-3 line-clamp-3 transition-colors duration-200">{content}</p>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-auto transition-colors duration-200">
        {date}
      </div>
    </motion.div>
  );
};

export default React.memo(NoteCard);
