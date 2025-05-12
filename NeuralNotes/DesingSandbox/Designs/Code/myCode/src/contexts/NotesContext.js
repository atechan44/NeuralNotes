import React, { createContext, useContext, useState, useEffect } from 'react';

// Sample mock data for notes
const initialNotes = [
  {
    id: '1',
    title: 'Welcome to NeuralNotes',
    content: 'NeuralNotes is an AI-powered note-taking app designed for simplicity and productivity.',
    tags: ['welcome', 'getting-started'],
    createdAt: new Date('2025-05-01').toISOString(),
    updatedAt: new Date('2025-05-01').toISOString(),
    imageUrl: null
  },
  {
    id: '2',
    title: 'Meeting with Design Team',
    content: 'Discussed new UI components and color schemes for the upcoming product release.',
    tags: ['meeting', 'design', 'ui'],
    createdAt: new Date('2025-05-05').toISOString(),
    updatedAt: new Date('2025-05-05').toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '3',
    title: 'Project Roadmap',
    content: '- Phase 1: Research & Planning (Complete)\n- Phase 2: Design & Prototyping (In Progress)\n- Phase 3: Development\n- Phase 4: Testing\n- Phase 5: Deployment',
    tags: ['project', 'planning', 'roadmap'],
    createdAt: new Date('2025-05-07').toISOString(),
    updatedAt: new Date('2025-05-09').toISOString(),
    imageUrl: null
  },
  {
    id: '4',
    title: 'Book Recommendations',
    content: '1. "Atomic Habits" by James Clear\n2. "Deep Work" by Cal Newport\n3. "The Design of Everyday Things" by Don Norman',
    tags: ['books', 'reading', 'recommendations'],
    createdAt: new Date('2025-05-08').toISOString(),
    updatedAt: new Date('2025-05-08').toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '5',
    title: 'Weekly Goals',
    content: '- Complete project proposal\n- Review team feedback\n- Prepare presentation slides\n- Schedule client meeting',
    tags: ['goals', 'weekly', 'tasks'],
    createdAt: new Date('2025-05-10').toISOString(),
    updatedAt: new Date('2025-05-10').toISOString(),
    imageUrl: null
  }
];

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    // Try to get notes from localStorage
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : initialNotes;
  });
  
  const [viewMode, setViewMode] = useState(() => {
    const savedViewMode = localStorage.getItem('viewMode');
    return savedViewMode || 'grid';
  });

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Save view mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  // Add a new note
  const addNote = (note) => {
    const newNote = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...note
    };
    setNotes([newNote, ...notes]);
  };

  // Update an existing note
  const updateNote = (id, updatedNote) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() } 
        : note
    ));
  };

  // Delete a note
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Toggle view mode (grid/list)
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  return (
    <NotesContext.Provider 
      value={{ 
        notes, 
        addNote, 
        updateNote, 
        deleteNote, 
        viewMode, 
        toggleViewMode 
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
