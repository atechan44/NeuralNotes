import React, { useState, useCallback } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addDays } from 'date-fns';
import { useCalendar } from '../contexts/CalendarContext';
import { useTheme } from '../contexts/ThemeContext';
import EventModal from './EventModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = () => {
  const { darkMode } = useTheme();
  const { 
    events, 
    addEvent, 
    updateEvent, 
    deleteEvent, 
    isModalOpen, 
    selectedEvent, 
    modalMode,
    openAddModal,
    openEditModal,
    openViewModal,
    closeModal
  } = useCalendar();
  
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  // Custom event styling
  const eventStyleGetter = useCallback((event) => {
    const style = {
      backgroundColor: event.color || '#2196F3',
      borderRadius: '4px',
      opacity: 0.9,
      color: '#fff',
      border: '0px',
      display: 'block',
      fontWeight: '500'
    };
    return {
      style
    };
  }, []);

  // Handle slot selection (clicking on a time slot)
  const handleSelectSlot = useCallback(({ start, end }) => {
    openAddModal(start, end);
  }, [openAddModal]);

  // Handle event selection (clicking on an event)
  const handleSelectEvent = useCallback((event) => {
    openViewModal(event);
  }, [openViewModal]);

  // Handle saving an event (add or update)
  const handleSaveEvent = useCallback((event) => {
    if (event.id) {
      updateEvent(event);
    } else {
      addEvent(event);
    }
  }, [addEvent, updateEvent]);

  // Calendar toolbar customization
  const CustomToolbar = ({ label, onNavigate, onView }) => {
    return (
      <div className={`flex items-center justify-between mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        <div className="flex space-x-2">
          <button
            onClick={() => onNavigate('TODAY')}
            className={`px-3 py-1 rounded-md text-sm ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => onNavigate('PREV')}
            className={`px-3 py-1 rounded-md ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => onNavigate('NEXT')}
            className={`px-3 py-1 rounded-md ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <h2 className="text-xl font-semibold">{label}</h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onView('month')}
            className={`px-3 py-1 rounded-md text-sm ${
              view === 'month'
                ? darkMode 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-yellow-500 text-white'
                : darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => onView('week')}
            className={`px-3 py-1 rounded-md text-sm ${
              view === 'week'
                ? darkMode 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-yellow-500 text-white'
                : darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => onView('day')}
            className={`px-3 py-1 rounded-md text-sm ${
              view === 'day'
                ? darkMode 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-yellow-500 text-white'
                : darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => onView('agenda')}
            className={`px-3 py-1 rounded-md text-sm ${
              view === 'agenda'
                ? darkMode 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-yellow-500 text-white'
                : darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Agenda
          </button>
        </div>
      </div>
    );
  };

  // Add custom CSS classes for dark mode
  const calendarClasses = darkMode 
    ? 'rbc-calendar-dark' 
    : '';

  return (
    <div className="h-full flex flex-col">
      <style jsx global>{`
        /* Dark mode styles for react-big-calendar */
        .rbc-calendar-dark {
          background-color: #111;
          color: #e5e5e5;
        }
        .rbc-calendar-dark .rbc-header {
          background-color: #222;
          color: #e5e5e5;
        }
        .rbc-calendar-dark .rbc-month-view,
        .rbc-calendar-dark .rbc-time-view,
        .rbc-calendar-dark .rbc-agenda-view {
          border-color: #333;
        }
        .rbc-calendar-dark .rbc-day-bg {
          background-color: #1a1a1a;
        }
        .rbc-calendar-dark .rbc-off-range-bg {
          background-color: #111;
        }
        .rbc-calendar-dark .rbc-today {
          background-color: rgba(255, 214, 0, 0.1);
        }
        .rbc-calendar-dark .rbc-time-slot {
          border-color: #333;
        }
        .rbc-calendar-dark .rbc-time-header-content,
        .rbc-calendar-dark .rbc-time-header-gutter {
          background-color: #222;
          border-color: #333;
        }
        .rbc-calendar-dark .rbc-time-content {
          border-color: #333;
        }
        .rbc-calendar-dark .rbc-day-slot .rbc-time-slot {
          border-color: #333;
        }
        .rbc-calendar-dark .rbc-agenda-table {
          border-color: #333;
          color: #e5e5e5;
        }
        .rbc-calendar-dark .rbc-agenda-table thead {
          background-color: #222;
        }
        .rbc-calendar-dark .rbc-agenda-table tbody tr {
          border-bottom: 1px solid #333;
        }
        .rbc-calendar-dark .rbc-agenda-table tbody tr:hover {
          background-color: #222;
        }
      `}</style>
      
      <div className="flex justify-end mb-4">
        <button
          onClick={() => openAddModal()}
          className={`px-4 py-2 rounded-md flex items-center ${
            darkMode 
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Event
        </button>
      </div>
      
      <div className="flex-1">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          components={{
            toolbar: CustomToolbar
          }}
          className={calendarClasses}
        />
      </div>
      
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={closeModal}
          event={selectedEvent}
          onSave={handleSaveEvent}
          onDelete={deleteEvent}
          mode={modalMode}
        />
      )}
    </div>
  );
};

export default Calendar;
