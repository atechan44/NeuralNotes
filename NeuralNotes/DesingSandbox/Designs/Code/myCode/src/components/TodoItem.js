import React, { useState, useRef, useEffect } from 'react';
import { useTodo } from '../contexts/TodoContext';
import { useTheme } from '../contexts/ThemeContext';

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo, editTodo } = useTodo();
  const { darkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ? todo.dueDate.substring(0, 10) : '');
  const inputRef = useRef(null);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Check if todo is overdue
  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  };

  // Handle edit submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      editTodo(todo.id, {
        text: editText,
        priority: editPriority,
        dueDate: editDueDate ? new Date(editDueDate).toISOString() : null
      });
      setIsEditing(false);
    }
  };

  // Get priority color
  const getPriorityColor = () => {
    switch (todo.priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      className={`group mb-2 rounded-lg p-3 transition-all duration-200 ${
        darkMode 
          ? 'bg-gray-800 hover:bg-gray-700' 
          : 'bg-white hover:bg-gray-50'
      } ${todo.completed ? 'opacity-70' : ''}`}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className={`w-full p-2 rounded-md ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
            }`}
          />
          
          <div className="flex flex-wrap gap-2">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className={`p-2 rounded-md ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className={`p-2 rounded-md ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className={`px-3 py-1 rounded-md ${
                darkMode 
                  ? 'bg-gray-600 hover:bg-gray-500' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-1">
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                todo.completed
                  ? 'bg-blue-500 border-blue-500'
                  : darkMode
                  ? 'border-gray-400 hover:border-blue-400'
                  : 'border-gray-400 hover:border-blue-400'
              }`}
            >
              {todo.completed && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <p
                className={`text-sm font-medium ${
                  todo.completed
                    ? 'line-through text-gray-500'
                    : darkMode
                    ? 'text-white'
                    : 'text-gray-900'
                }`}
              >
                {todo.text}
              </p>
              
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => setIsEditing(true)}
                  className={`p-1 rounded-md ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={`p-1 rounded-md ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="mt-1 flex items-center space-x-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${getPriorityColor()}`}
                title={`${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority`}
              ></span>
              
              {todo.dueDate && (
                <span
                  className={`text-xs ${
                    isOverdue()
                      ? 'text-red-500'
                      : darkMode
                      ? 'text-gray-400'
                      : 'text-gray-500'
                  }`}
                >
                  {isOverdue() ? 'Overdue: ' : 'Due: '}
                  {formatDate(todo.dueDate)}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
