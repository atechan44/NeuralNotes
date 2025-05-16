import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Tip tanımları
interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

interface NotesListProps {
  notes: Note[];
}

/**
 * Notları liste görünümünde gösteren bileşen
 */
const NotesList = ({ notes }: NotesListProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Animasyon varyantları
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 25
      }
    },
    hover: {
      scale: 1.01,
      backgroundColor: 'rgba(243, 244, 246, 0.5)',
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className="space-y-3"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {notes.map((note) => {
        // Tarih formatı
        const formattedDate = new Date(note.date).toLocaleDateString('tr-TR', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

        return (
          <motion.div
            key={note.id}
            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer"
            variants={itemVariants}
            whileHover="hover"
            onClick={() => navigate(`/note/${note.id}`)}
          >
            <div className="flex-1 min-w-0 mr-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {note.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                {note.content}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Etiketler (sadece ilk 2 tanesi) */}
              <div className="hidden sm:flex gap-1">
                {note.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {note.tags.length > 2 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{note.tags.length - 2}
                  </span>
                )}
              </div>

              {/* Tarih */}
              <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {formattedDate}
              </div>
              
              {/* Ok ikonu */}
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default NotesList; 