import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import CustomMenuIcon from '../components/icons/CustomMenuIcon';
import PencilIcon from '../components/icons/PencilIcon';
import type { Folder } from '../App'; // Import Folder type using type-only import

interface MainLayoutProps {
  folders: Folder[];
  addFolder: (folderName: string) => void;
}

/**
 * MainLayout component
 * Contains the sidebar and main content area using Outlet for nested routes.
 */
const MainLayout: React.FC<MainLayoutProps> = ({ folders, addFolder }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = location.pathname !== '/';

  useEffect(() => {
    document.documentElement.classList.add('no-transitions');
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('no-transitions');
    }, 100);

    if (showBackButton) {
      setIsSidebarOpen(false);
    }
    return () => clearTimeout(timer);
  }, [showBackButton, location.pathname]);

  const handleCreateNote = () => {
    // console.log('Create new note clicked!');
    navigate('/notes/new'); // Navigate to NewNotePage
  };

  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors duration-200">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        folders={folders} 
        addFolder={addFolder} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between p-3 md:p-4 bg-white dark:bg-neutral-900 shadow-sm h-16 md:h-auto shrink-0">
          <div className="flex items-center">
            {showBackButton ? (
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-150 mr-2 md:mr-3"
                aria-label={t('layout.back', 'Go back')}
                title={t('layout.back', 'Go back')}
              >
                <ArrowLeft size={22} />
              </button>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-150 mr-2 md:mr-3"
                aria-label={t('sidebar.open', 'Open sidebar')}
                title={t('sidebar.open', 'Open sidebar')}
              >
                <CustomMenuIcon />
              </button>
            )}
            {/* Add New Note Button */}
            {!showBackButton && (
              <button
                onClick={handleCreateNote}
                className="p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-150 ml-1 md:ml-2 flex items-center"
                aria-label={t('notes.create', 'Create new note')}
                title={t('notes.create', 'Create new note')}
              >
                <PencilIcon />
              </button>
            )}
          </div>
          
          <div className="flex items-center">
            {/* Sağ tarafa başka öğeler eklenebilir, örneğin kullanıcı profili, bildirimler vb. */}
            {/* ThemeToggle buradan kaldırıldı, Ayarlar sayfasına taşındı */}
          </div>
        </header>

        {/* Content Area */}
        <main 
          className={`flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 transition-all duration-300 ease-in-out 
            ${isSidebarOpen && !showBackButton ? 'md:ml-[280px]' : 'ml-0'}
          `}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
