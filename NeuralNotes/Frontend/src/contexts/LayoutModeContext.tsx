import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

type LayoutMode = 'grid' | 'masonry';

interface LayoutModeContextType {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
}

const LayoutModeContext = createContext<LayoutModeContextType | undefined>(undefined);

export const LayoutModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('masonry'); // Default to masonry

  return (
    <LayoutModeContext.Provider value={{ layoutMode, setLayoutMode }}>
      {children}
    </LayoutModeContext.Provider>
  );
};

export const useLayoutMode = () => {
  const context = useContext(LayoutModeContext);
  if (context === undefined) {
    throw new Error('useLayoutMode must be used within a LayoutModeProvider');
  }
  return context;
}; 