import { motion } from 'framer-motion';
import { useRef } from 'react';
import { APP_NAME } from '../config/constants';

/**
 * Not kartı özellikleri
 */
interface NoteCardProps {
  title: string;
  content: string;
  date: string;
  thumbnail?: string;
}

/**
 * Basit not kartı bileşeni
 */
const NoteCard = ({ title, content, date, thumbnail }: NoteCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 flex flex-col h-full">
      {thumbnail && (
        <div className="w-full h-32 overflow-hidden">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4 flex-grow">
        <h3 className="text-base font-medium text-white mb-1">
          {title}
        </h3>
        
        <p className="text-gray-300 text-xs mb-3 line-clamp-3">
          {content}
        </p>
        
        <span className="text-xs text-gray-400">
          {date}
        </span>
      </div>
    </div>
  );
};

export default NoteCard;
