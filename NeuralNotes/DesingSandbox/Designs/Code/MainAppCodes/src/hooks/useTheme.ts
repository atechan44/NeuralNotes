import { useState, useEffect } from 'react';
import { DEFAULT_THEME, THEME_STORAGE_KEY, THEMES, ThemeType } from '../config/constants';

/**
 * Tema yönetimi için hook.
 * - Tema değiştirme
 * - Mevcut temayı alma
 * - localStorage üzerinden tema persistance
 * - İlk yüklemede sistem temasını kullanma veya localStorage'den okuma
 */
export function useTheme() {
  // localStorage'dan tema tercihini al veya varsayılan olarak DEFAULT_THEME'i kullan
  const [theme, setTheme] = useState<ThemeType>(() => {
    // localStorage'dan kaydedilmiş tema varsa onu kullan
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeType | null;
    if (savedTheme && Object.values(THEMES).includes(savedTheme as ThemeType)) {
      return savedTheme as ThemeType;
    }

    // Kaydedilmiş tema yoksa, sistem temasını kontrol et
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }

    // Hiçbiri yoksa varsayılan temayı kullan
    return DEFAULT_THEME;
  });

  // Tema değiştiğinde HTML'deki class'ı güncelle ve localStorage'a kaydet
  useEffect(() => {
    // HTMLde tema class'ını güncelle
    if (theme === THEMES.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // localStorage'a tema tercihini kaydet
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Temayı değiştirmek için kullanılacak fonksiyon
  const toggleTheme = () => {
    setTheme(prevTheme => 
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isDarkTheme: theme === THEMES.DARK
  };
}

export default useTheme;
