import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotesProvider } from './contexts/NotesContext';
import { AIProvider } from './contexts/AIContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CalendarProvider } from './contexts/CalendarContext';
import { TodoProvider } from './contexts/TodoContext';
import UserAccountIcon from './components/UserAccountIcon';
import Sidebar from './components/Sidebar';
import AIAssistant from './components/AIAssistant';
import CalendarPage from './pages/CalendarPage';
import NotesPage from './pages/NotesPage';
import WorkspacePage from './pages/WorkspacePage';
import HomePage from './pages/HomePage';
import CanvasPage from './pages/CanvasPage';
import TodoPage from './pages/TodoPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  // Setup keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+N for new note
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('newNote'));
      }
      
      // Ctrl+/ to toggle AI assistant
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('toggleAI'));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Listen for navigation events
  useEffect(() => {
    const handleNavigation = (event) => {
      if (event.detail && event.detail.destination) {
        setCurrentPage(event.detail.destination);
      }
    };
    
    document.addEventListener('navigate', handleNavigation);
    return () => document.removeEventListener('navigate', handleNavigation);
  }, []);
  
  // Handle sidebar navigation clicks
  useEffect(() => {
    const handleCalendarClick = () => {
      setCurrentPage('calendar');
    };
    
    const handleHomeClick = () => {
      setCurrentPage('home');
    };
    
    const handleCanvasClick = () => {
      setCurrentPage('canvas');
    };
    
    const handleTodoClick = () => {
      setCurrentPage('todo');
    };
    
    const calendarLink = document.querySelector('a[href="#calendar"]');
    const homeLink = document.querySelector('a[href="#home"]');
    const canvasLink = document.querySelector('a[href="#canvas"]');
    const todoLink = document.querySelector('a[href="#todo"]');
    
    if (calendarLink) calendarLink.addEventListener('click', handleCalendarClick);
    if (homeLink) homeLink.addEventListener('click', handleHomeClick);
    if (canvasLink) canvasLink.addEventListener('click', handleCanvasClick);
    if (todoLink) todoLink.addEventListener('click', handleTodoClick);
    
    return () => {
      if (calendarLink) calendarLink.removeEventListener('click', handleCalendarClick);
      if (homeLink) homeLink.removeEventListener('click', handleHomeClick);
      if (canvasLink) canvasLink.removeEventListener('click', handleCanvasClick);
      if (todoLink) todoLink.removeEventListener('click', handleTodoClick);
    };
  }, []);

  // Render the appropriate page content based on currentPage
  const renderPageContent = () => {
    const pageVariants = {
      initial: {
        opacity: 0,
        y: 20
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          ease: "easeInOut"
        }
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.2
        }
      }
    };
    
    // Return the appropriate page with animations
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="w-full h-full"
        >
          {(() => {
            switch (currentPage) {
              case 'calendar':
                return <CalendarPage />;
              case 'canvas':
                return <CanvasPage />;
              case 'todo':
                return <TodoPage />;
              case 'workspace':
                return <WorkspacePage />;
              case 'notes':
                return <NotesPage />;
              case 'home':
              default:
                return <HomePage />;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-black text-gray-300">
        <NotesProvider>
          <CalendarProvider>
            <TodoProvider>
              <AIProvider>
                {/* User Account Icon fixed at top-right */}
                <div className="absolute top-4 right-4 z-50">
                  <UserAccountIcon />
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row h-screen"
                >
                  <Sidebar />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {renderPageContent()}
                  </div>
                  <AIAssistant />
                </motion.div>
              </AIProvider>
            </TodoProvider>
          </CalendarProvider>
        </NotesProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
