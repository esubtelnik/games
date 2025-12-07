"use client";
import { useEffect } from "react";

export function useEvent<K extends keyof WindowEventMap>(
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void {
  useEffect(() => {
    window.addEventListener(event, handler as EventListener, options);

    return () => {
      window.removeEventListener(event, handler as EventListener, options);
    };
  }, [event, handler, options]);
}
