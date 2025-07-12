import React, { createContext, useContext, useState, useEffect } from 'react';

const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fontSize') || 'md';
  });

  // Persist font size preference
  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  return (
    <PreferencesContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => useContext(PreferencesContext);
