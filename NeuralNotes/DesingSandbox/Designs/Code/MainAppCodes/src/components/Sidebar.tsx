import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Kenar çubuğu bileşeni
 * - Açılıp kapanabilir
 * - Ana navigasyon menülerini içerir
 */
const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { t } = useTranslation();

  // Animasyon varyantları
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: { 
      x: '-100%',
      transition: {
        type: 'spring', 
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <>
      {/* Arkaplan overlay'i */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 h-full w-56 bg-gray-900 text-white z-40 shadow-lg"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-base font-bold text-primary-500">{t('app.name')}</h1>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-800 transition-colors text-sm"
                  onClick={onClose}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {t('sidebar.home', 'Ana Sayfa')}
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-800 transition-colors text-sm"
                  onClick={onClose}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {t('sidebar.newNote', 'Yeni Not')}
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-800 transition-colors text-sm"
                  onClick={onClose}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t('sidebar.settings', 'Ayarlar')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
