import React from 'react';
import { CalendarProvider } from '../contexts/CalendarContext';
import Calendar from '../components/Calendar';

const CalendarPage = () => {
  return (
    <div className="h-full flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-200">Calendar</h1>
      <div className="flex-1 bg-black rounded-lg shadow-lg overflow-hidden">
        <CalendarProvider>
          <div className="h-full p-6">
            <Calendar />
          </div>
        </CalendarProvider>
      </div>
    </div>
  );
};

export default CalendarPage;
