import React from 'react';
import { useEffect, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutModeProvider } from './contexts/LayoutModeContext';
import useTheme from './hooks/useTheme';
import './styles/globals.css';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import SettingsPage from './pages/SettingsPage';
import FolderNotesPage from './pages/FolderNotesPage';
import NewNotePage from './pages/NewNotePage';

// Import i18n
import './i18n/i18n';

// Define a type for Folder
export interface Folder {
  id: string;
  name: string;
}

// Placeholder pages for new routes
const NotePage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">Single Note Page</h1><p>This is a placeholder for viewing/editing a single note.</p></div>;
const NotesPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">Notes Page</h1><p>This is a placeholder for the Notes page.</p></div>;
const TodoPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">To-Do Page</h1><p>This is a placeholder for the To-Do page.</p></div>;
const CanvasPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">Canvas Page</h1><p>This is a placeholder for the Canvas page.</p></div>;
const CalendarPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">Calendar Page</h1><p>This is a placeholder for the Calendar page.</p></div>;
const AccountPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">Account Page</h1><p>This is a placeholder for the Account page.</p></div>;

/**
 * Ana uygulama bileşeni.
 * - Tema kontrolü
 * - Routing
 * - i18n desteği
 */
function App() {
  const { t, i18n } = useTranslation();
  const [folders, setFolders] = useState<Folder[]>([
    { id: '1', name: t('folders.general', 'General') },
    { id: '2', name: t('folders.work', 'Work') },
    { id: '3', name: t('folders.personal', 'Personal') },
  ]);

  const addFolder = (folderName: string) => {
    const newFolder: Folder = {
      id: String(Date.now()),
      name: folderName,
    };
    setFolders((prevFolders) => [...prevFolders, newFolder]);
    console.log(t('folders.folderAdded', 'Folder added:'), newFolder);
  };

  useTheme(); // Initialize theme

  // Example: Set document language and direction based on i18n
  React.useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, i18n.language]);

  // Set up global listeners for system theme changes
  useEffect(() => {
    // Watch for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const prefersDark = e.matches;
      const currentTheme = localStorage.getItem('theme');
      
      // Only update if user hasn't explicitly set a theme preference
      if (!currentTheme) {
        if (prefersDark) {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        }
      }
    };
    
    // Initial check (in case useEffect runs after theme is already set)
    if (!localStorage.getItem('theme')) {
      const prefersDark = mediaQuery.matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    }
    
    // Add listener for changes
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return (
    <LayoutModeProvider>
      <Router>
        <Suspense fallback={<div className="flex-center h-screen w-screen">{t('common.loading')}</div>}>
          <Routes>
            <Route path="/" element={<MainLayout folders={folders} addFolder={addFolder} />}>
              <Route index element={<Home />} />
              <Route path="note" element={<NotePage />} />
              <Route path="notes" element={<NotesPage />} />
              <Route path="todo" element={<TodoPage />} />
              <Route path="canvas" element={<CanvasPage />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="account" element={<AccountPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="folders/:folderId" element={<FolderNotesPage />}  />
              <Route path="notes/new" element={<NewNotePage folders={folders} />} />
              <Route path="*" element={
                <div className="flex-center h-[80vh] flex-col gap-4">
                  <h1 className="text-2xl font-bold">404</h1>
                  <p>{t('common.error')}</p>
                </div>
              } />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </LayoutModeProvider>
  );
}

export default App;
