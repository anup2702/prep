import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const HistoryContext = createContext(null);

const STORAGE_KEY = 'resume_analyzer_history';

export function HistoryProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user?.id) {
      setItems([]);
      return;
    }
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY}_${user.id}`);
      setItems(raw ? JSON.parse(raw) : []);
    } catch (_) {
      setItems([]);
    }
  }, [user?.id]);

  const save = (entry) => {
    const newItem = { id: crypto.randomUUID(), ...entry, date: new Date().toISOString() };
    const updated = [newItem, ...items];
    setItems(updated);
    if (user?.id) {
      localStorage.setItem(`${STORAGE_KEY}_${user.id}`, JSON.stringify(updated));
    }
    return newItem;
  };

  const remove = (id) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    if (user?.id) {
      localStorage.setItem(`${STORAGE_KEY}_${user.id}`, JSON.stringify(updated));
    }
  };

  return (
    <HistoryContext.Provider value={{ items, save, remove }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error('useHistory must be used within HistoryProvider');
  return ctx;
}
