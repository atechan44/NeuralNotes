import React from 'react';
import TodoList from '../components/TodoList';
import { TodoProvider } from '../contexts/TodoContext';
import { useTheme } from '../contexts/ThemeContext';

const TodoPage = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Todo List</h1>
        
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </div>
    </div>
  );
};

export default TodoPage;
