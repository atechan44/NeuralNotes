import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useTheme } from '../contexts/ThemeContext';

const EventModal = ({ isOpen, onClose, event, onSave, onDelete, mode }) => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    description: '',
    location: '',
    color: '#2196F3'
  });
  
  const colorOptions = [
    { value: '#2196F3', label: 'Blue' },
    { value: '#4CAF50', label: 'Green' },
    { value: '#FFC107', label: 'Amber' },
    { value: '#F44336', label: 'Red' },
    { value: '#9C27B0', label: 'Purple' },
    { value: '#FF9800', label: 'Orange' },
  ];

  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        start: event.start instanceof Date ? event.start : new Date(event.start),
        end: event.end instanceof Date ? event.end : new Date(event.end),
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const [datePart, timePart] = value.split('T');
    
    const newDate = new Date(formData[name]);
    const [year, month, day] = datePart.split('-').map(Number);
    
    if (timePart) {
      const [hours, minutes] = timePart.split(':').map(Number);
      newDate.setFullYear(year, month - 1, day);
      newDate.setHours(hours, minutes, 0, 0);
    } else {
      newDate.setFullYear(year, month - 1, day);
    }
    
    setFormData({
      ...formData,
      [name]: newDate
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    onDelete(event.id);
    onClose();
  };

  if (!isOpen) return null;

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const isAddMode = mode === 'add';
  const modalTitle = isAddMode ? 'Add Event' : isEditMode ? 'Edit Event' : 'Event Details';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className={`relative w-full max-w-md p-6 rounded-lg shadow-lg ${
        darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'
      }`}>
        <h2 className="text-xl font-semibold mb-4">{modalTitle}</h2>
        
        {isViewMode ? (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-medium">{formData.title}</h3>
              <div className="flex items-center mt-2">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: formData.color }}
                ></div>
                <span className="text-sm">
                  {format(formData.start, 'MMM dd, yyyy h:mm a')} - {format(formData.end, 'h:mm a')}
                </span>
              </div>
              {formData.location && (
                <div className="mt-2 text-sm">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Location: </span>
                  {formData.location}
                </div>
              )}
              {formData.description && (
                <div className="mt-4">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Description: </span>
                  <p className="mt-1">{formData.description}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => {
                  onClose();
                  // You could add a callback here to open in edit mode
                }}
                className={`px-4 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  // You could add a callback here to open in edit mode
                }}
                className={`px-4 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Title*
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-200' 
                    : 'bg-gray-100 border-gray-300 text-gray-800'
                } border focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Start*
                </label>
                <input
                  type="datetime-local"
                  name="start"
                  value={format(formData.start, "yyyy-MM-dd'T'HH:mm")}
                  onChange={handleDateChange}
                  required
                  className={`w-full px-3 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-200' 
                      : 'bg-gray-100 border-gray-300 text-gray-800'
                  } border focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                />
              </div>
              <div>
                <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  End*
                </label>
                <input
                  type="datetime-local"
                  name="end"
                  value={format(formData.end, "yyyy-MM-dd'T'HH:mm")}
                  onChange={handleDateChange}
                  required
                  className={`w-full px-3 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-200' 
                      : 'bg-gray-100 border-gray-300 text-gray-800'
                  } border focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-200' 
                    : 'bg-gray-100 border-gray-300 text-gray-800'
                } border focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              />
            </div>
            
            <div className="mb-4">
              <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className={`w-full px-3 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-200' 
                    : 'bg-gray-100 border-gray-300 text-gray-800'
                } border focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Color
              </label>
              <div className="flex space-x-2">
                {colorOptions.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData({...formData, color: color.value})}
                    className={`w-8 h-8 rounded-full border-2 ${
                      formData.color === color.value 
                        ? 'border-yellow-500' 
                        : darkMode ? 'border-gray-700' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.label}
                  ></button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className={`px-4 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-red-800 hover:bg-red-700 text-white' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                }`}
              >
                {isAddMode ? 'Add' : 'Save'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventModal;
