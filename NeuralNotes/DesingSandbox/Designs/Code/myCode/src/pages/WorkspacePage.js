import React, { useState, useEffect } from 'react';
import { useNotes } from '../contexts/NotesContext';
import { useCalendar } from '../contexts/CalendarContext';
import BlockEditor from '../components/BlockEditor';
import { format } from 'date-fns';

const WorkspacePage = () => {
  const { notes, addNote } = useNotes();
  const { events = [] } = useCalendar() || {};
  const [recentNotes, setRecentNotes] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [quickNote, setQuickNote] = useState([]);
  const [showQuickNoteEditor, setShowQuickNoteEditor] = useState(false);
  const [workspaceTitle, setWorkspaceTitle] = useState('My Workspace');
  const [editingTitle, setEditingTitle] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Get recent notes and upcoming events
  useEffect(() => {
    // Sort notes by updated date and get the 3 most recent
    const sortedNotes = [...notes].sort((a, b) => 
      new Date(b.updatedAt) - new Date(a.updatedAt)
    ).slice(0, 3);
    setRecentNotes(sortedNotes);

    // Get upcoming events (next 3 days)
    const now = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(now.getDate() + 3);
    
    const filtered = events.filter(event => {
      const eventStart = new Date(event.start);
      return eventStart >= now && eventStart <= threeDaysLater;
    }).sort((a, b) => new Date(a.start) - new Date(b.start)).slice(0, 3);
    
    setUpcomingEvents(filtered);
  }, [notes, events]);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = notes.filter(note => 
      note.title.toLowerCase().includes(query) || 
      note.content.toLowerCase().includes(query) ||
      note.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    setSearchResults(results);
    setShowSearchResults(true);
  }, [searchQuery, notes]);

  // Save quick note
  const handleSaveQuickNote = (blocks) => {
    if (blocks.length === 0 || (blocks.length === 1 && blocks[0].content.trim() === '')) {
      return;
    }

    // Extract title from first block
    const title = blocks[0].content.trim() || 'Untitled Note';
    
    // Convert blocks to content
    const content = blocks.map(block => {
      switch (block.type) {
        case 'heading_1':
          return `# ${block.content}`;
        case 'heading_2':
          return `## ${block.content}`;
        case 'heading_3':
          return `### ${block.content}`;
        case 'bulleted_list':
          return `• ${block.content}`;
        case 'numbered_list':
          return `1. ${block.content}`;
        case 'to_do':
          return `${block.checked ? '✓' : '☐'} ${block.content}`;
        case 'quote':
          return `> ${block.content}`;
        case 'code':
          return '```\n' + block.content + '\n```';
        case 'divider':
          return '---';
        default:
          return block.content;
      }
    }).join('\n\n');

    // Create new note
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      tags: ['quick-note'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: null
    };

    addNote(newNote);
    setQuickNote([]);
    setShowQuickNoteEditor(false);
  };

  // Format date for events
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, h:mm a');
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header with search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          {editingTitle ? (
            <input
              type="text"
              value={workspaceTitle}
              onChange={(e) => setWorkspaceTitle(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditingTitle(false)}
              className="text-3xl font-bold bg-transparent border-b-2 border-yellow-500 outline-none"
              autoFocus
            />
          ) : (
            <h1 
              className="text-3xl font-bold cursor-pointer hover:text-yellow-500 transition-colors"
              onClick={() => setEditingTitle(true)}
            >
              {workspaceTitle}
              <span className="ml-2 text-gray-500 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </span>
            </h1>
          )}
        </div>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {searchQuery && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setShowSearchResults(false);
              }}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-gray-800 border border-gray-700">
              <div className="py-1">
                {searchResults.map(note => (
                  <button 
                    key={note.id}
                    onClick={() => {
                      // Navigate to note (implement this)
                      setSearchQuery('');
                      setShowSearchResults(false);
                      document.dispatchEvent(new CustomEvent('navigate', { detail: { destination: 'notes' } }));
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                  >
                    <div className="font-medium">{note.title}</div>
                    <div className="text-gray-400 truncate">{note.content.substring(0, 60)}...</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Note Section */}
        <div className="col-span-2 bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Quick Note</h2>
            {showQuickNoteEditor && (
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleSaveQuickNote(quickNote)}
                  className="px-3 py-1 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors text-sm font-medium"
                >
                  Save as Note
                </button>
                <button 
                  onClick={() => {
                    setQuickNote([]);
                    setShowQuickNoteEditor(false);
                  }}
                  className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          
          {showQuickNoteEditor ? (
            <BlockEditor 
              initialBlocks={quickNote}
              onChange={setQuickNote}
            />
          ) : (
            <button
              onClick={() => setShowQuickNoteEditor(true)}
              className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center hover:border-yellow-500 transition-colors"
            >
              <div className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create a new note
              </div>
            </button>
          )}
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="p-3 bg-gray-700 rounded-md">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-gray-400 mt-1">
                    {formatEventDate(event.start)}
                  </div>
                </div>
              ))}
              <button 
                onClick={() => document.dispatchEvent(new CustomEvent('navigate', { detail: { destination: 'calendar' } }))}
                className="block w-full text-center text-sm text-yellow-500 hover:text-yellow-400 mt-2"
              >
                View all in Calendar →
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-6">
              No upcoming events
            </div>
          )}
        </div>
        
        {/* Recent Notes */}
        <div className="col-span-2 bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Notes</h2>
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('navigate', { detail: { destination: 'notes' } }))}
              className="text-sm text-yellow-500 hover:text-yellow-400"
            >
              View all →
            </button>
          </div>
          
          {recentNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentNotes.map(note => (
                <div key={note.id} className="bg-gray-700 rounded-md p-4">
                  <h3 className="font-medium mb-2">{note.title}</h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {note.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          // Open note for editing
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              No notes yet
            </div>
          )}
        </div>
        
        {/* Quick Links */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          
          <div className="space-y-2">
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('navigate', { detail: { destination: 'calendar' } }))}
              className="block w-full text-left p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Calendar
              </div>
            </button>
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('navigate', { detail: { destination: 'notes' } }))}
              className="block w-full text-left p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                All Notes
              </div>
            </button>
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('newNote'))}
              className="block w-full text-left p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Create New Note
              </div>
            </button>
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('navigate', { detail: { destination: 'todo' } }))}
              className="block w-full text-left p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Todo List
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
