import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { APP_NAME } from '../config/constants';

/**
 * Tekil not sayfası bileşeni
 * URL parametresinden not ID'sini alır ve ilgili notu gösterir
 */
const NotePage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Örnek not verisi (normalde API'den gelecek)
  const note = {
    id: id || '0',
    title: 'Örnek Not Detayı',
    content: 'Bu, bir not detay sayfasıdır. Gerçek bir uygulamada bu içerik API\'den gelecektir.',
    date: new Date().toISOString(),
    tags: ['örnek', 'detay']
  };

  // Animasyon için varyantlar
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  // Tarih formatını düzenle
  const formattedDate = new Date(note.date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-primary-600 dark:text-primary-400 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('common.back')}
        </button>
        
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          {formattedDate}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-4">
          {note.title || `${APP_NAME} Not`}
        </h1>
        
        <div className="prose dark:prose-invert max-w-none mb-6">
          <p className="whitespace-pre-line">
            {note.content}
          </p>
        </div>
        
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NotePage;
