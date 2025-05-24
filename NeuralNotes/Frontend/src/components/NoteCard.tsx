import React from 'react';
import { motion } from 'framer-motion';
// import { useTranslation } from 'react-i18next'; // t function not used currently
import { Star } from 'lucide-react';

/**
 * Not kartı özellikleri
 */
interface NoteCardProps {
  id: string;
  title: string;
  content?: string;
  date: string;
  imageUrl?: string;
  tags?: string[];
  isStarred?: boolean;
  onClick?: () => void;
  layoutMode?: 'grid' | 'masonry'; // Added to potentially adjust styles based on layout
}

/**
 * Basit not kartı bileşeni
 */
const NoteCard: React.FC<NoteCardProps> = ({
  id,
  title,
  content,
  date,
  imageUrl,
  isStarred = false, // Default to false if not provided
  tags = [],
  onClick,
  layoutMode = 'grid', // Default to grid
}) => {
  // const { t } = useTranslation(); // Not used for now
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: layoutMode === 'masonry' ? 0 : 20 }} // No y-animation for masonry items to prevent jumping during column layout
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: layoutMode === 'masonry' ? 0 : -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onClick}
      className={`bg-white dark:bg-neutral-800 rounded-lg shadow-lg dark:shadow-neutral-900/50 cursor-pointer flex flex-col hover:shadow-xl dark:hover:shadow-neutral-700/60 transition-shadow duration-300 overflow-hidden ${layoutMode === 'masonry' ? 'mb-6 break-inside-avoid-column' : ''}`}
    >
      {imageUrl && (
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 group overflow-hidden">
          {/* For masonry, image height is auto to maintain aspect ratio */}
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" 
          />
        </div>
      )}
      {/* Removed min-height for text-only cards to allow natural height in masonry */}
      <div className={`p-4 flex flex-col flex-grow`}> 
        <h3 
          className={`font-semibold text-neutral-800 dark:text-neutral-100 mb-1 truncate ${imageUrl ? 'text-md' : 'text-lg'}`}
        >
          {title}
        </h3>
        {content && (
          // Removed line-clamp for masonry to see full content, adjust if needed
          <p className={`text-sm text-neutral-600 dark:text-neutral-300 flex-grow ${imageUrl ? 'mb-1' : 'mb-2'}`}>
            {content}
          </p>
        )}
        <div className="mt-auto pt-2 border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-center text-xs">
          <span className="text-neutral-500 dark:text-neutral-400">{date}</span>
          {isStarred && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(NoteCard);
