'use client';

import { useCallback } from 'react';

/**
 * Scroll helpers for subpages that use NavigationMenu with variant="up-down".
 * ↑ scrolls to the top of the page, ↓ scrolls to the bottom (the footer section).
 */
export function useSubpageNav() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, []);

  return { scrollToTop, scrollToBottom };
}
