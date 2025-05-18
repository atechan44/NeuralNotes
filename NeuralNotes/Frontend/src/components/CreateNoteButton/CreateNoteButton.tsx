import React from 'react';
import { PlusCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CreateNoteButtonProps {
  onClick: () => void;
}

const CreateNoteButton: React.FC<CreateNoteButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus disabled:opacity-50 text-neutral-800 dark:text-neutral-100"
      aria-label={t('notes.create', 'Create new note')}
      title={t('notes.create', 'Create new note')}
    >
      <PlusCircle size={18} className="mr-1.5" />
      {t('notes.createButton', 'New Note')}
    </button>
  );
};

export default CreateNoteButton; 