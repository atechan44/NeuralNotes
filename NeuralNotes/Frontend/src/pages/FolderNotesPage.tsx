import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FolderNotesPage: React.FC = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const { t } = useTranslation();

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
        {t('folderNotes.title', 'Folder')}: {folderId ? folderId.charAt(0).toUpperCase() + folderId.slice(1) : 'Unknown'}
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        {t('folderNotes.description', 'Notes in this folder will be listed here.')}
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5].map(noteNum => (
          <div key={noteNum} className="bg-white dark:bg-neutral-800/50 shadow rounded-lg p-4">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-1">
              {t('folderNotes.noteTitle', 'Note {{number}}', { number: noteNum })}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
              {t('folderNotes.noteExcerpt', 'This is a short excerpt of the note...')}
            </p>
            <Link 
              to={`/folders/${folderId}/notes/note-${noteNum}`} 
              className="text-sm text-[rgb(var(--primary-rgb))] hover:underline"
            >
              {t('folderNotes.readMore', 'Read more')}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderNotesPage; 