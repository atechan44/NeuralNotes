import React, { createContext, useContext, useState, useEffect } from 'react';
import { addDays, subDays } from 'date-fns';

const CalendarContext = createContext();

export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'

  // Load events from localStorage on initial render
  useEffect(() => {
    const savedEvents = localStorage.getItem('neuralnotesEvents');
    if (savedEvents) {
      // Convert string dates back to Date objects
      const parsedEvents = JSON.parse(savedEvents).map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
      setEvents(parsedEvents);
    } else {
      // Create some sample events if none exist
      const today = new Date();
      const sampleEvents = [
        {
          id: '1',
          title: 'Project Kickoff',
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
          description: 'Initial meeting to discuss project goals and timeline',
          location: 'Conference Room A',
          color: '#4CAF50' // green
        },
        {
          id: '2',
          title: 'Team Standup',
          start: addDays(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0), 1),
          end: addDays(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30), 1),
          description: 'Daily team standup meeting',
          location: 'Zoom',
          color: '#2196F3' // blue
        },
        {
          id: '3',
          title: 'Client Presentation',
          start: addDays(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0), 3),
          end: addDays(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30), 3),
          description: 'Present project progress to the client',
          location: 'Client Office',
          color: '#FFC107' // amber
        },
        {
          id: '4',
          title: 'Research Time',
          start: subDays(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0), 2),
          end: subDays(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0), 2),
          description: 'Dedicated time for research and learning',
          location: 'Home Office',
          color: '#9C27B0' // purple
        }
      ];
      setEvents(sampleEvents);
      localStorage.setItem('neuralnotesEvents', JSON.stringify(sampleEvents));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('neuralnotesEvents', JSON.stringify(events));
  }, [events]);

  // Add a new event
  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: Date.now().toString(), // Simple ID generation
    };
    setEvents([...events, eventWithId]);
    return eventWithId;
  };

  // Update an existing event
  const updateEvent = (updatedEvent) => {
    const updatedEvents = events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
  };

  // Delete an event
  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  // Open modal to add a new event
  const openAddModal = (start, end) => {
    setSelectedEvent({
      title: '',
      start: start || new Date(),
      end: end || new Date(new Date().setHours(new Date().getHours() + 1)),
      description: '',
      location: '',
      color: '#2196F3' // Default blue
    });
    setModalMode('add');
    setIsModalOpen(true);
  };

  // Open modal to edit an event
  const openEditModal = (event) => {
    setSelectedEvent(event);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  // Open modal to view event details
  const openViewModal = (event) => {
    setSelectedEvent(event);
    setModalMode('view');
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <CalendarContext.Provider value={{
      events,
      selectedEvent,
      isModalOpen,
      modalMode,
      addEvent,
      updateEvent,
      deleteEvent,
      openAddModal,
      openEditModal,
      openViewModal,
      closeModal
    }}>
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContext;
