import React from 'react';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">NeuralNotes</h1>
      </header>

      <main className="flex-grow p-6 bg-gray-50 dark:bg-gray-800">
        {children}
      </main>

      <footer className="bg-gray-200 p-4 text-center dark:bg-gray-900 dark:text-gray-300">
        © 2025 NeuralNotes
      </footer>
    </div>
  );
}

export default Layout; 