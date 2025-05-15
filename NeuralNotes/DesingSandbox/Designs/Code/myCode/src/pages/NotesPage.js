import React, { useState, useEffect } from 'react';
import { useNotes } from '../contexts/NotesContext';
import { useTheme } from '../contexts/ThemeContext';
import NoteCard from '../components/NoteCard';
import NoteEditor from '../components/NoteEditor';

const NotesPage = () => {
  const { darkMode } = useTheme();
  const { notes, addNote, updateNote, deleteNote, viewMode, toggleViewMode } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('updatedAt'); // 'updatedAt', 'createdAt', 'title'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  
  // Get all unique tags from notes
  const allTags = [...new Set(notes.flatMap(note => note.tags))];
  
  // Filter notes based on search query and selected tag
  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === '' || 
      note.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });
  
  // Sort filtered notes
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === 'title') {
      return sortOrder === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else {
      return sortOrder === 'asc' 
        ? new Date(a[sortBy]) - new Date(b[sortBy])
        : new Date(b[sortBy]) - new Date(a[sortBy]);
    }
  });
  
  // Handle note editing
  const handleEditNote = (noteId) => {
    const noteToEdit = notes.find(note => note.id === noteId);
    setEditingNote(noteToEdit);
    setIsEditorOpen(true);
  };
  
  // Handle note creation
  const handleCreateNote = () => {
    setEditingNote(null);
    setIsEditorOpen(true);
  };
  
  // Handle editor save
  const handleSaveNote = (noteData) => {
    if (editingNote) {
      updateNote(editingNote.id, noteData);
    } else {
      addNote(noteData);
    }
    setIsEditorOpen(false);
    setEditingNote(null);
  };
  
  // Handle editor cancel
  const handleCancelEdit = () => {
    setIsEditorOpen(false);
    setEditingNote(null);
  };
  
  // Handle note deletion with confirmation
  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(noteId);
    }
  };
  
  // Toggle sort order when clicking on sort headers
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag('');
  };
  
  // Listen for Ctrl+N keyboard shortcut to create a new note
  useEffect(() => {
    const handleNewNoteShortcut = (e) => {
      if (e.ctrlKey && e.key === 'n' && !isEditorOpen) {
        e.preventDefault();
        handleCreateNote();
      }
    };
    
    document.addEventListener('keydown', handleNewNoteShortcut);
    
    // Listen for custom newNote event
    const handleNewNoteEvent = () => {
      if (!isEditorOpen) {
        handleCreateNote();
      }
    };
    
    document.addEventListener('newNote', handleNewNoteEvent);
    
    return () => {
      document.removeEventListener('keydown', handleNewNoteShortcut);
      document.removeEventListener('newNote', handleNewNoteEvent);
    };
  }, [isEditorOpen]);
  
  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-200">Notes</h1>
        
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <button 
            onClick={toggleViewMode}
            className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            title={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
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
          
          {/* Create Note Button */}
          <button
            onClick={handleCreateNote}
            className={`px-4 py-2 rounded-md flex items-center ${
              darkMode 
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                : 'bg-yellow-500 hover:bg-yellow-600 text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Note
          </button>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 pl-10 rounded-md ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-200 focus:border-yellow-500' 
                    : 'bg-white border-gray-300 text-gray-800 focus:border-yellow-500'
                } border focus:outline-none focus:ring-1 focus:ring-yellow-500`}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          {/* Tag Filter */}
          <div className="md:w-1/4">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className={`w-full px-4 py-2 rounded-md ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-gray-200' 
                  : 'bg-white border-gray-300 text-gray-800'
              } border focus:outline-none focus:ring-1 focus:ring-yellow-500`}
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          
          {/* Sort Options */}
          <div className="md:w-1/4">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className={`w-full px-4 py-2 rounded-md ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-gray-200' 
                  : 'bg-white border-gray-300 text-gray-800'
              } border focus:outline-none focus:ring-1 focus:ring-yellow-500`}
            >
              <option value="updatedAt-desc">Recently Updated</option>
              <option value="updatedAt-asc">Oldest Updated</option>
              <option value="createdAt-desc">Recently Created</option>
              <option value="createdAt-asc">Oldest Created</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
          
          {/* Clear Filters */}
          {(searchQuery || selectedTag) && (
            <button
              onClick={clearFilters}
              className={`px-4 py-2 rounded-md ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
      
      {/* Notes Count and Sort Headers */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          {filteredNotes.length === 0 
            ? 'No notes found' 
            : `Showing ${filteredNotes.length} ${filteredNotes.length === 1 ? 'note' : 'notes'}`
          }
        </div>
        
        {filteredNotes.length > 0 && viewMode === 'list' && (
          <div className="flex text-xs space-x-4">
            <button 
              onClick={() => handleSortChange('title')}
              className={`flex items-center ${sortBy === 'title' ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              Title
              {sortBy === 'title' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  {sortOrder === 'asc' ? (
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  )}
                </svg>
              )}
            </button>
            <button 
              onClick={() => handleSortChange('updatedAt')}
              className={`flex items-center ${sortBy === 'updatedAt' ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              Updated
              {sortBy === 'updatedAt' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  {sortOrder === 'asc' ? (
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  )}
                </svg>
              )}
            </button>
            <button 
              onClick={() => handleSortChange('createdAt')}
              className={`flex items-center ${sortBy === 'createdAt' ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              Created
              {sortBy === 'createdAt' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  {sortOrder === 'asc' ? (
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  )}
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* Notes Grid/List */}
      <div className={`flex-1 overflow-y-auto ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col'}`}>
        {sortedNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-400 mb-2">No notes found</p>
            <button
              onClick={handleCreateNote}
              className={`px-4 py-2 rounded-md ${
                darkMode 
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                  : 'bg-yellow-500 hover:bg-yellow-600 text-white'
              }`}
            >
              Create your first note
            </button>
          </div>
        ) : (
          sortedNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              viewMode={viewMode}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))
        )}
      </div>
      
      {/* Note Editor Modal */}
      {isEditorOpen && (
        <NoteEditor
          note={editingNote}
          onSave={handleSaveNote}
          onCancel={handleCancelEdit}
          allTags={allTags}
        />
      )}
    </div>
  );
};

export default NotesPage;
