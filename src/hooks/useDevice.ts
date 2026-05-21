import { useState, useEffect } from 'react';

export function useDevice() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => {
      const width = window.innerWidth;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsDesktop(width >= 1024 && !isTouchDevice);
    };

    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return { isDesktop, isMobile: !isDesktop };
}
