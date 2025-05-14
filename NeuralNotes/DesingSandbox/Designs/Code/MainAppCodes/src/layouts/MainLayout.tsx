import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../components/ThemeToggle';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  
  const sidebarItems = [
    { id: 'notes', icon: '📝', label: t('sidebar.notes') },
    { id: 'todo', icon: '✓', label: t('sidebar.todo') },
    { id: 'calendar', icon: '📅', label: t('sidebar.calendar') },
    { id: 'canvas', icon: '🎨', label: t('sidebar.canvas') },
  ];
  
  const bottomItems = [
    { id: 'account', icon: '👤', label: t('sidebar.account') },
    { id: 'settings', icon: '⚙️', label: t('sidebar.settings') },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar - İnce tasarım */}
      <aside className="w-16 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4">
        {/* Üst Kısım */}
        <div className="flex flex-col items-center space-y-6">
          {/* Hamburger Menü */}
          <button className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Navigation İkonları */}
          {sidebarItems.map((item) => (
            <button key={item.id} className="text-gray-400 hover:text-white">
              <span className="text-xl">{item.icon}</span>
            </button>
          ))}
        </div>
        
        {/* Alt Kısım */}
        <div className="flex flex-col items-center mt-auto space-y-6 mb-4">
          {bottomItems.map((item) => (
            <button key={item.id} className="text-gray-400 hover:text-white">
              <span className="text-xl">{item.icon}</span>
            </button>
          ))}
        </div>
      </aside>
      
      {/* Ana içerik */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Ayarlar */}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default MainLayout;
