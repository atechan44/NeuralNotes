import { useState, useCallback } from 'react';

interface SidebarState {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const useSidebar = (initialState = false): SidebarState => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const openSidebar = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, toggleSidebar, openSidebar, closeSidebar };
};

export default useSidebar;
