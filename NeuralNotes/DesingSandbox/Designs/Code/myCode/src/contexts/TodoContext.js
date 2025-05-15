import React, { createContext, useState, useContext, useEffect } from 'react';

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [sort, setSort] = useState('date'); // date, priority, alphabetical

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem('neuralnotes_todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      // Sample todos for first-time users
      setTodos([
        {
          id: '1',
          text: 'Welcome to NeuralNotes Todo List',
          completed: false,
          priority: 'high',
          dueDate: new Date(Date.now() + 86400000).toISOString(), // tomorrow
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          text: 'Try adding a new task',
          completed: false,
          priority: 'medium',
          dueDate: new Date(Date.now() + 172800000).toISOString(), // day after tomorrow
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          text: 'Mark tasks as complete',
          completed: true,
          priority: 'low',
          dueDate: null,
          createdAt: new Date().toISOString()
        }
      ]);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('neuralnotes_todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (text, priority = 'medium', dueDate = null) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString()
    };
    
    setTodos([newTodo, ...todos]);
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Edit a todo
  const editTodo = (id, updates) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  // Clear completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Get filtered todos
  const getFilteredTodos = () => {
    let filteredTodos = [...todos];
    
    // Apply filter
    if (filter === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }
    
    // Apply sort
    if (sort === 'date') {
      filteredTodos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      filteredTodos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sort === 'dueDate') {
      filteredTodos.sort((a, b) => {
        // Null due dates go to the end
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sort === 'alphabetical') {
      filteredTodos.sort((a, b) => a.text.localeCompare(b.text));
    }
    
    return filteredTodos;
  };

  // Get counts for active and completed todos
  const getCounts = () => {
    const active = todos.filter(todo => !todo.completed).length;
    const completed = todos.filter(todo => todo.completed).length;
    return { active, completed, total: todos.length };
  };

  return (
    <TodoContext.Provider
      value={{
        todos: getFilteredTodos(),
        filter,
        sort,
        counts: getCounts(),
        setFilter,
        setSort,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        clearCompleted
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
