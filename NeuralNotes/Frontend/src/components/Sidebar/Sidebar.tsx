import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Settings,
  ChevronDown,
  X as IconX,
  LogOut,
  CalendarDays,
  Folder,
  FolderOpen,
  MessageSquare,
  Brush,
  type LucideIcon,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Navigasyon öğesi için arayüz
interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path?: string;
  children?: NavItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  // Orijinal sıra ve çevirilerle geri dönelim
  const exampleSubFolders: NavItem[] = [
    { id: 'journal', label: t('sidebar.folders.journal', 'Journal'), icon: Folder, path: '/folders/journal' },
    { id: 'archive', label: t('sidebar.folders.archive', 'Archive'), icon: Folder, path: '/folders/archive' },
    { id: 'work', label: t('sidebar.folders.work', 'Work Projects'), icon: Folder, path: '/folders/work' },
  ];

  const navItems: NavItem[] = [
    {
      id: 'folders',
      label: t('sidebar.folders', 'Folders'),
      icon: Folder,
      children: exampleSubFolders,
    },
    { id: 'calendar', label: t('sidebar.calendar', 'Calendar'), icon: CalendarDays, path: '/calendar', children: [] },
    { id: 'canvas', label: t('sidebar.canvas', 'Canvas'), icon: Brush, path: '/canvas', children: [] },
    { id: 'recentChats', label: t('sidebar.recentChats', 'Recent Chats'), icon: MessageSquare, path: '/recent-chats', children: [] },
  ];

  const bottomNavItems: NavItem[] = [
    { id: 'settings', label: t('sidebar.settings', 'Settings'), icon: Settings, path: '/settings' },
    { id: 'logout', label: t('sidebar.logout', 'Logout'), icon: LogOut, path: '/logout' },
  ];

  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const sidebarVariants = {
    open: { x: 0, width: '280px', transition: { type: "tween", duration: 0.3, ease: "easeOut" } },
    closed: { x: '-100%', width: '280px', transition: { type: "tween", duration: 0.25, ease: "easeIn" } },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, transition: { type: "tween", duration: 0.2, ease: "easeOut", delay: 0.15 } },
    closed: { opacity: 0, x: 0, transition: { duration: 0 } },
  };

  const getNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center p-3 rounded-lg transition-colors duration-150 group text-base font-medium w-full ${
      isActive
        ? 'bg-[rgb(var(--primary-rgb))] text-white'
        : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
    }`;

  const getNavIconClasses = ({ isActive }: { isActive: boolean }) =>
    `mr-4 shrink-0 ${
      isActive
        ? 'text-white'
        : 'text-neutral-500 dark:text-neutral-400 group-hover:text-[rgb(var(--primary-rgb))] dark:group-hover:text-[rgb(var(--primary-rgb))] transition-colors duration-150'
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-30 bg-black/40 dark:bg-black/60 md:hidden backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.2 } }}
            onClick={onClose}
          />
          <motion.aside
            key="sidebar"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 h-full z-40 bg-white dark:bg-neutral-900/90 border-r border-neutral-200/70 dark:border-neutral-700/60 shadow-xl flex flex-col"
          >
            <motion.div variants={itemVariants} className="p-4 pr-3 border-b border-neutral-200/70 dark:border-neutral-700/60 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">{t('app.name', 'NeuralNotes')}</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-md text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[rgb(var(--primary-rgb))] transition-colors duration-150"
                aria-label={t('sidebar.close', 'Close sidebar')}
                title={t('sidebar.close', 'Close sidebar')}
              >
                <IconX size={20} />
              </button>
            </motion.div>

            <motion.nav variants={itemVariants} className="flex-1 p-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const ItemIcon = item.id === 'folders' ? (openSections[item.id] ? FolderOpen : Folder) : item.icon;

                return item.children && item.children.length > 0 ? (
                  <motion.div key={item.id} variants={itemVariants} className="w-full">
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="flex items-center p-3 rounded-lg transition-colors duration-150 group text-base font-medium w-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    >
                      <ItemIcon size={20} className="mr-4 shrink-0 text-neutral-500 dark:text-neutral-400 group-hover:text-[rgb(var(--primary-rgb))] dark:group-hover:text-[rgb(var(--primary-rgb))] transition-colors duration-150" />
                      <span className="flex-1 truncate text-left">{item.label}</span>
                      <ChevronDown size={18} className={`transition-transform duration-200 ${openSections[item.id] ? '' : '-rotate-90'}`} />
                    </button>
                    {openSections[item.id] && (
                      <motion.div
                        layout
                        className="ml-[20px] mt-1 space-y-0.5 border-l-2 border-neutral-300/70 dark:border-neutral-600/70 pl-[18px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        {item.children.map(child => {
                          console.log('Rendering NavLink child:', child);
                          return (
                            <NavLink
                              key={child.id}
                              to={child.path || "/"}
                              onClick={onClose}
                              className="flex items-center p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors duration-150"
                              style={({ isActive }) => ({ 
                                backgroundColor: isActive ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent',
                                color: isActive ? 'rgb(var(--primary-rgb))' : 'inherit',
                                fontWeight: isActive ? '600' : 'normal'
                              })}
                            >
                              <child.icon size={16} className="mr-3 shrink-0 text-neutral-500 dark:text-neutral-400" />
                              <span className="truncate">{child.label}</span>
                            </NavLink>
                          );
                        })}
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <NavLink
                    key={item.id}
                    to={item.path || "/"}
                    onClick={onClose}
                    className={`flex items-center p-3 rounded-lg transition-colors duration-150 group text-base font-medium w-full`}
                     style={({ isActive }) => ({ 
                        backgroundColor: isActive ? 'rgb(var(--primary-rgb))' : 'transparent',
                        color: isActive ? 'white' : 'inherit',
                      })}
                  >
                    <ItemIcon size={20} 
                      className={`mr-4 shrink-0 ${true ? 'text-white' : 'text-neutral-500 dark:text-neutral-400 group-hover:text-[rgb(var(--primary-rgb))] dark:group-hover:text-[rgb(var(--primary-rgb))] transition-colors duration-150'}`} />
                    <span className="flex-1 truncate">{item.label}</span>
                  </NavLink>
                );
              })}
            </motion.nav>

            <motion.div variants={itemVariants} className="p-3 border-t border-neutral-200/70 dark:border-neutral-700/60 space-y-1">
              {bottomNavItems.map((item) => (
                item.id === 'logout' ? (
                  <button
                    key={item.id}
                    onClick={() => {
                      console.log('Logout clicked');
                      onClose();
                    }}
                    className="flex items-center p-3 rounded-lg transition-colors duration-150 group text-base font-medium w-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  >
                     <item.icon size={20} className="mr-4 shrink-0 text-neutral-500 dark:text-neutral-400 group-hover:text-[rgb(var(--primary-rgb))] dark:group-hover:text-[rgb(var(--primary-rgb))] transition-colors duration-150" />
                    <span className="flex-1 truncate text-left">{item.label}</span>
                  </button>
                ) : (
                  <NavLink
                    key={item.id}
                    to={item.path || "/"}
                    onClick={onClose}
                    className={`flex items-center p-3 rounded-lg transition-colors duration-150 group text-base font-medium w-full`}
                     style={({ isActive }) => ({ 
                        backgroundColor: isActive ? 'rgb(var(--primary-rgb))' : 'transparent',
                        color: isActive ? 'white' : 'inherit',
                      })}
                  >
                    <item.icon size={20} className={`mr-4 shrink-0 ${true ? 'text-white' : 'text-neutral-500 dark:text-neutral-400 group-hover:text-[rgb(var(--primary-rgb))] dark:group-hover:text-[rgb(var(--primary-rgb))] transition-colors duration-150'}`} />
                    <span className="flex-1 truncate">{item.label}</span>
                  </NavLink>
                )
              ))}
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(Sidebar);