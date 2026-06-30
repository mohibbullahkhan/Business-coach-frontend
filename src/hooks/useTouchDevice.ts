"use client";

import { useState, useEffect } from "react";

export function useTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      // Check if device doesn't support hover
      setIsTouch(window.matchMedia('(hover: none)').matches);
    };

    checkTouch();
    // Optional: listen for changes if moving window across screens
    const mediaQuery = window.matchMedia('(hover: none)');
    const listener = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mediaQuery.addEventListener('change', listener);
    
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return isTouch;
}
