import React from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutGrid, Columns } from 'lucide-react';

// ... (importlar aynı kalır) ...

interface LayoutModeSwitcherProps {
  currentLayout: 'grid' | 'masonry';
  onSetLayout: (mode: 'grid' | 'masonry') => void;
}

const LayoutModeSwitcher: React.FC<LayoutModeSwitcherProps> = ({ currentLayout, onSetLayout }) => {
  const { t } = useTranslation();

  const modes = [
    { value: 'grid' as const, label: t('layoutOptions.grid', 'Grid'), Icon: LayoutGrid },
    { value: 'masonry' as const, label: t('layoutOptions.masonry', 'Masonry'), Icon: Columns },
  ];

  return (
    // GÜNCELLENDİ: Arka plan ve kenarlık renkleri
    <div className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700 flex flex-col gap-1">
      {modes.map(({ value, label, Icon }) => (
        <button
          key={value}
          onClick={() => onSetLayout(value)}
          className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors
            ${
              currentLayout === value
                ? 'bg-primary-500 text-white shadow-sm' // Aktif duruma hafif gölge eklendi
                // GÜNCELLENDİ: Aktif olmayan butonların karanlık tema renkleri
                : 'text-neutral-700 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          aria-pressed={currentLayout === value}
        >
          <Icon size={16} className={`${currentLayout === value ? 'text-white' : 'text-neutral-500 dark:text-neutral-400'}`} />
          {label}
        </button>
      ))}
    </div>
  );
};

export default LayoutModeSwitcher;
