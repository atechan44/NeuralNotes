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
      className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 cursor-pointer flex flex-col min-h-[160px] max-w-full relative"
    >
      {/* Favori Yıldızı */}
      <div className="absolute top-3 right-3">
        <button className="text-yellow-500 hover:text-yellow-300">
          ★
        </button>
      </div>
      
      <h3 className="text-lg font-semibold mb-2 pr-6 line-clamp-1">{title}</h3>
      <p className="text-sm text-gray-300 flex-grow mb-3 line-clamp-3">{content}</p>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-0.5 rounded-full bg-zinc-700 text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="text-xs text-gray-500 mt-auto">
        {date}
      </div>
    </motion.div>
  );
};

export default React.memo(NoteCard);
