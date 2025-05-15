import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

/**
 * Tema yönetimi için hook.
 * - Tema değiştirme
 * - Mevcut temayı alma
 * - localStorage üzerinden tema persistance
 * - İlk yüklemede sistem temasını kullanma veya localStorage'den okuma
 */
export default function useTheme() {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    // If running in browser environment
    if (typeof window !== 'undefined') {
      // Check for stored preference
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme) {
        return storedTheme;
      }
      
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    
    return 'light'; // Default for SSR
  });

  // Update classList and localStorage when theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    
    console.log(`[useTheme] Tema şu anki değere güncellendi: ${theme}`); // Tanı amaçlı log
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else { // theme === 'light'
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    console.log(`[useTheme] document.documentElement.classList: ${root.classList}`); // Tanı amaçlı log
    
    // Save the theme preference to localStorage
    localStorage.setItem('theme', theme);
    
    // Optional: Force style update to ensure theme is applied
    // document.body.style.backgroundColor = ''; // Reset to use CSS variables (Şimdilik yorum satırı)
    
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
