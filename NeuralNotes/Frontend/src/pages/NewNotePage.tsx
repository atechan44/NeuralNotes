import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, Paperclip, HelpCircle, Sparkles } from 'lucide-react';
import type { Folder } from '../App'; // Import Folder type

interface NewNotePageProps {
  folders: Folder[]; // Added folders prop
}

const NewNotePage: React.FC<NewNotePageProps> = ({ folders }) => { // Destructure folders from props
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(''); // Using selectedFolder (string for ID)

  // Removed static mock folder data, will use props.folders
  // const folders = [
  //   { id: '1', name: t('newNote.folderGeneral', 'General') },
  //   { id: '2', name: t('newNote.folderWork', 'Work') },
  //   { id: '3', name: t('newNote.folderPersonal', 'Personal') },
  // ];

  // Effect to capture initial values ONCE on mount
  const mountStateRef = useRef({
    title: '',
    content: '',
    selectedFolder: ''
  });

  useEffect(() => {
    // Capture the state as it is when the component mounts.
    // Since title, content, selectedFolder start empty, this will capture that initial empty state.
    mountStateRef.current = { title, content, selectedFolder };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs once on mount

  // Effect for autosave logic on unmount
  useEffect(() => {
    return () => {
      const initialMountState = mountStateRef.current;
      // These are the state values at the time of unmount
      const unmountTimeTitle = title;
      const unmountTimeContent = content;
      const unmountTimeSelectedFolder = selectedFolder;

      const hasChanged =
        unmountTimeTitle !== initialMountState.title ||
        unmountTimeContent !== initialMountState.content ||
        unmountTimeSelectedFolder !== initialMountState.selectedFolder;

      if (hasChanged && unmountTimeTitle.trim() && unmountTimeSelectedFolder) {
        console.log('Auto-saving note on unmount:', {
          title: unmountTimeTitle,
          content: unmountTimeContent,
          selectedFolder: unmountTimeSelectedFolder,
        });
        alert(
          t('newNote.alertNoteAutoSaved', 'Note auto-saved (simulated)!') +
            `\nTitle: ${unmountTimeTitle}\nFolder ID: ${unmountTimeSelectedFolder}\nFolder Name: ${
              folders.find((f) => f.id === unmountTimeSelectedFolder)?.name || 'N/A'
            }`
        );
        navigate('/');
      } else if (hasChanged) {
        // Only log if there were changes but save conditions weren't met
        console.log(
          'Auto-save on unmount skipped: Title or folder missing, or no actual changes from initial state that warrant saving with filled fields.'
        );
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content, selectedFolder, t, folders, navigate]); // Dependencies for the cleanup function to access current state & t/folders

  const handleAutoSave = () => {
    if (!title.trim()) {
      // No alert for missing title on auto-save, or could be a silent save failure
      console.log(t('newNote.autoSaveTitleMissing', 'Auto-save skipped: Title is required.'));
      return;
    }
    if (!selectedFolder) {
      // No alert for missing folder on auto-save
      console.log(t('newNote.autoSaveFolderMissing', 'Auto-save skipped: Folder selection is required.'));
      return;
    }
    console.log('Auto-saving note:', { title, content, selectedFolder });
    alert(t('newNote.alertNoteAutoSaved', 'Note auto-saved (simulated)!') + `\nTitle: ${title}\nFolder ID: ${selectedFolder}\nFolder Name: ${folders.find(f => f.id === selectedFolder)?.name || 'N/A'}`);
  };

  const handleSaveNote = () => {
    if (!title.trim()) {
      alert(t('newNote.alertTitleRequired', 'Title is required to save the note.'));
      return;
    }
    if (!selectedFolder) {
      alert(t('newNote.alertFolderRequired', 'Please select a folder to save the note.'));
      return;
    }
    console.log('Saving note:', { title, content, selectedFolder });
    alert(t('newNote.alertNoteSaved', 'Note saved (simulated)!') + `\nTitle: ${title}\nFolder ID: ${selectedFolder}\nFolder Name: ${folders.find(f => f.id === selectedFolder)?.name || 'N/A'}`);
    // Optionally reset fields
    // setTitle('');
    // setContent('');
    // setSelectedFolder('');
  };

  const starterCards = [
    {
      label: t('newNote.askAI', 'Ask AI'),
      icon: <Sparkles size={20} className="text-purple-500 dark:text-purple-400" />,
      action: () => console.log('Ask AI clicked'),
    },
    {
      label: t('newNote.addImage', 'Add Image'),
      icon: <ImageIcon size={20} className="text-green-500 dark:text-green-400" />,
      action: () => console.log('Add Image clicked'),
    },
    {
      label: t('newNote.addAttachment', 'Add Attachment'),
      icon: <Paperclip size={20} className="text-orange-500 dark:text-orange-400" />,
      action: () => console.log('Add Attachment clicked'),
    },
  ];

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto px-4 pt-4 pb-8 md:pt-6 md:pb-12 text-neutral-800 dark:text-neutral-200">
      {/* Header with Folder Select */}
      <div className="flex items-center justify-start mb-4 md:mb-6">
        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2.5 pr-8 shadow-sm appearance-none focus:outline-none min-w-[150px]"
        >
          <option value="" disabled>{t('newNote.selectFolder', 'Select a folder...')}</option>
          {folders.map(folder => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      {/* Title Input */}
      <input
        type="text"
        placeholder={t('newNote.titlePlaceholder', 'New page')}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-4xl md:text-5xl font-bold bg-transparent focus:outline-none placeholder-neutral-400 dark:placeholder-neutral-500 mb-4 md:mb-6 leading-normal"
      />

      {/* Content Textarea */}
      <div className="flex-grow mb-12">
        <textarea
          placeholder={t('newNote.contentPlaceholder', '')} // Kept placeholder empty as per earlier state
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full min-h-[200px] md:min-h-[300px] bg-transparent focus:outline-none text-lg text-neutral-700 dark:text-neutral-300 placeholder-neutral-400 dark:placeholder-neutral-500 resize-none"
        />
      </div>

      {/* Get Started With Section */}
      <div className="mt-auto">
        <h2 className="text-sm text-neutral-600 dark:text-neutral-400 font-medium mb-3">
          {t('newNote.getStartedWith', 'Enhance with AI & Tools')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {starterCards.map((card, index) => (
            <button
              key={index}
              onClick={card.action}
              className="flex items-center p-3.5 bg-neutral-50 dark:bg-neutral-800/70 hover:bg-neutral-100 dark:hover:bg-neutral-700/90 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950"
            >
              <div className="mr-3 flex-shrink-0">
                {card.icon}
              </div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 leading-normal">
                {card.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewNotePage;