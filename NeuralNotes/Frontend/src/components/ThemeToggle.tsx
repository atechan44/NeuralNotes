import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useTheme from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

/**
 * Theme toggle button component
 * Used to switch between dark/light themes
 */
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Hydration hatalarını önlemek için, bileşen mount olana kadar UI render etme
    // veya bir placeholder/skeleton göster.
    // Bu butonun stilini, gerçek butonla aynı boyutta olacak şekilde ayarlamak iyi bir pratiktir.
    return (
      <div
        className="p-2 rounded-md w-[36px] h-[36px]" // Gerçek butonla aynı boyutta placeholder
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-neutral-800 focus:ring-[rgb(var(--primary-rgb))]"
      aria-label={theme === 'light' ? t('theme.switchToDark', 'Switch to dark theme') : t('theme.switchToLight', 'Switch to light theme')}
      title={theme === 'light' ? t('theme.switchToDark', 'Switch to dark theme') : t('theme.switchToLight', 'Switch to light theme')}
    >
      {theme === 'light' ? (
        <Sun size={20} aria-hidden="true" />
      ) : (
        <Moon size={20} aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
