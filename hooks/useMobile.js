import { useState, useEffect } from 'react';

/**
 * Returns whether the viewport width is below 768px (mobile breakpoint).
 * Handles SSR by defaulting to false.
 * @returns {boolean}
 */
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export default useMobile;
