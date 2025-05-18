import React from 'react';
import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SidebarToggleProps {
  toggle: () => void;
}

/**
 * Kenar çubuğu açma/kapama butonu bileşeni
 */
const SidebarToggle: React.FC<SidebarToggleProps> = ({ toggle }) => {
  const { t } = useTranslation();
  const label = t('sidebar.open', 'Open sidebar');

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md text-[rgb(var(--foreground-rgb))] hover:bg-[rgba(var(--foreground-rgb),0.07)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[rgb(var(--primary-rgb))] transition-colors duration-150"
      aria-label={label}
      title={label}
    >
      <Menu size={24} className="text-[rgb(var(--foreground-rgb))]" />
    </button>
  );
};

export default SidebarToggle;
