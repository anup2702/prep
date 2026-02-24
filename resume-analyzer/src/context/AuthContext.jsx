import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('resume_analyzer_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (_) {}
    }
  }, []);

  const login = (email, password) => {
    if (!email || !password) return false;
    const mockUser = { id: '1', email, name: email.split('@')[0] };
    setUser(mockUser);
    localStorage.setItem('resume_analyzer_user', JSON.stringify(mockUser));
    return true;
  };

  const signup = (email, password, name) => {
    if (!email || !password) return false;
    const displayName = name || email.split('@')[0];
    const mockUser = { id: crypto.randomUUID(), email, name: displayName };
    setUser(mockUser);
    localStorage.setItem('resume_analyzer_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('resume_analyzer_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
