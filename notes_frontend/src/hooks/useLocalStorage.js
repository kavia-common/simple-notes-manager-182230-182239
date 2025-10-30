import { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 */
export function useLocalStorage(key, initialValue) {
  /** React hook to sync state with localStorage under the provided key. */
  const readValue = () => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // ignore write errors
    }
  }, [key, storedValue]);

  useEffect(() => {
    // handle localStorage changes from other tabs
    const handler = (e) => {
      if (e.key === key) {
        try {
          const next = e.newValue ? JSON.parse(e.newValue) : initialValue;
          setStoredValue(next);
        } catch {
          // ignore parse errors
        }
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key]);

  return [storedValue, setStoredValue];
}
