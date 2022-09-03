import React, { useEffect, useRef } from "react";

type Func = (
  eventName: string,
  handler: (e: any) => void,
  element?: HTMLElement | typeof window
) => void;

const useEventListener: Func = (eventName, handler, element = window) => {
  const savedHandler = useRef<any>();
 
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      // Create event listener that calls handler function stored in ref
      const eventListener = (event: any) => savedHandler.current(event);
      // Add event listener
      element.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] 
  );
};

export default useEventListener;
