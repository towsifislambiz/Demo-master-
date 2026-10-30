import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * Ensures that every time a user navigates to a new page, route, or product,
 * the window and document scroll position is instantly reset to the very top.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  // Instant scroll before paint to prevent visual starting from bottom
  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    } else {
      // If there's an anchor hash (e.g. #reviews), scroll to that element
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, search, hash]);

  // Secondary effect to guarantee top position even after async component renders
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }

      const t1 = setTimeout(() => {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
      }, 20);

      const t2 = setTimeout(() => {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
      }, 100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [pathname, search, hash]);

  return null;
}
