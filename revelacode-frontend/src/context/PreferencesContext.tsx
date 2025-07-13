import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the context type
interface PreferencesContextType {
  fontSize: string;
  setFontSize: (size: string) => void;
}

// Create the context with default undefined
const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

// Props type for the provider
interface PreferencesProviderProps {
  children: ReactNode;
}

export const PreferencesProvider = ({ children }: PreferencesProviderProps) => {
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fontSize') || 'md';
  });

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  return (
    <PreferencesContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </PreferencesContext.Provider>
  );
};

// Custom hook
export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
