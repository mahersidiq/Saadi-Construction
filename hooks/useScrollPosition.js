import { useState, useEffect, useRef } from 'react';

/**
 * Returns the current vertical scroll position.
 * Uses requestAnimationFrame for optimal performance.
 * Handles SSR by defaulting to 0.
 * @returns {number}
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Set initial value
    setScrollY(window.scrollY);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

export default useScrollPosition;
