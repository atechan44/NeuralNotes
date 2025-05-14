/**
 * Uygulama genelinde kullanılan sabitler
 * Bu dosya, uygulama içinde kullanılan tüm sabit değerleri içerir
 * Herhangi bir değer değişmesi gerekirse, buradan değiştirilmelidir
 */

// Uygulama genel bilgileri
export const APP_NAME = 'NeuralNotes';
export const APP_DESCRIPTION = 'Modern, yapay zeka destekli not alma uygulaması';
export const APP_VERSION = '0.1.0';

// Tema sabitleri
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type ThemeType = typeof THEMES[keyof typeof THEMES];
export const DEFAULT_THEME: ThemeType = THEMES.LIGHT;
export const THEME_STORAGE_KEY = 'neural-notes-theme';

// Dil sabitleri
export const LANGUAGES = {
  EN: 'en',
  TR: 'tr',
} as const;

export type LanguageType = typeof LANGUAGES[keyof typeof LANGUAGES]; 
export const DEFAULT_LANGUAGE: LanguageType = LANGUAGES.TR;
export const LANGUAGE_STORAGE_KEY = 'neural-notes-language';

// Not türleri
export const NOTE_TYPES = {
  TEXT: 'text',
  MARKDOWN: 'markdown',
  CHECKLIST: 'checklist',
} as const;

export type NoteType = typeof NOTE_TYPES[keyof typeof NOTE_TYPES];

// Not etiketleri
export const DEFAULT_TAGS = [
  { id: 'all', label: 'Tümü', color: 'gray' },
  { id: 'personal', label: 'Kişisel', color: 'blue' },
  { id: 'work', label: 'İş', color: 'green' },
  { id: 'important', label: 'Önemli', color: 'red' },
  { id: 'idea', label: 'Fikir', color: 'purple' },
];

// Rota sabitleri
export const ROUTES = {
  HOME: '/',
  NOTE: '/note/:id',
  SETTINGS: '/settings',
};

// Medya sorguları için breakpoint'ler
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  XXL: '1536px',
}; 