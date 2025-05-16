import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import ThemeToggle from '../components/ThemeToggle';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';

/**
 * MainLayout component
 * Contains the sidebar and main content area using Outlet for nested routes.
 */
const MainLayout: React.FC = () => {
  // const { t } = useTranslation(); // Uncomment if t() is used directly in MainLayout for text

  // Logic to prevent initial transition flicker (can be kept from HEAD)
  useEffect(() => {
    document.documentElement.classList.add('no-transitions');
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('no-transitions');
    }, 100); // A small delay to ensure styles are loaded
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-[rgb(var(--background-rgb))] text-[rgb(var(--foreground-rgb))] transition-colors duration-200">
      <Sidebar />
      {/* Adjust ml (margin-left) based on actual Sidebar width if it's fixed, otherwise flex-1 on main might be enough */}
      <main className="flex-1 ml-[calc(4rem+1px)] md:ml-[calc(5rem+1px)] p-4 overflow-y-auto">
        {/* Example of adjusting margin based on sidebar width, replace with actual sidebar width or responsive logic */}
        {/* Using calc for example: 4rem (w-16) or 5rem (w-20) + 1px border */}
        {/* If Sidebar is part of flex and Main content is flex-1, explicit margin might not be needed or could be simpler like ml-16 or ml-20 if sidebar width is fixed by Tailwind classes */}
        <Outlet />
      </main>

      {/* ThemeToggle can be placed in a top bar or settings menu within MainLayout or App.tsx 
          For now, keeping it fixed similar to one of the versions */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default MainLayout;
