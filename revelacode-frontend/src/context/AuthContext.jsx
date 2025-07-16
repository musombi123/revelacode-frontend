import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // real logged in user
  const [isGuest, setIsGuest] = useState(false); // guest mode flag
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On load: check localStorage
    const savedUser = localStorage.getItem('user');
    const guest = localStorage.getItem('isGuest') === 'true';

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsGuest(false);
    } else if (guest) {
      setUser(null);
      setIsGuest(true);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsGuest(false);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.removeItem('isGuest');
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isGuest');
  };

  const guestMode = () => {
    setUser(null);
    setIsGuest(true);
    localStorage.setItem('isGuest', 'true');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, loading, login, logout, guestMode }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  return useContext(AuthContext);
}
