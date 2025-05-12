import React, { useState, useEffect } from 'react';
import { useNotes } from '../contexts/NotesContext';
import { useTheme } from '../contexts/ThemeContext';

const HomePage = () => {
  const { darkMode } = useTheme();
  const { notes } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [recentNotes, setRecentNotes] = useState([]);
  const [starredNotes, setStarredNotes] = useState([]);

  // Get recent and starred notes
  useEffect(() => {
    // Sort notes by updated date and get the most recent
    const sorted = [...notes].sort((a, b) => 
      new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    
    setRecentNotes(sorted.slice(0, 6));
    
    // Filter notes with 'starred' tag
    const starred = notes.filter(note => 
      note.tags && note.tags.includes('starred')
    );
    setStarredNotes(starred.slice(0, 6));
  }, [notes]);

  // Filter notes based on active tab
  const getFilteredNotes = () => {
    switch(activeTab) {
      case 'myself':
        return recentNotes.filter(note => 
          note.tags && note.tags.includes('personal')
        );
      case 'starred':
        return starredNotes;
      case 'all':
      default:
        return recentNotes;
    }
  };

  const filteredNotes = getFilteredNotes();

  // Handle note click
  const handleNoteClick = (noteId) => {
    // Navigate to note detail page
    document.dispatchEvent(new CustomEvent('navigate', { 
      detail: { destination: 'notes', noteId }
    }));
  };

  // Generate a random background color for notes without images
  const getRandomColor = (id) => {
    const colors = [
      'bg-blue-800', 'bg-purple-800', 'bg-green-800', 
      'bg-indigo-800', 'bg-pink-800', 'bg-teal-800'
    ];
    const index = id.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Truncate text to a certain length
  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
  };

  return (
    <div className={`h-full flex flex-col p-6 overflow-y-auto ${darkMode ? 'bg-black' : 'bg-gray-900'}`}>
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-200">
          What can I help with?
        </h1>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Ask anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <div className="absolute right-4 top-3 flex items-center">
            <span className="text-gray-400 mr-2">gemini-20</span>
            <button className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md ${activeTab === 'all' 
              ? 'bg-gray-700 text-white' 
              : 'text-gray-400 hover:text-white'}`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab('myself')}
            className={`px-4 py-2 rounded-md ${activeTab === 'myself' 
              ? 'bg-gray-700 text-white' 
              : 'text-gray-400 hover:text-white'}`}
          >
            Myself
          </button>
          <button 
            onClick={() => setActiveTab('starred')}
            className={`px-4 py-2 rounded-md ${activeTab === 'starred' 
              ? 'bg-gray-700 text-white' 
              : 'text-gray-400 hover:text-white'}`}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          </button>
        </div>
        
        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.length > 0 ? (
            filteredNotes.map(note => (
              <div 
                key={note.id}
                onClick={() => handleNoteClick(note.id)}
                className={`rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform transform hover:scale-105 h-64 flex flex-col`}
              >
                {note.imageUrl ? (
                  <div className="h-2/3 bg-cover bg-center" style={{ backgroundImage: `url(${note.imageUrl})` }}></div>
                ) : (
                  <div className={`h-2/3 ${getRandomColor(note.id)} flex items-center justify-center p-4`}>
                    <p className="text-white text-lg font-medium text-center">
                      {truncateText(note.title, 50)}
                    </p>
                  </div>
                )}
                <div className="h-1/3 bg-gray-800 p-3 flex flex-col justify-between">
                  <h3 className="font-medium text-gray-200 mb-1">{note.title}</h3>
                  <div className="text-sm text-gray-400">
                    {note.tags && note.tags[0] && (
                      <span className="block">{note.tags[0]}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-gray-400">
              No notes found. Create your first note!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
