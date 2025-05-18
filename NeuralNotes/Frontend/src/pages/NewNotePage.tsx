import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image as ImageIcon, Paperclip, HelpCircle, Save } from 'lucide-react'; // Removed unused Smile, MessageSquare, etc.

const NewNotePage: React.FC = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');

  // Mock folder data - replace with actual data later
  const folders = [
    { id: '1', name: t('newNote.folderGeneral', 'General') },
    { id: '2', name: t('newNote.folderWork', 'Work') },
    { id: '3', name: t('newNote.folderPersonal', 'Personal') },
  ];

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
    // TODO: Implement actual save logic (e.g., dispatch to Redux, API call)
    alert(t('newNote.alertNoteSaved', 'Note saved (simulated)!') + `\nTitle: ${title}\nFolder: ${folders.find(f => f.id === selectedFolder)?.name}`);
    // Reset fields after save (optional)
    // setTitle('');
    // setContent('');
    // setSelectedFolder('');
  };

  const starterCards = [
    {
      label: t('newNote.askAI', 'Ask AI'),
      icon: <HelpCircle size={20} className="mb-1.5 text-blue-500 dark:text-blue-400" />,
      action: () => console.log('Ask AI clicked'),
    },
    {
      label: t('newNote.addImage', 'Add Image'),
      icon: <ImageIcon size={20} className="mb-1.5 text-green-500 dark:text-green-400" />,
      action: () => console.log('Add Image clicked'),
    },
    {
      label: t('newNote.addAttachment', 'Add Attachment'),
      icon: <Paperclip size={20} className="mb-1.5 text-orange-500 dark:text-orange-400" />,
      action: () => console.log('Add Attachment clicked'),
    },
    // Example additional cards based on the screenshot's bottom right
    // { 
    //   label: t('newNote.database', 'Database'), 
    //   icon: <Database size={20} className="mb-1.5 text-purple-500 dark:text-purple-400" />, 
    //   action: () => console.log('Database clicked') 
    // },
    // { 
    //   label: t('newNote.form', 'Form'), 
    //   icon: <FileText size={20} className="mb-1.5 text-red-500 dark:text-red-400" />, 
    //   action: () => console.log('Form clicked') 
    // },
    // { 
    //   label: t('newNote.templates', 'Templates'), 
    //   icon: <Columns size={20} className="mb-1.5 text-yellow-500 dark:text-yellow-400" />, 
    //   action: () => console.log('Templates clicked') 
    // },
  ];

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto px-4 pt-4 pb-8 md:pt-6 md:pb-12 text-neutral-800 dark:text-neutral-200">
      {/* Header with Folder Select and Save Button */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
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
        <button
          onClick={handleSaveNote}
          className="flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-100 dark:focus:ring-offset-neutral-950 focus:ring-blue-500"
        >
          <Save size={16} className="mr-2" />
          {t('newNote.saveButton', 'Save Note')}
        </button>
      </div>

      {/* Title Input */}
      <input
        type="text"
        placeholder={t('newNote.titlePlaceholder', 'New page')}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-4xl md:text-5xl font-bold bg-transparent focus:outline-none placeholder-neutral-400 dark:placeholder-neutral-500 mb-4 md:mb-6"
      />

      {/* Content Placeholder */}
      <div className="flex-grow mb-12">
        {/* <p className="text-neutral-500 dark:text-neutral-400 text-lg">
          {t('newNote.contentPlaceholder', "Write, press 'space' for AI, '/' for commands...")}
        </p> */}
        {/* This would be replaced by a rich text editor or markdown editor */}
        <textarea
          placeholder={t('newNote.contentPlaceholder', '')}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full min-h-[200px] md:min-h-[300px] bg-transparent focus:outline-none text-lg text-neutral-700 dark:text-neutral-300 placeholder-neutral-400 dark:placeholder-neutral-500 resize-none"
        />
      </div>

      {/* Get Started With Section */}
      <div className="mt-auto">
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
          {t('newNote.getStartedWith', 'Get started with')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {starterCards.map((card, index) => (
            <button
              key={index}
              onClick={card.action}
              className="flex flex-col items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-800/70 hover:bg-neutral-200 dark:hover:bg-neutral-700/90 rounded-lg shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-100 dark:focus:ring-offset-neutral-950 focus:ring-blue-500 dark:focus:ring-blue-400 h-28 md:h-32"
            >
              {card.icon}
              <span className="text-xs md:text-sm text-center text-neutral-700 dark:text-neutral-300">
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