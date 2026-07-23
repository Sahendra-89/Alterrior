import { useEffect, useState } from 'react';

/**
 * useScrollHeader
 * Returns `isScrolled` — true when page has scrolled past threshold.
 * Used by Header to switch from transparent to solid background.
 */
export function useScrollHeader(threshold = 80) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
