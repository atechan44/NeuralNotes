import { useEffect } from 'react';
import './styles/globals.css';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

// Import i18n
import './i18n/i18n';

/**
 * Ana uygulama bileşeni.
 * - Tema kontrolü
 * - Routing
 * - i18n desteği
 */
function App() {
  // Set up global listeners for system theme changes
  useEffect(() => {
    // Watch for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const prefersDark = e.matches;
      const currentTheme = localStorage.getItem('theme');
      
      // Only update if user hasn't explicitly set a theme preference
      if (!currentTheme) {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
      }
    };
    
    // Initial check (in case useEffect runs after theme is already set)
    if (!localStorage.getItem('theme')) {
      const prefersDark = mediaQuery.matches;
      document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
    }
    
    // Add listener for changes
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
}

export default App;
