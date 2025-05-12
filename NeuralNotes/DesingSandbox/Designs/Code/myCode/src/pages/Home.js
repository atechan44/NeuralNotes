import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotes } from '../contexts/NotesContext';
import NoteCard from '../components/NoteCard';

const Home = () => {
  const { darkMode } = useTheme();
  const { notes, addNote, updateNote, deleteNote, viewMode, toggleViewMode } = useNotes();
  const [quickNote, setQuickNote] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: null,
    title: '',
    content: '',
    tags: [],
    imageUrl: ''
  });
  const [tagInput, setTagInput] = useState('');

  // Handle creating a quick note
  const handleQuickNoteSubmit = (e) => {
    e.preventDefault();
    if (quickNote.trim()) {
      // Extract title from first line or first few words
      const title = quickNote.split('\n')[0].trim().substring(0, 50) || 'Untitled Note';
      addNote({
        title,
        content: quickNote,
        tags: [],
        imageUrl: null
      });
      setQuickNote('');
    }
  };

  // Handle opening the note form for editing
  const handleEditNote = (id) => {
    const noteToEdit = notes.find(note => note.id === id);
    if (noteToEdit) {
      setCurrentNote({
        ...noteToEdit,
        tags: noteToEdit.tags.join(', ')
      });
      setShowNoteForm(true);
    }
  };

  // Handle opening the note form for creating a new note
  const handleNewNote = () => {
    setCurrentNote({
      id: null,
      title: '',
      content: '',
      tags: [],
      imageUrl: ''
    });
    setTagInput('');
    setShowNoteForm(true);
  };

  // Handle saving a note (new or edited)
  const handleSaveNote = (e) => {
    e.preventDefault();
    
    // Process tags
    const processedTags = tagInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    if (currentNote.id) {
      // Update existing note
      updateNote(currentNote.id, {
        ...currentNote,
        tags: processedTags
      });
    } else {
      // Add new note
      addNote({
        ...currentNote,
        tags: processedTags
      });
    }
    
    setShowNoteForm(false);
  };

  // Setup keyboard shortcut listener for new note
  React.useEffect(() => {
    const handleNewNoteShortcut = () => handleNewNote();
    document.addEventListener('newNote', handleNewNoteShortcut);
    return () => document.removeEventListener('newNote', handleNewNoteShortcut);
  }, []);

  return (
    <div className="container mx-auto max-w-6xl">
      {/* Quick Note Input */}
      <div className={`mb-6 ${darkMode ? 'text-dark-text' : 'text-gray-800'}`}>
        <form onSubmit={handleQuickNoteSubmit}>
          <div className={`relative rounded-lg shadow-sm ${
            darkMode ? 'bg-dark-secondary' : 'bg-white'
          }`}>
            <textarea
              rows="3"
              placeholder="Take a quick note..."
              className={`block w-full px-4 py-3 rounded-lg resize-none focus:outline-none ${
                darkMode 
                  ? 'bg-dark-secondary text-dark-text placeholder-gray-500' 
                  : 'bg-white text-gray-800 placeholder-gray-400'
              }`}
              value={quickNote}
              onChange={(e) => setQuickNote(e.target.value)}
            ></textarea>
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <button
                type="submit"
                disabled={!quickNote.trim()}
                className={`px-3 py-1 rounded-md ${
                  darkMode 
                    ? 'bg-dark-accent hover:bg-opacity-90 text-dark-primary' 
                    : 'bg-light-accent hover:bg-opacity-90 text-white'
                } transition-colors ${!quickNote.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Notes Header with View Toggle */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-dark-text' : 'text-gray-800'}`}>
          My Notes
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleNewNote}
            className={`p-2 rounded-md ${
              darkMode 
                ? 'bg-dark-accent hover:bg-opacity-90 text-dark-primary' 
                : 'bg-light-accent hover:bg-opacity-90 text-white'
            } transition-colors flex items-center`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            New
          </button>
          <button
            onClick={toggleViewMode}
            className={`p-2 rounded-md ${
              darkMode 
                ? 'bg-dark-primary hover:bg-opacity-90 text-dark-text' 
                : 'bg-light-primary hover:bg-opacity-90 text-gray-700'
            } transition-colors`}
            title={viewMode === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}
          >
            {viewMode === 'grid' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Notes Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
        {notes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            viewMode={viewMode}
            onEdit={handleEditNote}
            onDelete={deleteNote}
          />
        ))}
      </div>

      {/* Note Form Modal */}
      {showNoteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-lg shadow-lg ${darkMode ? 'bg-dark-secondary text-dark-text' : 'bg-white text-gray-800'}`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {currentNote.id ? 'Edit Note' : 'Create New Note'}
              </h3>
              <button 
                onClick={() => setShowNoteForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSaveNote} className="p-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className={`w-full px-3 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-dark-primary text-dark-text' 
                      : 'bg-light-primary text-gray-800'
                  } focus:outline-none focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent`}
                  value={currentNote.title}
                  onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  rows="8"
                  className={`w-full px-3 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-dark-primary text-dark-text' 
                      : 'bg-light-primary text-gray-800'
                  } focus:outline-none focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent`}
                  value={currentNote.content}
                  onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="tags" className="block text-sm font-medium mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  className={`w-full px-3 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-dark-primary text-dark-text' 
                      : 'bg-light-primary text-gray-800'
                  } focus:outline-none focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent`}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="e.g. work, ideas, project"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  className={`w-full px-3 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-dark-primary text-dark-text' 
                      : 'bg-light-primary text-gray-800'
                  } focus:outline-none focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent`}
                  value={currentNote.imageUrl || ''}
                  onChange={(e) => setCurrentNote({...currentNote, imageUrl: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNoteForm(false)}
                  className={`px-4 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-dark-primary hover:bg-opacity-90 text-dark-text' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  } transition-colors`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-dark-accent hover:bg-opacity-90 text-dark-primary' 
                      : 'bg-light-accent hover:bg-opacity-90 text-white'
                  } transition-colors`}
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
