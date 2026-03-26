import { useState, useCallback, useRef } from 'react';

/**
 * Simple toast notification hook.
 * @returns {{ toasts: Array, addToast: Function, removeToast: Function }}
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);
  const counterRef = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = 'success') => {
      const id = ++counterRef.current;

      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 5000);

      return id;
    },
    [removeToast]
  );

  return { toasts, addToast, removeToast };
}

export default useToast;
