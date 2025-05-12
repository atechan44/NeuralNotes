import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { useTodo } from '../contexts/TodoContext';
import { useTheme } from '../contexts/ThemeContext';

const TodoList = () => {
  const { 
    todos, 
    filter, 
    sort, 
    counts, 
    setFilter, 
    setSort, 
    addTodo, 
    clearCompleted 
  } = useTodo();
  const { darkMode } = useTheme();
  
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState('medium');
  const [newTodoDueDate, setNewTodoDueDate] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      addTodo(
        newTodoText, 
        newTodoPriority, 
        newTodoDueDate ? new Date(newTodoDueDate).toISOString() : null
      );
      setNewTodoText('');
      setNewTodoPriority('medium');
      setNewTodoDueDate('');
      setShowAddForm(false);
    }
  };

  return (
    <div className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">My Tasks</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center px-3 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            {showAddForm ? 'Cancel' : 'Add Task'}
          </button>
        </div>
        
        {/* Add Todo Form */}
        {showAddForm && (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              className={`w-full p-2 rounded-md ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
              }`}
              autoFocus
            />
            
            <div className="flex flex-wrap gap-3">
              <select
                value={newTodoPriority}
                onChange={(e) => setNewTodoPriority(e.target.value)}
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
                value={newTodoDueDate}
                onChange={(e) => setNewTodoDueDate(e.target.value)}
                className={`p-2 rounded-md ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                }`}
                placeholder="Due Date"
              />
              
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white ml-auto"
              >
                Add Task
              </button>
            </div>
          </form>
        )}
      </div>
      
      {/* Filters and Sorting */}
      <div className="p-4 border-b border-gray-700 flex flex-wrap justify-between items-center gap-3">
        <div className="flex space-x-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            All ({counts.total})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'active'
                ? 'bg-blue-500 text-white'
                : darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Active ({counts.active})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'completed'
                ? 'bg-blue-500 text-white'
                : darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Completed ({counts.completed})
          </button>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm mr-2">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={`p-1 rounded-md text-sm ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
            }`}
          >
            <option value="date">Date Created</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
      
      {/* Todo Items */}
      <div className="p-4 max-h-[60vh] overflow-y-auto">
        {todos.length === 0 ? (
          <div className="text-center py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-gray-500">
              {filter === 'all'
                ? 'No tasks yet. Add a new task to get started!'
                : filter === 'active'
                ? 'No active tasks. Great job!'
                : 'No completed tasks yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      {counts.completed > 0 && (
        <div className="p-4 border-t border-gray-700 flex justify-end">
          <button
            onClick={clearCompleted}
            className={`px-3 py-1.5 rounded-md text-sm ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Clear completed ({counts.completed})
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
